import React from 'react';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import {iniciarSocket,disconnectSocket, actualizarMensajes, enviarMensaje} from './Socket';
import '../css/MultijugadorUnirse.css'
import {LeftOutlined, LoadingOutlined} from '@ant-design/icons';
import Dado from '../components/Dado';
import Usuario from '../components/Usuario';
import Chat from '../components/Chat';
import AbandonarPartida from '../components/AbandonarPartida';

class Header extends React.Component{
    abrirAbandonar = () => {
        this.props.setParentsState([{clickAtras: true}]);
    }

    render(){
        const {history,usuario,code,ronda,turno,jugadores} = this.props;
        return(
            <div className="Header">
                <div>
                    <div className="iconAtras">
                        <LeftOutlined onClick={this.abrirAbandonar}/> 
                        Atrás
                    </div>
                    <tbody>
                        <tr className="ronda">
                            <th>Ronda Nº:</th>
                            <td>{ronda}</td>
                        </tr>
                    </tbody>
                </div>
                <div className="infoCode">
                    <tbody>
                        <tr className="code">{code}</tr>
                        <tr>
                            <th>Turno:</th>
                            <td>{jugadores[turno].username}</td>
                        </tr>
                    </tbody>
                </div>
                <div>
                    <tbody>
                        <tr>Puntos:{jugadores[usuario].puntos}</tr>
                    </tbody>
                </div>
            </div>
        );
    }
}

class Jugadores extends React.Component{

    tirarDado = () => {
        this.props.tirarDado();
    }

    mostrarJugadores(){
        const {history,jugadores,maxJugadores,dado} = this.props;
        const array = [];
        for (var i=0; i<maxJugadores; i++){
            if (i<jugadores.length){
                array.push(
                    <div >
                        <Usuario usuario={jugadores[i]}/>
                    </div>
                );
            } else{
                array.push(
                    <div className="colDesconocido">
                        <p>Esperando usuario</p>
                        <LoadingOutlined />
                    </div>
                );
            }
            if (i==1){
                array.push(
                    <div onClick={this.tirarDado}>
                        <Dado dado={dado}/>
                    </div>
                );
            }
        }
        return array;
    }
    
    render(){
        const array = this.mostrarJugadores();
        return(
            <div className="Jugadores">
                <div className="filaAvatarDado">
                    {array}
                </div>
            </div>
        );
    }
}

class Pregunta extends React.Component{

    handleClick = (e) => {
        e.preventDefault();
        this.props.handleClick(e);
    }

    handleTurno = () => {
        this.props.handleTurno();
    }

    render(){
        const { pregunta, usuario, turno, jugadores, maxJugadores,
                colorBtnA, colorBtnB, colorBtnC, colorBtnD,
                hasRespondido,hasTiradoDado} = this.props;
        const disabled=hasRespondido;
        const diabledNext=!hasRespondido;
        //const disabled=(hasRespondido | turno!=usuario);
        return(
            <div className="Pregunta"> 
            { jugadores.length==maxJugadores ? (    //Si están todos los jugadores
                hasTiradoDado ? (  //Si has tirado ya el dado, te sale la pregunta
                    <div>
                        <p>{pregunta.ask}</p>
                        <div className="respuesta">
                            <tr>
                                <div>
                                    <button name="opcionA" onClick={this.handleClick} disabled={disabled}
                                        style={{ background: colorBtnA}} >{pregunta.opcionA}</button>
                                </div>
                                <div>
                                    <button name="opcionB" onClick={this.handleClick} disabled={disabled}
                                        style={{ background: colorBtnB}}>{pregunta.opcionB}</button>
                                </div>
                            </tr>
                            <tr>
                                <div>
                                    <button name="opcionC" onClick={this.handleClick} disabled={disabled}
                                        style={{ background: colorBtnC}}>{pregunta.opcionC}</button>
                                </div>
                                <div>
                                    <button name="opcionD" onClick={this.handleClick} disabled={disabled}
                                        style={{ background: colorBtnD}}>{pregunta.opcionD}</button>
                                </div>
                            </tr>
                        </div>
                        <button name="next" onClick={this.handleTurno} disabled={diabledNext}>Next</button>
                    </div>
                ):( turno==usuario ? ( //Si no has tirado el dado y es tu turno, tienes que tirar el dado
                        <h1 className="tuTurno">¡Es tu turno, tira el dado!</h1>
                    ):(     //Si no es tu turno, tienes que esperar tu turno
                        <h1 className="esperaTurno">¡Espera tu turno!</h1>
                    )
                )
            ):(
                <h1 className="esperaJugadores">¡Espera al resto de jugadores!</h1>
            )}
            </div>
        );
    }
}

class FooterChat extends React.Component{
    
    abrirChat = () => {
        this.props.setParentsState([{clickChat: true}]);
    }

    render(){
        const chat = '/images/chat.png';
        return(
            <div className="FooterChat">
                <img className="imgChat" src={chat} alt="Chat Image" 
                    onClick={this.abrirChat}>
                </img>
            </div>
        );
    }
}

const MESSAGES_DATA = [];

class MultijugadorUnirse extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ronda: '1',
            turno: '0',
            jugadores: this.props.location.state.jugadores,
            dado: {img:'/images/dado/marron.jpeg', category:"Tira el dado", color:'black'},
            hasTiradoDado: false,
            pregunta: '',
            colorBtnA: 'white',
            colorBtnB: 'white',
            colorBtnC: 'white',
            colorBtnD: 'white',
            hasRespondido: false,
            clickAtras: false,
            clickChat: false,
            messages: MESSAGES_DATA
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTurno = this.handleTurno.bind(this);
        this.tirarDado = this.tirarDado.bind(this);
    }

    setStates = states => {
        return states.forEach(state => {
          this.setState({ ...state });
        });
    };

    componentDidMount(){ //Unión de un usuario a la sala de chat
        const history = this.props.history;
        const firstJoin = this.props.location.state.firstJoin;
        const {messages, jugadores} = this.state;
        const {username, code} = queryString.parse(history.location.search);

        //Inicializar socket y unión del usuario "username" al chat con codigo "code"
        console.log(firstJoin);
        iniciarSocket(username, code, firstJoin, history);

        //Actualizar array de mensajes con los que te llegan
        actualizarMensajes(messages, jugadores, this.setStates);
    }

    componentWillUnmount() {
        disconnectSocket();
	}

    render(){
        const history = this.props.history;
        const {usuario, code, maxJugadores} = this.props.location.state;
        const { ronda, turno, jugadores, dado, hasTiradoDado, pregunta,
                colorBtnA, colorBtnB, colorBtnC, colorBtnD, hasRespondido,
                clickAtras, clickChat, messages} = this.state;
        console.log(this.state);
        return(
            <div>
                { clickAtras === true? (
                    <AbandonarPartida   history={history}
                                        usuario= {jugadores[usuario].username}
                                        setParentsState={this.setStates}
                    />
                ):(
                    clickChat === true ? (
                        <Chat   jugadores={jugadores}
                                usuario={usuario}
                                messages={messages}
                                sendMessage={this.sendMessage}
                                setParentsState={this.setStates}
                        />
                    ):(
                        <div className="MultijugadorUnirse">
                        <Header history={history} 
                            usuario={usuario}
                            code={code}
                            ronda={ronda}
                            turno={turno}
                            jugadores={jugadores}
                            setParentsState={this.setStates}
                        />
                        <Jugadores  history={history} 
                                jugadores={jugadores} 
                                maxJugadores={maxJugadores}
                                dado={dado}
                                tirarDado={this.tirarDado}
                        />
                        <Pregunta   pregunta={pregunta}
                                turno={turno}
                                jugadores={jugadores}
                                maxJugadores={maxJugadores}
                                usuario={usuario}
                                colorBtnA={colorBtnA}
                                colorBtnB={colorBtnB}
                                colorBtnC={colorBtnC}
                                colorBtnD={colorBtnD}
                                hasRespondido={hasRespondido}
                                hasTiradoDado={hasTiradoDado}
                                handleClick={this.handleClick}
                                handleTurno={this.handleTurno}
                        />
                        <FooterChat setParentsState={this.setStates}
                        />
                        </div>
                    )
                )}
            </div>
        );
    }

    sendMessage(messageInput) {
        const {usuario} = this.props.location.state;
        const {jugadores} = this.state;
        if (messageInput){   //Envio del mensaje a todos los usuarios
            var d = new Date();
            const min = d.getMinutes();
            const message = {sender: usuario, avatar: jugadores[usuario].avatar, text: messageInput, date: min };
            enviarMensaje(message);
        }
    }

    handleClick(e) {
        const {turno,jugadores,pregunta,hasRespondido} = this.state;
        if(!hasRespondido){
            switch (pregunta.answer) {
                case 'opcionA': this.setState({colorBtnA: 'green'}); break;
                case 'opcionB': this.setState({colorBtnB: 'green'}); break;
                case 'opcionC': this.setState({colorBtnC: 'green'}); break;
                case 'opcionD': this.setState({colorBtnD: 'green'}); break;
                default: break;
            }
            let respuesta = e.target.name;
            if (pregunta.answer == respuesta){  //Acierta
                let actJugadores = jugadores;
                actJugadores[turno].puntos = Number(jugadores[turno].puntos) + Number(pregunta.puntos);
                this.setState({jugadores: actJugadores});
            } else{     //Falla
                switch (respuesta) {
                    case 'opcionA': this.setState({colorBtnA: 'red'}); break;
                    case 'opcionB': this.setState({colorBtnB: 'red'}); break;
                    case 'opcionC': this.setState({colorBtnC: 'red'}); break;
                    case 'opcionD': this.setState({colorBtnD: 'red'}); break;
                    default: break;
                }
            }
            this.setState({hasRespondido:true});
        }
    }

    BubbleSortDesc(values, length){
        var i, j, flag = 1;
        var temp;
        for (i = 1; (i <= length) && flag; i++){
            flag = 0;
            for (j = 0; j < (length - 1); j++){
                if (Number(values[j + 1].puntos) > Number(values[j].puntos)){
                    temp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = temp;
                    flag = 1;
                }
            }
        }
    }

    handleTurno() {
        const history = this.props.history;
        const {usuario,maxRondas,maxJugadores}=this.props.location.state;
        const {ronda,turno,jugadores}=this.state;
        //Pasar al siguiente turno
        if (ronda==maxRondas && turno==(maxJugadores-1)){ //Ya se han jugado todas las rondas
            //Finalizar partida
            //Ordenamiento descendente bubble sort
            let jugadoresDesc = jugadores;
            console.log(jugadoresDesc);
            this.BubbleSortDesc(jugadoresDesc,jugadoresDesc.length);
            console.log(jugadoresDesc);
            history.push('/FinalMultijugador', {jugadores: jugadoresDesc, usuario: usuario});
        } else {  //Se sigue jugando
            if (turno==(maxJugadores-1)){   //Cuando es el último turno, se actualiza la ronda
                this.setState({ronda: (Number(ronda)+1)%(Number(maxRondas)+1)});
            }
            //Actualizar turno
            this.setState({turno: (turno+1)%maxJugadores});
        }
        this.setState({ hasRespondido: false,
                        hasTiradoDado: false,
                        colorBtnA: 'white',
                        colorBtnB: 'white',
                        colorBtnC: 'white',
                        colorBtnD: 'white',
                        dado: {img:this.state.dado.img, category:"Tira el dado", color:'black'}
        });
    }

    rand(min, max){
        const rand = Math.floor(min + Math.random()*(max-min+1));
        return rand;
    }

    tirarDado(){
        const {hasTiradoDado,jugadores} = this.state;
        const maxJugadores = this.props.location.state.maxJugadores;
        const colores = ["#703C02", "#0398FA", "#FFDA00", "#FC57FF", "#17B009", "#FF8D00"];
        const imagenes = [  '/images/dado/marron.jpeg', '/images/dado/azul.jpeg', '/images/dado/amarillo.jpeg',
                            '/images/dado/rosa.jpeg', '/images/dado/verde.jpeg', '/images/dado/naranja.jpeg'];
        const categorias = ["Arte y Literatura", "Geografía", "Historia", "Cine", "Ciencias y Naturaleza", "Deportes"];
        const preguntas = [
            {category: "Arte y Literatura", ask: "¿A qué estilo pertenece la obra de Jean-Honoré Fragonard?", opcionA:'Renacentista', opcionB:'A ninguno', opcionC:'Rococó', opcionD:'Gótico', answer:'opcionC', puntos:'15'},
            {category: "Geografía", ask: "¿En qué año establece Javier de Burgos la provincialización de España?", opcionA:'1345', opcionB:'1560', opcionC:'1833', opcionD:'1975', answer:'opcionC', puntos:'15'},
            {category: "Historia", ask: "¿A qué país fué enviada la División Azul? ", opcionA:'URSS', opcionB:'EEUU', opcionC:'Inglaterra', opcionD:'Francia', answer:'opcionA', puntos:'15'},
            {category: "Cine", ask: "¿En qué calle londinense grabaron más discos los Beatles?", opcionA:'Abbey Road', opcionB:'Oxford Street', opcionC:'Bond Street', opcionD:'Kennington Road', answer:'opcionA', puntos:'15'},
            {category: "Ciencias y Naturaleza", ask: "Contando desde el Sol, ¿qué posición ocupa el planeta de Marte? ", opcionA:'5', opcionB:'4', opcionC:'2', opcionD:'6', answer:'opcionB', puntos:'15'},
            {category: "Deportes", ask: "¿A qué distancia está situado el punto de penalti de la portería? ", opcionA:'6 metros', opcionB:'20 metros', opcionC:'30 metros', opcionD:'11 metros', answer:'opcionD', puntos:'15'},
        ];
        if (!hasTiradoDado && jugadores.length==maxJugadores && true){ //true = Es tu turno = turno==usuario
            const valor = this.rand(0,5);
            const dado = {img: imagenes[valor], category: categorias[valor], color: colores[valor]};
            this.setState({dado: dado, hasTiradoDado: true, pregunta: preguntas[valor]});
        }
    }


}

export default withRouter(MultijugadorUnirse);