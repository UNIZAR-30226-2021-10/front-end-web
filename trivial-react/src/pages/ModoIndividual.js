import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ModoIndividual.css';
import {LeftOutlined} from '@ant-design/icons';
import storage from '../lib/storage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}/>
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
        const history = this.props.history;
        const selectRondas = this.state.selectRondas; //Datos introducidos por el usuario
        //Borrar estado de la partida
        storage(localStorage).removeData("estado");
        //Ir a la partida
        history.push('/IndividualPartida', {maxRondas: selectRondas});
        e.preventDefault();
    }

    handleUnirse() {
        const history = this.props.history;
        history.push('/IndividualPartida', {maxRondas: '0'});
    }

    render(){
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
                        <button className="btn btn-primary" type="submit">¡Comenzar!</button>
                    </form>
                </div>
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

