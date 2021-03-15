import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/IndividualPartida.css'
import {LeftOutlined} from '@ant-design/icons';
import Dado from '../components/Dado';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const help = '/images/help.png';
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class Juego extends React.Component{

    tirarDado = () => {
        this.props.tirarDado();
    }

    render(){
        const {ronda,jugador,dado} = this.props;
        return(
            <div className="Juego">
                    <div className="infoJuego">
                        <div className="ronda">
                            <p>Ronda Nº:</p>
                            <p>{ronda}</p>
                        </div>
                        <div>
                            <p>Puntos:</p>
                            <p>{jugador.puntos}</p>
                        </div>
                    </div>
                <div className="dado" onClick={this.tirarDado}>
                        <Dado dado={dado}/>
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

    handleNext = () => {
        this.props.handleNext();
    }

    render(){
        const {pregunta,colorBtnA,colorBtnB,colorBtnC,colorBtnD,hasRespondido,hasTiradoDado} = this.props;
        const disabled=hasRespondido;
        const diabledNext=!hasRespondido;
        return(
            <div className="Pregunta"> 
            {hasTiradoDado ? (
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
                    <button name="next" onClick={this.handleNext} disabled={diabledNext}>Next</button>
                </div>
            ):( <h1 className="tuTurno">¡Tira el dado!</h1>)}
            </div>
        );
    }
}

class IndividualPartida extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ronda: '1',
            jugador: '',
            dado: {img:'/images/dado/dado.jpg', category:"Tira el dado", color:'black'},
            hasTiradoDado: false,
            pregunta: '',
            colorBtnA: 'white',
            colorBtnB: 'white',
            colorBtnC: 'white',
            colorBtnD: 'white',
            hasRespondido: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.tirarDado = this.tirarDado.bind(this);
    }

    actualizarJugadores(){
        const jugador = this.props.location.state.jugador;
        this.setState({jugador: jugador});
    }

    componentWillMount() {
        this.actualizarJugadores();
    }

    render(){
        const history = this.props.history;
        const { ronda, jugador, dado, hasTiradoDado, pregunta,
                colorBtnA, colorBtnB, colorBtnC, colorBtnD, hasRespondido} = this.state;
        return(
            <div className="IndividualPartida">
                <Header history={history} 
                />
                <Juego  history={history} 
                        ronda={ronda}
                        jugador={jugador} 
                        dado={dado}
                        tirarDado={this.tirarDado}
                />
                <Pregunta   pregunta={pregunta}
                            colorBtnA={colorBtnA}
                            colorBtnB={colorBtnB}
                            colorBtnC={colorBtnC}
                            colorBtnD={colorBtnD}
                            hasRespondido={hasRespondido}
                            hasTiradoDado={hasTiradoDado}
                            handleClick={this.handleClick}
                            handleNext={this.handleNext}
                />
            </div>
        );
    }

    handleClick(e) {
        const {jugador,pregunta,hasRespondido} = this.state;
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
                let actJugador = jugador;
                actJugador.puntos = Number(jugador.puntos) + Number(pregunta.puntos);
                this.setState({jugador: actJugador});
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

    handleNext() {
        const history = this.props.history;
        const {maxRondas}=this.props.location.state;
        const {ronda,jugador}=this.state;
        //Pasar al siguiente turno
        if (ronda==maxRondas){ //Ya se han jugado todas las rondas
            //Finalizar partida
            history.push('/FinalIndividual', {jugador: jugador});
        } else {  //Se sigue jugando
            this.setState({ronda: (Number(ronda)+1)%(Number(maxRondas)+1)});
        }
        this.setState({ hasRespondido: false,
                        hasTiradoDado: false,
                        colorBtnA: 'white',
                        colorBtnB: 'white',
                        colorBtnC: 'white',
                        colorBtnD: 'white',
                        dado: {img:'/images/dado/dado.jpg', category:"Tira el dado", color:'black'}
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
        if (!hasTiradoDado){
            const valor = this.rand(0,5);
            const dado = {img: imagenes[valor], category: categorias[valor], color: colores[valor]};
            this.setState({dado: dado, hasTiradoDado: true, pregunta: preguntas[valor]});
        }
    }
}

export default withRouter(IndividualPartida);