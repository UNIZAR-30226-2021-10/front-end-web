import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ModoMultijugador.css'
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
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class UnirseAPartida extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            code: ''
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

    resetCampos(campos){
        var inputs = document.getElementsByTagName('input');
        for (var h=0;h<inputs.length;h++){
            for (var i=0; i<campos.length;i++){
                if(inputs[h].name==campos[i]){
                    inputs[h].value="";
                }
            }
        }
    }

    handleSubmit(e) {
        const history = this.props.history;
        const usuario = this.props.usuario;
        //Cogemos el codigo introducido por el usuario
        const code = this.state.code;
        //Unirse a partida
        //Buscar en bd la informacion de la partida con codigo "code"
        const partida = {   
            code: "code", 
            jugadoresEnPartida: [
                {username:"usuario1", avatar:'/images/usuario.png', puntos:'25'},
                {username:"usuario2", avatar:'/images/usuario.png', puntos:'17'},
                {username:"usuario3", avatar:'/images/usuario.png', puntos:'15'}
            ],
            maxJugadores: "4",
            maxRondas: "5"
        }
        if(partida.code != code){   //El código no coincide con ninguna partida existente
            alert("El código no coincide con ninguna partida existente.");
            //Borrar el campo del código
            this.resetCampos(['code']);
        } else if(partida.jugadoresEnPartida.length == partida.maxJugadores){   //Si la partida está llena
            alert("La partida está completa.");
            //Borrar el campo del código
            this.resetCampos(['code']);
        } else if(true){    //El código coincide y hay hueco en la partida
            alert("Bienvenido a la partida "+ usuario);
            //Buscamos avatar del usuario en bd y creamos el jugador nuevo
            const avatar = '/images/usuario.png';
            const jugadorNuevo = {username: usuario, avatar: avatar, puntos:'0'};
            history.push('/MultijugadorUnirse/'+partida.code, 
                {   usuario: partida.jugadoresEnPartida.length, 
                    maxRondas: partida.maxRondas,
                    code: partida.code, 
                    jugadores: partida.jugadoresEnPartida,
                    jugador: jugadorNuevo,
                    maxJugadores: partida.maxJugadores
                });
        } else{     //Fallo de unirse en una partida por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className="UnirseAPartida">
                <h1>Únete a una partida</h1>
                <p>Introduza código de la reunión :</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="introducirCode">
                        <input type="text" name="code" placeholder="Enter the starting code." onChange={this.handleChange} required/>
                        <button type="submit">Acceder</button>
                    </div>
                </form>
            </div>
        );
    }
}

class CrearPartida extends React.Component{
    constructor(props) {
        super(props);
        this.handleCrearPartida = this.handleCrearPartida.bind(this);
    }

    handleCrearPartida(e){
        const history = this.props.history;
        const username = this.props.usuario;
        //Crear partida
        if (true){  //Se ha podido crear partida nueva
            history.push('/MultijugadorCrear', {usuario: username});
        } else{     //Fallo de creación por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className="CrearPartida">
                <h1>O</h1>
                <h1>Crea una nueva</h1>
                <button onClick={this.handleCrearPartida}>Crear partida nueva</button>
            </div>
        );
    }
}

class ModoMultijugador extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="ModoMultijugador">
                <Header history={history}/>
                <UnirseAPartida history={history} usuario={usuario}/>
                <CrearPartida history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(ModoMultijugador);