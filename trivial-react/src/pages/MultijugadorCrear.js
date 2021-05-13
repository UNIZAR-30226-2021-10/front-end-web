import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/MultijugadorCrear.css';
import {LeftOutlined} from '@ant-design/icons';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {help} from './images';

const baseUrl='http://localhost:3050';

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

    rand(min, max){
        const rand = Math.floor(min + Math.random()*(max-min+1));
        return rand;
    }
    
    generarCodigo(longitud){
        let code = '';
        const pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
        const min = 0;
        const max = pattern.length-1;
        let randpattern;
        for(var i=0; i<longitud; i++){
            randpattern = this.rand(min,max);
            code = code + pattern[randpattern];
        }
        return code;
    } 

    // Petición get a la db: busca una partida con codigo "code".
    buscarCodigo(codigo){
        //Mirar si existe una partida con ese código
        return new Promise((resolve, reject) => {
            fetch(baseUrl+'/Multijugador_PartidaCode?codigo='+ codigo)
            .then(response=>{   //Existe una partida con ese código
                if (response.ok) {
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }

    // Usada para generar un código válido de partida.
    generarCodigoPartida(){
        const longitud = 6; //Código de 6 letras o dígitos.
        const code = this.generarCodigo(longitud);  //Genera código
        return new Promise((resolve,reject) => {
            this.buscarCodigo(code)
            .then((json) =>{
                console.log("Partida con código " + code + " existente: "+ json);
                this.generarCodigoPartida()
                .then((res) => {resolve(res)})
                .catch((err) => {reject(err)})
            })
            .catch((err) =>{
                if (err == 400){ 
                    console.log("No existe la partida con codigo: "+ code);
                    resolve(code);
                }else{
                    console.log("Otro error: "+err);
                    reject("ERROR");
                }
            })
        })
    }

    //Petición post a la db: guarda la partida creada en las tabla partida.
    //y guarda al usuario como jugador de la partida.
    postPartida(codigo, jugador){
        const cookies = new Cookies();
        const email = cookies.get('email');
        const selectJugadores = this.state.selectJugadores;
        const selectRondas = this.state.selectRondas;
        //Construcción del formato de fecha
        var d = new Date();
        const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const fecha = d.getFullYear() + "--" + meses[d.getMonth()] + "--" + d.getDate() + 
                    "(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
        
        //Guarda los resultados en la tabla partida.
        axios.post(baseUrl+'/CrearMultijugador_Partida', 
            { fecha: fecha, numJugadores: selectJugadores, rondas: selectRondas, ganador: jugador.username, codigo: codigo})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
            //Guarda los resultados en la tabla juega.
            axios.post(baseUrl+'/UnirseMultijugador_Juega', 
                { codigo: codigo, email: email, puntos: jugador.puntos})
            .then(response => { //Respuesta del servidor
                console.log(response.data.message);  
            }).catch(e => { //Error
                console.log(e);     
            });
        }).catch(e => { //Error
            console.log(e);     
        });
    }

    handleSubmit(e) {
        const cookies = new Cookies();
        const history = this.props.history;
        const usuario = this.props.usuario;
        //Cogemos los datos introducidos por el usuario
        const selectJugadores = this.state.selectJugadores;
        const selectRondas = this.state.selectRondas;
        //Construir jugador
        const avatar = cookies.get('avatar');
        const email = cookies.get('email');
        const jugador = {username: usuario, avatar: avatar, puntos:'0'};
        //Crear partida
        this.generarCodigoPartida()
        .then((code) =>{
            console.log("Se ha generado partida con código: "+code);
            if(code){  //Si se genera un código válido
                // Introducir en bd la partida y el jugador.
                this.postPartida(code, jugador);
                alert("Has creado una partida nueva. Código: "+ code);
                history.push("/MultijugadorUnirse?username="+usuario+"&code="+code, 
                    {   usuario: '0',
                        maxRondas: selectRondas,
                        code: code,
                        jugadores: [jugador],
                        maxJugadores: selectJugadores,
                        firstJoin: true
                    });
            } else{     //Fallo de creación de partida por otros motivos
                alert('Ha habido un fallo, vuelva a intentarlo.');
            } 
        })
        .catch((err) => console.log(err));
        e.preventDefault();
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

