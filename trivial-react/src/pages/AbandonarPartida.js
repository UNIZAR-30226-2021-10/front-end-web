import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/AbandonarPartida.css'

class AbandonarPartida extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
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
                        <button className="btnPosponer" onClick={() => history.push('/DecisionJuego', {usuario: usuario})}>Posponer</button>
                        <button className="btnAbandonar" onClick={() => history.push('/DecisionJuego', {usuario: usuario})}>Abandonar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AbandonarPartida);