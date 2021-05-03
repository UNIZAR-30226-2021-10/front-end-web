import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/AbandonarPartida.css'
import storage from '../lib/storage';

class AbandonarPartida extends React.Component{

    abandonarPartida = () => {
        const history = this.props.history;
        //Borrar estado de la partida
        storage(localStorage).removeData("estado");
        //Salir de la partida
        history.push('/DecisionJuego');
    }

    render(){
        const history = this.props.history;
        return(
            <div className="AbandonarPartida">
                <div className="cuadrado">
                    <div className="titulo">
                        <h1>¿Desea abandonar la partida?</h1>
                    </div>
                    <div className="filaBtn">
                        <button onClick={() => history.goBack()}>Cancelar</button>
                    </div>
                    <div className="filaBtn">
                        <button className="btnPosponer" onClick={() => history.push('/DecisionJuego')}>Posponer</button>
                        <button className="btnAbandonar" onClick={this.abandonarPartida}>Abandonar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AbandonarPartida);