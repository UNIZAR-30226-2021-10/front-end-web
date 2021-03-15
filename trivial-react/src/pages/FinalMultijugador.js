import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/FinalMultijugador.css';

class FinalMultijugador extends React.Component {

    ganadores(){
        const jugadores = this.props.location.state.jugadores;
        const maxPuntos = jugadores[0].puntos;
        //Coger el ganador o ganadores si ha habido empate
        let ganadores =[];
        let ranking = [];
        let color='';
        jugadores.forEach((jugador) =>{
            if(jugador.puntos==maxPuntos){
                ganadores.push(jugador.username);
                color= "rgb(214, 204, 55)";
            }else{
                color=" rgb(143, 150, 143)";
            }
            ranking.push(
                <tr className="fila" style={{ background: color}}>
                    <img className="imgAvatar" src={jugador.avatar} alt={"Avatar de "+ jugador.username}></img>
                    <h1>{jugador.username}</h1>
                    <h1>{jugador.puntos} puntos</h1>
                </tr>
            );
        });
        return {ganadores, ranking};
    }

    render() {
        const history = this.props.history;
        const {jugadores,usuario} = this.props.location.state;
        const {ganadores,ranking} = this.ganadores();
        const trofeo = 'images/trofeo.png';
        return (
            <div className="FinalMultijugador">
                <div className="header">
                    <h1>Fin de la partida</h1>
                </div>
                <div className="infoGanadores">
                    <img className="imgVictoria" src={trofeo} alt={"Imagen Trofeo"}></img>
                    <div>
                        {ganadores.length==1 ? (
                            <h1>El ganador de la partida es <div className="negr">{ganadores[0]}</div></h1>
                        ): (
                            <h1>Empate: 
                                <div className="negr">
                                    { ganadores.map((ganador,index) => {
                                        return ganador+" ";
                                    })}
                                </div>
                            </h1>
                        )}
                        <h1>¡¡Enhorabuena!!</h1>
                    </div>
                </div>
                <div className="infoRanking">
                    <tbody className="ranking">
                        {ranking}
                    </tbody>
                    <button className="btnSalir" onClick={() => history.push("/DecisionJuego", {usuario: jugadores[usuario].username})}>Salir</button>
                </div>
            </div>
        )
    }  
};

export default withRouter(FinalMultijugador);

