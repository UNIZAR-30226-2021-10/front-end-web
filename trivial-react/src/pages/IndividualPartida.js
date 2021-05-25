import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/IndividualPartida.css'
import {LeftOutlined} from '@ant-design/icons';
import Dado from '../components/Dado';
import axios from 'axios';
import {amarillo, azul, marron, naranja, rosa, verde, baseURL} from './images';
import Cookies from 'universal-cookie';
import storage from '../lib/storage';
import swal from 'sweetalert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component{
    abrirAbandonar = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Si abandonas la partida se perderá tu progreso",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    const history = this.props.history;
                    //Borrar estado de la partida
                    storage(localStorage).removeData("estado");
                    //Salir de la partida
                    history.push('/DecisionJuego');
                }
        });  
    }

    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                <LeftOutlined onClick={this.abrirAbandonar}/> 
                    Atrás
                </div>
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
            </div>
        );
    }
}

class Juego extends React.Component{
    render(){
        const {ronda,jugador,dado} = this.props;
        return(
            <div className="Juego">
                    <div className="infoJuego">
                        <div className="ronda">
                            <p>Ronda Nº:</p>
                            <p>{ronda}</p>
                        </div>
                        <div>
                            <p>Puntos:</p>
                            <p>{jugador.puntos}</p>
                        </div>
                    </div>
                <div className="dado">
                        <Dado dado={dado}/>
                </div>
            </div>
        );
    }
}

class Pregunta extends React.Component{

    handleClick = (e) => {
        e.preventDefault();
        this.props.handleClick(e);
    }

    handleNext = () => {
        this.props.handleNext();
    }

    render(){
        const {pregunta,colorBtnA,colorBtnB,colorBtnC,colorBtnD,hasRespondido} = this.props;
        const disabled=hasRespondido;
        const diabledNext=!hasRespondido;
        return(
            <div className="Pregunta"> 
                <div>
                    <p>{pregunta.ask}</p>
                    <div className="respuesta">
                        <tr>
                            <div>
                                <button name="opcionA" onClick={this.handleClick} disabled={disabled}
                                    style={{ background: colorBtnA}} >{pregunta.opcionA}</button>
                            </div>
                            <div>
                                <button name="opcionB" onClick={this.handleClick} disabled={disabled}
                                    style={{ background: colorBtnB}}>{pregunta.opcionB}</button>
                            </div>
                        </tr>
                        <tr>
                            <div>
                                <button name="opcionC" onClick={this.handleClick} disabled={disabled}
                                    style={{ background: colorBtnC}}>{pregunta.opcionC}</button>
                            </div>
                            <div>
                                <button name="opcionD" onClick={this.handleClick} disabled={disabled}
                                    style={{ background: colorBtnD}}>{pregunta.opcionD}</button>
                            </div>
                        </tr>
                    </div>
                    <button name="next" onClick={this.handleNext} disabled={diabledNext}>Next</button>
                </div>
            </div>
        );
    }
}

class IndividualPartida extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.cargarEstado();
        var estado = storage(localStorage).getData("estado");
        if (estado === null){  //Si no hay datos guardados como estado
            this.tirarDado();
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.tirarDado = this.tirarDado.bind(this);
    }

    cargarEstado() { //Carga el estado
        var estado = storage(localStorage).getData("estado");
        if (estado === null){  //Si no hay datos guardados como estado
            //Construir jugador
            const cookies = new Cookies();
            const usuario = cookies.get('user');
            const avatar = cookies.get('avatar');
            estado = {
                ronda: '1',
                jugador: {username: usuario, avatar: avatar, puntos:'0'},
                dado: {img: marron, category:"", color:'black'},
                pregunta: '',
                colorBtnA: 'white',
                colorBtnB: 'white',
                colorBtnC: 'white',
                colorBtnD: 'white',
                hasRespondido: false,
                maxRondas: this.props.location.state.maxRondas
            };
        }
        console.log(this.props.location.state);
        console.log(estado);
        return estado;
    }

    componentDidUpdate(){
        //this.onBeforeUnloadPage();
        this.onUnloadPage();
    }

    /*onBeforeUnloadPage(){ //Antes de recargar/salir de la pagina -> Preguntar
        function areYouSure(e) {
            var confirmationMessage = "Are you sure you want to exit this page?";
            e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
            return confirmationMessage;              // Gecko, WebKit, Chrome <34
        }
        window.onbeforeunload = areYouSure;
    }*/

    onUnloadPage(){ //Al recargar/salir de la página -> Guardar estado de la partida
        window.onunload = storage(localStorage).setData("estado", this.state);
    }

    render(){
        const history = this.props.history;
        const { ronda, jugador, dado, pregunta, hasRespondido,
                colorBtnA, colorBtnB, colorBtnC, colorBtnD} = this.state;
        return(
            <div className="IndividualPartida">
                <Header history={history}/>
                <Juego  history={history} 
                        ronda={ronda}
                        jugador={jugador} 
                        dado={dado}
                        tirarDado={this.tirarDado}
                />
                <Pregunta   pregunta={pregunta}
                            colorBtnA={colorBtnA}
                            colorBtnB={colorBtnB}
                            colorBtnC={colorBtnC}
                            colorBtnD={colorBtnD}
                            hasRespondido={hasRespondido}
                            handleClick={this.handleClick}
                            handleNext={this.handleNext}
                />
            </div>
        );
    }

    handleClick(e) {
        const {jugador,pregunta,hasRespondido} = this.state;
        if(!hasRespondido){
            switch (pregunta.answer) {
                case 'opcionA': this.setState({colorBtnA: 'green'}); break;
                case 'opcionB': this.setState({colorBtnB: 'green'}); break;
                case 'opcionC': this.setState({colorBtnC: 'green'}); break;
                case 'opcionD': this.setState({colorBtnD: 'green'}); break;
                default: break;
            }
            let respuesta = e.target.name;
            if (pregunta.answer === respuesta){  //Acierta
                let actJugador = jugador;
                actJugador.puntos = Number(jugador.puntos) + Number(pregunta.puntos);
                this.setState({jugador: actJugador});
            } else{     //Falla
                switch (respuesta) {
                    case 'opcionA': this.setState({colorBtnA: 'red'}); break;
                    case 'opcionB': this.setState({colorBtnB: 'red'}); break;
                    case 'opcionC': this.setState({colorBtnC: 'red'}); break;
                    case 'opcionD': this.setState({colorBtnD: 'red'}); break;
                    default: break;
                }
            }
            this.setState({hasRespondido:true});
        }
    }

    //Petición post a la db: guarda los resultados en las tablas partida, juega y usuario
    postPartida(){
        const {jugador, maxRondas}=this.state;
        const cookies = new Cookies();
        const email = cookies.get('email');

        //Construcción del formato de fecha
        var d = new Date();
        const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const fecha = d.getFullYear() + "--" + meses[d.getMonth()] + "--" + d.getDate() + 
                    "(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
        //Construcción de monedas
        const monedas = Number(Math.floor(jugador.puntos*0.5));

        //Guarda los resultados en las tablas partida y juega.
        axios.post(baseURL+'/FinalIndividual', 
            { fecha: fecha, numJugadores: 1, rondas: maxRondas, ganador: jugador.username, email: email, puntos: jugador.puntos})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log("Error en las tablas partida y juega: "+e);     
        });

        //Guarda los resultados en la tabla usuario.
        axios.post(baseURL+'/FinalIndividual_Usuario', 
            { email: email, monedas: monedas, puntos: jugador.puntos })
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log("Error en la tabla usuario: "+e);         
        });
    }

    handleNext() {
        const history = this.props.history;
        const {ronda, jugador, maxRondas}=this.state;
        //Pasar al siguiente turno
        if (ronda === Number(maxRondas)){ //Ya se han jugado todas las rondas
            //Finalizar partida
            this.postPartida();
            //Borrar estado de la partida
            storage(localStorage).removeData("estado");
            //Actualizar cookies
            const cookies = new Cookies();
            const monedas = Number(cookies.get('monedas')) + Number(Math.floor(jugador.puntos*0.5));
            const puntos = Number(cookies.get('puntos')) + Number(jugador.puntos);
            cookies.set('monedas', monedas, {path: '/'});
            cookies.set('puntos', puntos, {path: '/'});
            //Ir a la ventana final
            history.push('/FinalIndividual', {jugador: jugador});
        } else {  //Se sigue jugando
            this.setState({ronda: (Number(ronda)+1)%(Number(maxRondas)+1)});
        }
        this.tirarDado();
        this.setState({ hasRespondido: false,
                        hasTiradoDado: false,
                        colorBtnA: 'white',
                        colorBtnB: 'white',
                        colorBtnC: 'white',
                        colorBtnD: 'white',
                        dado: {img: this.state.dado.img, category:"", color:'black'}
        });
    }

    rand(min, max){
        const rand = Math.floor(min + Math.random()*(max-min+1));
        return rand;
    }

    // Petición get a la db: coge una pregunta de categoria "categoria"
    // y construcción de la pregunta.
    getPregunta(dado){
        return new Promise((resolve, reject) => {
            fetch(baseURL+'/ModoIndividual?category='+ dado.category)
            .then(response=>{   //Existe una partida con ese código
                if (response.ok) {
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }

    tirarDado(){
        const colores = ["#703C02", "#0398FA", "#FFDA00", "#FC57FF", "#17B009", "#FF8D00"];
        const imagenes = [  marron, azul, amarillo, rosa, verde, naranja];
        const categorias = ["Art and Literature", "Geography", "History", "Film and TV", "Science", "Sport and Leisure"];
        const puntos_categoria= [20, 30, 25, 15, 5, 10];
        const valor = this.rand(0,5);
        const dado = {img: imagenes[valor], category: categorias[valor], color: colores[valor], puntos: puntos_categoria[valor]};
        let pregunta = "";
        this.getPregunta(dado)
        .then((res) =>{  
            const {incorrecta1, incorrecta2, incorrecta3, correcta, enunciado} = res.idpregunta;
            const opcionCorrecta = this.rand(1,4);
            pregunta = {ask: enunciado, opcionA:'', opcionB:'', opcionC:'', opcionD:'', answer:'', puntos: dado.puntos}
            switch (opcionCorrecta){
                case 1: //Opción correcta: opcionA
                    pregunta.opcionA=correcta;
                    pregunta.opcionB=incorrecta1;
                    pregunta.opcionC=incorrecta2;
                    pregunta.opcionD=incorrecta3;
                    pregunta.answer='opcionA';
                    break;
                case 2: //Opción correcta: opcionB
                    pregunta.opcionA=incorrecta1;
                    pregunta.opcionB=correcta;
                    pregunta.opcionC=incorrecta2;
                    pregunta.opcionD=incorrecta3;
                    pregunta.answer='opcionB';
                    break;
                case 3: //Opción correcta: opcionC
                    pregunta.opcionA=incorrecta1;
                    pregunta.opcionB=incorrecta2;
                    pregunta.opcionC=correcta;
                    pregunta.opcionD=incorrecta3;
                    pregunta.answer='opcionC';
                    break;
                case 4: //Opción correcta: opcionD
                    pregunta.opcionA=incorrecta1;
                    pregunta.opcionB=incorrecta2;
                    pregunta.opcionC=incorrecta3;
                    pregunta.opcionD=correcta;
                    pregunta.answer='opcionD';
                    break;
                default:
                    break;
            }
            this.setState({pregunta: pregunta, dado: dado});
        })
        .catch((err) =>{
            console.log("Error busqueda pregunta: "+err);
            swal({
                text: "Ha habido un error, vuelva a intentarlo otra vez.",
                icon: "warning",
                button: "Ok"
            });
        })
    }
}

export default withRouter(IndividualPartida);