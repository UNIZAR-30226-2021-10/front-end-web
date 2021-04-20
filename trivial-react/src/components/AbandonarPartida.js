import React from 'react';
import '../css/AbandonarPartida.css'

class AbandonarPartida extends React.Component{
    cerrarAbandonar = () => {
        this.props.setParentsState([{clickAtras: false}]);
    }

    render(){
        const history = this.props.history;
        const usuario = this.props.usuario;
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
                        <button className="btnAbandonar" onClick={() => history.push('/DecisionJuego')}>Abandonar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AbandonarPartida;