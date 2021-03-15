import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/AyudaJuego.css';
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <h1>Instrucciones</h1>
            </div>
        );
    }
}

class ReglasJuego extends React.Component{
    render(){
        return(
            <div className="ReglasJuego">
                <h1>Objetivo del juego:</h1>
                <p>El objetivo del juego es responder al mayor número de preguntas correctamente en
                    el número de rondas que se escojan.
                </p>
                <h1>En tu turno:</h1>
                <ol>
                    <li>Dale al dado</li>
                    <li>Responde la pregunta en 10 segs</li>
                </ol>
                <p>Existen 6 categorías: Historia, Geografía, Cine, Ciencias, Arte y Deporte.</p>
                <p>Por cada pregunta que se contesta correctamente se otorgarán unos puntos. Cada categoría
                    tiene unos puntos asignados.
                </p>
                <h1>Distintos modos de juego:</h1>
                <p>Existen dos modos de juego: Multijugador e Individual. En modo individual se podrán
                    obtener monedas para luego obtener objetos en la tienda para el avatar.
                </p>
                <h1>Quién gana:</h1>
                <p>Si se juega en modo multijugador, ganará el jugador que más puntos haya conseguido 
                    a lo largo de la partida.
                </p>
            </div>
        );
    }
}

class AyudaJuego extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="AyudaJuego">
                <Header history={history}/>
                <ReglasJuego/>
            </div>
        );
    }
}

export default withRouter(AyudaJuego);