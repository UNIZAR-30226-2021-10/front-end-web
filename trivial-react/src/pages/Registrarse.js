import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Registrarse.css';
import {LeftOutlined} from '@ant-design/icons';
import axios from 'axios';
import {baseURL, imagesURL} from './images';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faQuestionCircle} from '@fortawesome/free-solid-svg-icons';


class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/MenuInicio")}/> 
                    Atrás
                </div>
                <h1>Registrarse</h1>
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
            </div>
        );
    }
}

class FormRegistro extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repPassword: '',
            avatar:''
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

    postObjetoNuevo(nombreItem, email){
        //Guarda los resultados en la tabla juega.
        axios.post(baseURL+'/ObjetoTienda', 
            { nombreObjeto: nombreItem, email: email})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log(e);     
        });
    }

    guardarRegistro = (username, history, urlItem) => { 
 
        axios.post(baseURL+"/Registrarse", {nickname:this.state.username,email:this.state.email,password:this.state.password,imagen:urlItem})
                        
            .then(response => {console.log(response.data);
                
                if (response.status === 200){               //Inserción correcta
                    this.postObjetoNuevo("Naranja", this.state.email)
                    
                    swal({
                        title: "Bienvenido",
                        text: "Tu cuenta se ha creado correctamente",
                        icon: "success",
                        button: "Ok"
                    });

                    history.push('/MenuInicio');
                }
            })

            .catch(error => {
                console.log(error);
                
                //Insertar usuario en la bd
                if (error.response.status === 400){         //Si el usuario ya está siendo usado o es inválido

                    swal({
                        text: "Nombre de usuario no disponible",
                        icon: "warning",
                        button: "Ok"
                    });

                    //Borrar nombre de usuario del input
                    this.resetCampos(['username']);
                } else if (error.response.status === 410){  //Si el email esta repetido
                    //Borrar email del input

                    swal({
                        text: "Ya existe una cuenta con ese correo",
                        icon: "warning",
                        button: "Ok"
                    });

                    this.resetCampos(['email']);
                }  else{                                    //Fallo de registro por otros motivos
                    swal({
                        text: "Ha habido un error, por favor, vuelva a intentarlo",
                        icon: "warning",
                        button: "Ok"
                    });
                }
                    
            });
    }

    handleSubmit(e) {
        const history = this.props.history;
        //Cogemos los datos introducidos por el usuario
        const username = this.state.username;
        const password = this.state.password;
        const repPassword = this.state.repPassword;


        if (password !== repPassword){ //Si no coinciden las contraseñas
            alert('Las contraseñas deben coincidir')
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);
            return;
        }
        
        //Insertar usuario en la bd
        const urlItem = imagesURL+"/tienda/color_naranja.png";
        this.guardarRegistro(username, history,urlItem);
        
        e.preventDefault();
    }

    render(){
        const urlItem = imagesURL+"/tienda/color_naranja.png";
        return(
            <div className="FormRegistro">
                <div className="imgAvatar">
                    <img src={urlItem} alt="Avatar"/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Usuario </label>
                        <input class="form-control" type="text" name="username" placeholder="Enter your username." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="email">Email </label>
                        <input class="form-control" type="email" name="email" placeholder="Enter your email." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input class="form-control" type="password" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir Contraseña</label>
                        <input class="form-control" type="password" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <button class="btn btn-primary" type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}

class Registrarse extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Registrarse">
                <Header history={history}/>
                <FormRegistro history={history}/>
            </div>
        );
    }
}

export default withRouter(Registrarse);