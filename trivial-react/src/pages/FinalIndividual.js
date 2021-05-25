import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/FinalIndividual.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';

class FinalIndividual extends React.Component {

    render() {
        const history = this.props.history;
        const jugador = this.props.location.state.jugador;
        const monedas = Number(Math.floor(jugador.puntos*0.5));
        return (
            <div className="FinalIndividual">
                <div className="header">
                    <h1>Fin de la partida</h1>
                </div>
                <div className="infoGanadores">
                    <FontAwesomeIcon className="imgVictoria" icon={faTrophy} alt="Imagen Trofeo"/>
                    <div>
                        <h1>Puntos totales</h1>
                        <h1>{jugador.puntos}</h1>
                        <h1>Monedas ganadas</h1>
                        <h1>{monedas}</h1>
                    </div>
                </div>
                <div className="footer"> 
                    <button className="btnNuevaPartida" onClick={() => history.push("/ModoIndividual", {usuario: jugador.username})}>Nueva partida</button>
                    <button className="btnSalir" onClick={() => history.push("/DecisionJuego")}>Salir</button>
                </div>
            </div>
        )
    }  
};

export default withRouter(FinalIndividual);