import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ModoIndividual.css';
import {LeftOutlined} from '@ant-design/icons';
import {help} from './images';
import Cookies from 'universal-cookie';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <h1>Crear partida nueva</h1>
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
    }
    
    handleChange(e) {
        const {name, value}=e.target;
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(e) {
        const cookies = new Cookies();
        const history = this.props.history;
        const usuario = this.props.usuario;
        //Cogemos los datos introducidos por el usuario
        const selectRondas = this.state.selectRondas;
        //Construir jugador
        const avatar = cookies.get('avatar');
        const jugador = {username: usuario, avatar: avatar, puntos:'0'};
        //Crear partida
        if(true){  //Se puede crear partida
            // Introducir en bd (code, jugadoresEnPartida, maxJugadores, maxRondas)
            alert("Has creado una partida nueva.");
            history.push('/IndividualPartida', 
                {   jugador: jugador,
                    maxRondas: selectRondas
                });
        } else{     //Fallo de creación de partida por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        } 
        e.preventDefault();
    }

    render(){
        return(
            <div className="FormCrearMultijugador">
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

