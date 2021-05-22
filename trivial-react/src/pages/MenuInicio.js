import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/MenuInicio.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {logo, baseURL} from './images';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const cookies = new Cookies();
        console.log(cookies.get('user'));
        return(
            <div className="Header">
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
            </div>
        );
    }
}

class FormInicio extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
    guardarLogin = () => {
        const history = this.props.history;
        const {username,password} = this.state; //Datos introducidos por el usuario
        axios.post(baseURL+"/MenuInicio", {nickname: username,password: password})         
                        .then(response => { //Está registrado
                            console.log(response.data);
                            if (username === "admin"){
                                //Ir a la ventana del administrador
                                history.push('/Upload');
                            } else{
                                //Hacer cookie con lo que te devuelve en response
                                const cookies = new Cookies();
                                cookies.set('user', response.data.email.nickname, {path: '/'});
                                cookies.set('email', response.data.email.email, {path: '/'});
                                cookies.set('puntos', response.data.email.puntos, {path: '/'});
                                cookies.set('monedas', response.data.email.monedas, {path: '/'});
                                cookies.set('avatar', response.data.email.imagen, {path: '/'});

                                history.push('/DecisionJuego');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            if (error.response.status === 400){  //Si el usuario ya está siendo usado o es inválido
                                alert("Nombre de usuario o contrasena incorrectos");
                                //Borrar nombre de usuario del input
                                this.resetCampos(['username']);
                                this.resetCampos(['password']);
                            }else{     //Fallo de registro por otros motivos
                                alert('Ha habido un fallo, vuelva a intentarlo.');
                                this.resetCampos(['username']);
                                this.resetCampos(['password']);
                            }
                                
                        });
    }

    handleSubmit(e) {
        //Comprobar si el usuario esta en la bd y coincide la password
        //Comprobar si hay un usuario registrado con esos datos en la db
        this.guardarLogin();

        e.preventDefault();
    }

    render(){
        return(
            <div className="FormInicio">
                <img className="imgLogo" src={logo} alt="Wondergames Logo"></img>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Usuario </label>
                        <input type="text" className="form-control" name="username" placeholder="Enter your username." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <button className="btn btn-primary" type="submit">Acceder</button>
                </form>
            </div>
        );
    }
}

class FooterInicio extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="FooterInicio">
                <>
                    <button className="btnContraseñaOlvidada btn btn-secondary" onClick={() => history.push("/CambiarContrasena")}>Contraseña Olvidada</button>
                {"  "}
                    <button className="btnRegistrarse btn btn-secondary" onClick={() => history.push("/Registrarse")}>Registrarse</button>
                </>
            </div>
        );
    }
}

class MenuInicio extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="MenuInicio">
                <Header history={history}/>
                <FormInicio history={history}/>
                <FooterInicio history={history}/>
            </div>
        );
    }
}

export default withRouter(MenuInicio);