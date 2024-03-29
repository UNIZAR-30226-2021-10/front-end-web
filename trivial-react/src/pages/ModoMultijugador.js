import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ModoMultijugador.css'
import {LeftOutlined} from '@ant-design/icons';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {baseURL} from './images';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

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
                if(inputs[h].name === campos[i]){
                    inputs[h].value="";
                }
            }
        }
    }

    // Petición get a la db: busca una partida con codigo "code".
    buscarCodigo(codigo){
        //Mirar si existe una partida con ese código
        return new Promise((resolve, reject) => {
            fetch(baseURL+'/Multijugador_PartidaCode?codigo='+ codigo)
            .then(response=>{   //Existe una partida con ese código
                if (response.ok) {
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }

    // Petición get a la db: busca los jugadores y sus usuarios de la partida con id "idpartida".
    buscarJugadoresUsuario(idpartida){
        //Buscar jugadores y sus usuarios de la partida de id "idpartida"
        return new Promise((resolve, reject) => {
            fetch(baseURL+'/Multijugador_PartidaJugadoresUsuario?idpartida='+ idpartida)
            .then(response=>{   //Hay jugadores en esa partida
                if (response.ok) {
                    console.log(response)
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }

    /*// Petición get a la db: busca los jugadores de la partida con id "idpartida".
    buscarJugadores(idpartida){
        //Buscar jugadores de la partida de id "idpartida"
        return new Promise((resolve, reject) => {
            fetch(baseUrl+'/Multijugador_PartidaJugadores?idpartida='+ idpartida)
            .then(response=>{   //Hay jugadores en esa partida
                if (response.ok) {
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }

    // Petición get a la db: busca al usuario con correo "email".
    buscarUsuario(email){
        return new Promise((resolve, reject) => {
            fetch(baseUrl+'/Multijugador_PartidaUsuario?email='+ email)
            .then(response=>{   //Usuario encontrado
                if (response.ok) {
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }*/

    //Petición post a la db: guarda al usuario como jugador de la partida.
    postJugador(codigo, jugador){
        const cookies = new Cookies();
        const email = cookies.get('email');
        
        //Guarda los resultados en la tabla juega.
        axios.post(baseURL+'/UnirseMultijugador_Juega', 
            { codigo: codigo, email: email, puntos: jugador.puntos})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log(e);     
        });
    }

    handleSubmit(e) {
        const cookies = new Cookies();
        const email = cookies.get('email');
        const history = this.props.history;
        const usuario = this.props.usuario;
        //Cogemos el codigo introducido por el usuario y la información de las partidas de la db
        const {code} = this.state;
        this.buscarCodigo(code)
        .then((res) =>{    //Existe la partida
            const partida = res[0];
            console.log("Partida con código " + code + " existente: "+ partida.idpartida);
            //Buscar los jugadores y sus usuarios de la partida
            this.buscarJugadoresUsuario(partida.idpartida)
            .then((jugadores) =>{
                console.log(jugadores);
                //Mirar tu posicion en la partida y si es la primera vez que te unes
                let user = "-1";
                let firstJoin = true;
                //Construir los jugadores para pantalla Multijugador Unirse
                let jugadoresUnirse = [];
                jugadores.forEach((jugador, index) => {
                    if (jugador.usuario_email === email){
                        user = index; 
                        firstJoin = false;
                    }
                    jugadoresUnirse.push({username: jugador.nickname, avatar: jugador.imagen, puntos: jugador.puntuacion, conectado:true});
                });
                if(jugadores.length === partida.numJugadores && user === "-1"){   //Si la partida está llena y no estas entre los jugadores
                    swal({
                        text: "La partida está completa.",
                        icon: "warning",
                        button: "Ok"
                    });
                    //Borrar el campo del código
                    this.resetCampos(['code']);
                }else { //Si hay hueco en la partida o estás entre los jugadores
                    if(user !== "-1"){ //Si estas entre los jugadores -> unirse
                        console.log("Estoy entre los jugadores: "+user);

                    }else{ //Si la partida no está llena y no estas entre los jugadores -> nuevo
                        console.log("Soy un nuevo jugador: "+user);
                        //Construir jugador nuevo
                        const avatar = cookies.get('avatar');
                        const jugadorNuevo = {username: usuario, avatar: avatar, puntos:'0', conectado:true};
                        jugadoresUnirse.push(jugadorNuevo);
                        user = jugadoresUnirse.length-1;

                        //Insertar nuevo jugador en db
                        this.postJugador(partida.codigo, jugadorNuevo);
                    }

                    console.log(jugadoresUnirse);
                    history.push("/MultijugadorUnirse?username="+usuario+"&code="+code, 
                        {   usuario: user, 
                            maxRondas: partida.rondas,
                            code: partida.codigo, 
                            jugadores: jugadoresUnirse,
                            maxJugadores: partida.numJugadores,
                            firstJoin: firstJoin
                        });
                }
            })
            .catch((err) => {
                console.log("Error busqueda jugadores y usuarios: "+err);
            });
        })
        .catch((err) =>{
            if (err === 400){ 
                console.log("No existe la partida con codigo: "+ code);
                swal({
                    text: "El código no coincide con ninguna partida existente.",
                    icon: "warning",
                    button: "Ok"
                });
                //Borrar el campo del código
                this.resetCampos(['code']);
            }else{
                console.log("Error busqueda partida: "+err);
                swal({
                    text: "Ha habido un error, vuelva a intentarlo otra vez.",
                    icon: "warning",
                    button: "Ok"
                });
            }
        })
        e.preventDefault();
    }

    render(){
        return(
            <div className="UnirseAPartida">
                <h1>Únete a una partida</h1>
                <p>Introduza código de la reunión:</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" className="form-control" name="code" placeholder="Enter the starting code." onChange={this.handleChange} required/>
                        <button  className="btn primary-btn" type="submit"> <b>Acceder </b></button>
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
        history.push('/MultijugadorCrear', {usuario: username});
        e.preventDefault();
    }

    render(){
        return(
            <div className="CrearPartida">
                <h1>Crea una nueva partida</h1>
                <button className="btn btn-primary" onClick={this.handleCrearPartida}><b>Crear partida nueva</b></button>
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