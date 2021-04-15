import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ModoMultijugador.css'
import {LeftOutlined} from '@ant-design/icons';
import axios from 'axios';

const baseUrl='http://localhost:3001/partidas';

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
            code: '',
            partidas: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const peticionGet = async()=>{
            await axios.get(baseUrl)
            .then(response=>{
               this.setState({partidas: response.data});
            })
        }
        peticionGet();
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
        //Cogemos el codigo introducido por el usuario y la información de las partidas de la db
        const {code,partidas} = this.state;
        //Buscar informacion de la partida con codigo "code"
        const busqPartidas =  partidas.filter((partida,index) => partida.code===code);
        if(busqPartidas.length==0){   //El código no coincide con ninguna partida existente
            alert("El código no coincide con ninguna partida existente.");
            //Borrar el campo del código
            this.resetCampos(['code']);
        } else{     //Existe la partida
            const partida = busqPartidas[0];
            let user = "-1";
            let firstJoin = true;
            partida.jugadoresEnPartida.forEach((jugador, index) => {
                if (jugador.username===usuario){
                    user = index; 
                    firstJoin = false;
                }
            });
            if(partida.jugadoresEnPartida.length==partida.maxJugadores && user=="-1"){   //Si la partida está llena y no estas entre los jugadores
                alert("La partida está completa.");
                //Borrar el campo del código
                this.resetCampos(['code']);
            } else if(true){    //Si hay hueco en la partida o estás entre los jugadores
                alert("Bienvenido a la partida "+ usuario);
                if(user!="-1"){ //Si estas entre los jugadores -> unirse
                    console.log(user);
                }else{ //Si la partida no está llena y no estas entre los jugadores -> nuevo
                    //Buscamos avatar del usuario en bd y creamos el jugador nuevo
                    const avatar = '/images/usuario.png';
                    const jugadorNuevo = {username: usuario, avatar: avatar, puntos:'0'};
                    partida.jugadoresEnPartida.push(jugadorNuevo);
                    user = partida.jugadoresEnPartida.length-1;
                    //Actualizar partidas en db
                    const res = axios.put(baseUrl+"/"+partida.id, partida);
                }
                history.push("/MultijugadorUnirse?username="+usuario+"&code="+code, 
                    {   usuario: user, 
                        maxRondas: partida.maxRondas,
                        code: partida.code, 
                        jugadores: partida.jugadoresEnPartida,
                        maxJugadores: partida.maxJugadores,
                        firstJoin: firstJoin
                    });
            } else{     //Fallo de unirse en una partida por otros motivos
                alert('Ha habido un fallo, vuelva a intentarlo.');
            }
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