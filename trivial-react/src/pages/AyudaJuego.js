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
                <p> Modos de juego: individual y multijugador.</p>
                <p> Al empezar una partida individual le deberás dar al botón "Empezar" y eso lanzará el dado e 
                    iniciará la partida. Si estás en modo multijugador la partida empezará automáticamente cuando 
                    todos los jugadores estén en la partida. 
                </p>
                <p> Deberás responder a la pregunta que te toque y el propio juego te indicará si es la correcta 
                    en cuanto clique en ella. Deberás darle al botón "Siguiente" para pasar a la siguiente ronda.
                </p>
                <p> El dado consta de seis colores. Cada uno de ellos está asociado a una categoria diferente de 
                    manera. Las preguntas son multirespuesta y solo una de las opciones expuestas es la correcta. 
                    Las categorías son las siguientes y te darán los siguientes puntos:
                </p>
                <ul>
                    <li>Geografía (azul): 30 puntos.</li>
                    <li>Arte y Literatura (marrón): 20 puntos.</li>
                    <li>Historia (amarillo): 25 puntos.</li>
                    <li>Cine (rosa): 15 puntos.</li>
                    <li>Ciencias y Naturaleza (verde): 5 puntos.</li>
                    <li>Deportes y Pasatiempos (naranja): 10 puntos.</li>
                </ul>
                <p> El juego consiste en sumar puntos, los cuales se consiguen respondiendo correctamente a las 
                    preguntas. Cada tema tiene un valor de puntos asociados. Conforme vayas obteniendo puntos 
                    en las partidas, obtendrás monedas que más tarde puedes usar para comprar objetos para tu 
                    avatar en la tienda. Puedes abandonar la partida cuando desees, simplemente dándole al botón 
                    "Atras". Si abandonas la partida, esta no se registrará y será como si nunca hubieras jugado. 
                    Puedes también posponer la partida y volver más tarde a ella. Las partidas multijugador tienen 
                    un máximo de cuatro jugadores y gana el jugador que más puntos obtiene. Puedes crear una 
                    partida o unirte a una ya existentecon un código (todas las partidas lo tienen, pregúntale 
                    a tus amigos por el código de la partida que han creado). Además, el modo multijugador 
                    consta de un chat que te permite hablar con tus rivales. 

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