import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/FinalIndividual.css';
import {trofeo} from './images';

class FinalIndividual extends React.Component {

    render() {
        const history = this.props.history;
        const jugador = this.props.location.state.jugador;
        return (
            <div className="FinalIndividual">
                <div className="header">
                    <h1>Fin de la partida</h1>
                </div>
                <div className="infoGanadores">
                    <img className="imgVictoria" src={trofeo} alt={"Imagen Trofeo"}></img>
                    <div>
                        <h1>Puntos totales</h1>
                        <h1>{jugador.puntos}</h1>
                        <h1>Monedas ganadas</h1>
                        <h1>{Math.floor(jugador.puntos * 0.4)}</h1>
                    </div>
                </div>
                <div className="footer"> 
                    <button className="btnNuevaPartida" onClick={() => history.push("/ModoIndividual", {usuario: jugador.username})}>Nueva partida</button>
                    <button className="btnSalir" onClick={() => history.push("/DecisionJuego", {usuario: jugador.username})}>Salir</button>
                </div>
            </div>
        )
    }  
};

export default withRouter(FinalIndividual);