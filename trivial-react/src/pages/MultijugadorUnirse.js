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
import axios from 'axios';
import {chat, amarillo, azul, marron, naranja, rosa, verde} from './images';

const baseUrl='http://localhost:3050';

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
            dado: {img: marron, category:"Tira el dado", color:'black'},
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

    BubbleSortDesc(values, length, user){
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
                    if (user == j){
                        user = j+1;
                    } else if (user == j+1){
                        user = j;
                    }
                }
            }
        }
    }

    //Petición post a la db: guarda los resultados en las tablas juega y usuario
    //y si es el ganador actualiza el campo ganador de la tabla partida.
    //jugadores: ordenados de mayor a menor puntuación.
    //usuario: índice en el vector "jugadores" del usuario que hizo login.
    postPartida(jugadores, usuario){
        //Código de la partida.
        const {code}=this.props.location.state;
        //Datos del jugador: username, avatar, puntos.
        const jugador = jugadores[usuario];
        //Construcción de monedas y email
        const monedas = jugador.puntos*0.4;
        const email = jugador.username + "@gmail.com";

        //Actualiza la tabla partida.
        if (usuario == 0){  //Si eres el ganador
            //Actualizar la partida de codigo "code" en la tabla partida.
            //code y jugador.username
        }

        //Actualiza la tabla juega.
        //code y jugador.puntos
        
        //Guarda los resultados en la tabla usuario.
        axios.post(baseUrl+'/FinalIndividual_Usuario', 
            { email: email, monedas: monedas, puntos: jugador.puntos })
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log(e);         
        });
    }

    handleTurno() {
        const history = this.props.history;
        const {usuario,maxRondas,maxJugadores}=this.props.location.state;
        const {ronda,turno,jugadores}=this.state;
        //Pasar al siguiente turno
        if (ronda==maxRondas && turno==(maxJugadores-1)){ //Ya se han jugado todas las rondas
            //Ordenamiento descendente bubble sort
            let jugadoresDesc = jugadores;
            let user = usuario;
            console.log(jugadoresDesc, user);
            this.BubbleSortDesc(jugadoresDesc,jugadoresDesc.length, user);
            console.log(jugadoresDesc, user);
            //Finalizar partida
            this.postPartida(jugadoresDesc, user);
            history.push('/FinalMultijugador', {jugadores: jugadoresDesc, usuario: user});
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

    // Petición get a la db: coge una pregunta de categoria "categoria"
    // y construcción de la pregunta.
    async getPregunta(dado){
        await axios.get(baseUrl+'/ModoIndividual?category='+ dado.category)
            .then(response=>{
                const {incorrecta1, incorrecta2, incorrecta3, correcta, enunciado} = response.data.idpregunta;
                const opcionCorrecta = this.rand(1,4);
                let pregunta = {ask: enunciado, opcionA:'', opcionB:'', opcionC:'', opcionD:'', answer:'', puntos:'10'}
                switch (opcionCorrecta){
                    case 1: //Opción correcta: opcionA
                        pregunta.opcionA=correcta;
                        pregunta.opcionB=incorrecta1;
                        pregunta.opcionC=incorrecta2;
                        pregunta.opcionD=incorrecta3;
                        pregunta.answer='opcionA';
                        break;
                    case 2: //Opción correcta: opcionB
                        pregunta.opcionA=incorrecta1;
                        pregunta.opcionB=correcta;
                        pregunta.opcionC=incorrecta2;
                        pregunta.opcionD=incorrecta3;
                        pregunta.answer='opcionB';
                        break;
                    case 3: //Opción correcta: opcionC
                        pregunta.opcionA=incorrecta1;
                        pregunta.opcionB=incorrecta2;
                        pregunta.opcionC=correcta;
                        pregunta.opcionD=incorrecta3;
                        pregunta.answer='opcionC';
                        break;
                    case 4: //Opción correcta: opcionD
                        pregunta.opcionA=incorrecta1;
                        pregunta.opcionB=incorrecta2;
                        pregunta.opcionC=incorrecta3;
                        pregunta.opcionD=correcta;
                        pregunta.answer='opcionD';
                        break;
                }
                this.setState({dado: dado, hasTiradoDado: true, pregunta: pregunta});
            })
    }

    tirarDado(){
        const {hasTiradoDado,jugadores} = this.state;
        const maxJugadores = this.props.location.state.maxJugadores;
        const colores = ["#703C02", "#0398FA", "#FFDA00", "#FC57FF", "#17B009", "#FF8D00"];
        const imagenes = [  marron, azul, amarillo, rosa, verde, naranja ];
        const categorias = ["Art and Literature", "Geography", "History", "Film and TV", "Science", "Sport and Leisure"];
        if (!hasTiradoDado && jugadores.length==maxJugadores && true){ //true = Es tu turno = turno==usuario
            const valor = this.rand(0,5);
            const dado = {img: imagenes[valor], category: categorias[valor], color: colores[valor]};
            this.getPregunta(dado);
        }
    }


}

export default withRouter(MultijugadorUnirse);