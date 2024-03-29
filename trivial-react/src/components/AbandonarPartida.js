import React from 'react';
import '../css/AbandonarPartida.css';
import storage from '../lib/storage';

class AbandonarPartida extends React.Component{
    cerrarAbandonar = () => {
        this.props.setParentsState([{clickAtras: false}]);
    }

    abandonarPartida = () => {
        const history = this.props.history;
        //Borrar estado de la partida
        storage(localStorage).removeData("estadoMulti");
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
                        <button onClick={this.cerrarAbandonar}>Cancelar</button>
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

export default AbandonarPartida;