import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Historial.css';
import {LeftOutlined} from '@ant-design/icons';
import {help, historial, baseURL} from './images';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

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
                    <img className="imgHistorial" src={historial} alt="Historial Icon"></img>
                    <h1>Historial</h1>
                </div>
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
            </div>
        );
    }
}

class MostrarHistorial extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            historial: [],
            resultQuery: []
        };
        this.historialGeneral = this.historialGeneral.bind(this);
        this.historialIndividual = this.historialIndividual.bind(this);
        this.historialMultijugador = this.historialMultijugador.bind(this);
    }

    // Petición get a la db: busca el historial del usuario.
    buscarHistorial(email){
        return new Promise((resolve, reject) => {
            axios.get(baseURL+'/Historial_Completo?email='+email)
            .then(response=>{   //Encuentra el historial
                if (response.status === 200) {
                    resolve(response.data); 
                }else{
                    reject(response.status);
                }
            })
        });
    }

    componentDidMount(){
        const cookies = new Cookies();
        const email = cookies.get('email');
        this.buscarHistorial(email)
        .then((response) => {
            console.log(response);
            this.setState({resultQuery: response});
        })
        .catch((err) => {
            console.log("Error al buscar el historial: "+err)
        })
    }

    guardarPartidaIndiv(historial, partida){
        const jugador = partida.jugadoresEnPartida[0];
        historial.push(
            <li className="fila">
                <div className="header">
                    <h1>Individual</h1>
                    <h1>{jugador.puntos} puntos</h1>
                    <h1>Fecha: {partida.fecha}, Hora: {partida.hora}</h1>
                </div>
                <div className="jugadores">
                    <div className="tarjetaJugador">
                        <img className="imgAvatar" src={jugador.avatar} alt={"Avatar de "+ jugador.username}></img>
                        <div className="infoUsuario">
                            <h1>{jugador.username}</h1>
                            <h1>{jugador.puntos} puntos</h1>
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
            if (jugador.username === usuarioLogged){
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
        const resultGlob = this.state.resultQuery;
        let historial = [];
        resultGlob.forEach((partida) =>{
            if(partida.maxJugadores === 1){
                this.guardarPartidaIndiv(historial, partida);
            }else{
                this.guardarPartidaMulti(historial, partida);
            }
        });
        this.setState({historial: historial});
    }

    historialIndividual(){
        const resultGlob = this.state.resultQuery;
        let historial = [];
        resultGlob.forEach((partida) =>{
            if(partida.maxJugadores === 1){
                this.guardarPartidaIndiv(historial, partida);
            }
        });
        this.setState({historial: historial});
    }

    historialMultijugador(){
        const resultGlob = this.state.resultQuery;
        let historial = [];
        resultGlob.forEach((partida) =>{
            if(partida.maxJugadores>1){
                this.guardarPartidaMulti(historial, partida);
            }
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