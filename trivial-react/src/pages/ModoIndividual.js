import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ModoIndividual.css';
import {LeftOutlined} from '@ant-design/icons';
import {help} from './images';
import storage from '../lib/storage';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class FormCrearMultijugador extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectRondas: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnirse = this.handleUnirse.bind(this);
    }
    
    handleChange(e) {
        const {name, value}=e.target;
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(e) {
        let crearPartida = false;
        var estado = storage(localStorage).getData("estado");
        if (estado !== null){ //Si hay datos de partida existente
            //Avisar de que se borrarán si acepta crear la partida
            var opcion = window.confirm("Los datos de la partida existente se borrarán "+
            "si creas una partida nueva. ¿Sigues queriendo crear la partida?");
            if (opcion){ //Crear partida
                crearPartida = true; 
            }
        } else { //Si no hay datos de partida existente
            crearPartida = true; //Crear partida
        }
        if(crearPartida){  //Crear partida
            const history = this.props.history;
            const selectRondas = this.state.selectRondas; //Datos introducidos por el usuario
            //Borrar estado de la partida
            storage(localStorage).removeData("estado");
            //Ir a la partida
            history.push('/IndividualPartida', {maxRondas: selectRondas});
        }
        e.preventDefault();
    }

    handleUnirse() {
        const history = this.props.history;
        history.push('/IndividualPartida', {maxRondas: '0'});
    }

    render(){
        var estado = storage(localStorage).getData("estado");
        return(
            <div className="FormCrearMultijugador">
                <div className="Crear">
                    <h1>Crea una partida nueva</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="filSelect">
                            <p>Introduzca el número de rondas</p>
                            <select name="selectRondas" defaultValue={''} onChange={this.handleChange} required>
                                <option value="" disabled hidden>-</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <button type="submit">¡Comenzar!</button>
                    </form>
                </div>
                {estado !== null ? ( //Si hay datos guardados como "estado"
                    <div className="Unirse">
                        <h1>O únete </h1>
                        <button onClick={this.handleUnirse}>Unirse</button>
                    </div>
                ):(
                    <div>
                    </div>
                )}
            </div>
        );
    }
}

class ModoIndividual extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="ModoIndividual">
                <Header history={history}/>
                <FormCrearMultijugador history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(ModoIndividual);

