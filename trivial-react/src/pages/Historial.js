import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Historial.css';
import {LeftOutlined} from '@ant-design/icons';
import {help, historial, imgUsuario} from './images';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <div className="tituloHistorial">
                    <img className="imgHistorial" src={historial} alt="Historial Image"></img>
                    <h1>Historial</h1>
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}
const partida1 = {   
    code: "ab12cx", 
    jugadoresEnPartida: [ //Ordenados por clasificación 1* a 4*
        {username: "usuario1", avatar: imgUsuario, puntos:'200'},
        {username: "usuario2", avatar: imgUsuario, puntos:'180'}
    ],
    maxJugadores: 2,
    maxRondas: 10,
    fecha: "12-04-2021",
    hora: "14:29",
}

const partida2 = {   
    code: "jh24kd", 
    jugadoresEnPartida: [ //Ordenados por clasificación 1* a 4*
        {username: "usuario1", avatar: imgUsuario, puntos:'210'},
        {username: "usuario2", avatar: imgUsuario, puntos:'150'},
        {username: "usuario3", avatar: imgUsuario, puntos:'100'}
    ],
    maxJugadores: 3,
    maxRondas: 15,
    fecha: "12-04-2021",
    hora: "12:30",
}

const partida3 = {   
    code: "gaq23i", 
    jugadoresEnPartida: [ //Ordenados por clasificación 1* a 4*
        {username: "usuario1", avatar: imgUsuario, puntos:'300'},
        {username: "usuario2", avatar: imgUsuario, puntos:'280'},
        {username: "usuario3", avatar: imgUsuario, puntos:'190'},
        {username: "usuario4", avatar: imgUsuario, puntos:'20'}
    ],
    maxJugadores: 4,
    maxRondas: 15,
    fecha: "12-04-2021",
    hora: "10:40",
}

const RESULTADOSMULTI =[ // Ordenados de más a menos reciente en día y hora.
    partida1,
    partida2,
    partida3
];

const partida4 = {   
    jugador: {username: "usuario1", avatar: imgUsuario, puntos:'100'},
    maxJugadores: 1,
    maxRondas: 5,
    fecha: "12-04-2021",
    hora: "15:40",
}

const partida5 = {   
    jugador: {username: "usuario1", avatar: imgUsuario, puntos:'180'},
    maxJugadores: 1,
    maxRondas: 10,
    fecha: "12-04-2021",
    hora: "12:40",
}

const partida6 = {   
    jugador: {username: "usuario1", avatar: imgUsuario, puntos:'200'},
    maxJugadores: 1,
    maxRondas: 15,
    fecha: "12-04-2021",
    hora: "10:30",
}

const RESULTADOSINDIV =[ // Ordenados de más a menos reciente en día y hora.
    partida4,
    partida5,
    partida6
];

const RESULTADOSGLOB = [
    partida4,
    partida1,
    partida5,
    partida2,
    partida3,
    partida6
];

class MostrarHistorial extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            historial: []
        };
        this.historialGeneral = this.historialGeneral.bind(this);
        this.historialIndividual = this.historialIndividual.bind(this);
        this.historialMultijugador = this.historialMultijugador.bind(this);
    }

    guardarPartidaIndiv(historial, partida){
        historial.push(
            <li className="fila">
                <div className="header">
                    <h1>Individual</h1>
                    <h1>{partida.jugador.puntos} puntos</h1>
                    <h1>Fecha: {partida.fecha}, Hora: {partida.hora}</h1>
                </div>
                <div className="jugadores">
                    <div className="tarjetaJugador">
                        <img className="imgAvatar" src={partida.jugador.avatar} alt={"Avatar de "+ partida.jugador.username}></img>
                        <div className="infoUsuario">
                            <h1>{partida.jugador.username}</h1>
                            <h1>{partida.jugador.puntos} puntos</h1>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    guardarPartidaMulti(historial, partida){
        const usuarioLogged = this.props.usuario;
        let jugadores = [];
        let puesto;
        partida.jugadoresEnPartida.forEach((jugador,index) => {
            jugadores.push(
                <div className="tarjetaJugador">
                    <img className="imgAvatar" src={jugador.avatar} alt={"Avatar de "+ jugador.username}></img>
                    <div className="infoUsuario">
                        <h1>{jugador.username}</h1>
                        <h1>{jugador.puntos} puntos</h1>
                    </div>
                </div>
            );
            if (jugador.username == usuarioLogged){
                puesto = index;
            }
        });
        historial.push(
            <li className="fila">
                <div className="header">
                    <h1>Multijugador({partida.maxJugadores})</h1>
                    <h1>Codigo({partida.code})</h1>
                    <h1>Puesto {puesto+1}</h1>
                    <h1>{partida.jugadoresEnPartida[puesto].puntos} puntos</h1>
                    <h1>Fecha: {partida.fecha}, Hora: {partida.hora}</h1>
                </div>
                <div className="jugadores">
                    {jugadores}
                </div>
            </li>
        );
    }

    historialGeneral(){
        const resultGlob = RESULTADOSGLOB;
        let historial = [];
        resultGlob.forEach((partida) =>{
            if(partida.maxJugadores==1){
                this.guardarPartidaIndiv(historial, partida);
            }else{
                this.guardarPartidaMulti(historial, partida);
            }
        });
        this.setState({historial: historial});
    }

    historialIndividual(){
        const resultIndiv = RESULTADOSINDIV;
        let historial = [];
        resultIndiv.forEach((partida) =>{
            this.guardarPartidaIndiv(historial, partida);
        });
        this.setState({historial: historial});
    }

    historialMultijugador(){
        const resultMulti = RESULTADOSMULTI;
        let historial = [];
        resultMulti.forEach((partida) =>{
            this.guardarPartidaMulti(historial, partida);
        });
        this.setState({historial: historial});
    }

    render(){
        const {historial} = this.state;
        return(
            <div className="MostrarHistorial">
                <div className="filtros">
                    <button onClick={this.historialGeneral}>General</button>
                    <button onClick={this.historialIndividual}>Individual</button>
                    <button onClick={this.historialMultijugador}>Multijugador</button>
                </div>
                <ul className="historial">
                    {historial}
                </ul>
            </div>
        );
    }
}


class Historial extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="Historial">
                <Header history={history}/>
                <MostrarHistorial history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(Historial);