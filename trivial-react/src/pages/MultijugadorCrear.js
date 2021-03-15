import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/MultijugadorCrear.css';
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const help = '/images/help.png';
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
            selectJugadores: '',
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
        const history = this.props.history;
        const usuario = this.props.usuario;
        //Cogemos los datos introducidos por el usuario
        const selectJugadores = this.state.selectJugadores;
        const selectRondas = this.state.selectRondas;
        //Buscamos avatar en bd
        const avatar = '/images/usuario.png';
        const jugador = {username: usuario, avatar: avatar, puntos:'0'};
        //Crear partida
        if(true){  //Se puede crear partida
            const longitud = 6;
            const code = "code";
            if (false){ //Si el código está ya en la bd
                code = this.generarCodigo(longitud);
            }
            // Introducir en bd (code, jugadoresEnPartida, maxJugadores, maxRondas)
            alert("Has creado una partida nueva. Código: "+ code);
            history.push('/MultijugadorUnirse/'+code, 
                {   usuario: '0',
                    maxRondas: selectRondas,
                    code: code,
                    jugadores: [],
                    jugador: jugador,
                    maxJugadores: selectJugadores
                });
        } else{     //Fallo de creación de partida por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        } 
        e.preventDefault();
    }
    
    generarCodigo(longitud){
        const code = '';
        const pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
        const min = 0;
        const max = pattern.length-1;
        for(const i=0; i<longitud; i++) 
            code.push(pattern[this.rand(min,max)]);
        return code;
    } 

    rand(min, max){
        const rand = Math.floor(min + Math.random()*(max-min+1));
        return rand;
    }

    render(){
        return(
            <div className="FormCrearMultijugador">
                <form onSubmit={this.handleSubmit}>
                    <div className="filSelect">
                        <p>Introduzca el número de jugadores</p>
                        <select name="selectJugadores" defaultValue={''} onChange={this.handleChange} required>
                            <option value="" disabled hidden>-</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option  value="4">4</option>
                        </select>
                    </div>
                    <div className="filSelect">
                        <p>Introduzca el número de rondas</p>
                        <select name="selectRondas" defaultValue={''} onChange={this.handleChange} required>
                            <option value="" disabled hidden>-</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <button type="submit">Crear</button>
                </form>
            </div>
        );
    }
}

class MultijugadorCrear extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="MultijugadorCrear">
                <Header history={history}/>
                <FormCrearMultijugador history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(MultijugadorCrear);

