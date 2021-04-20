import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Registrarse.css';
import {LeftOutlined} from '@ant-design/icons';
import axios from 'axios';
import {help, imgAvatar} from './images';

const baseUrl='http://localhost:3050';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/MenuInicio")}/> 
                    Atrás
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
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
                if(inputs[h].name==campos[i]){
                    inputs[h].value="";
                }
            }
        }
    }

    postObjetoNuevo(nombreItem, email){
        //Guarda los resultados en la tabla juega.
        axios.post(baseUrl+'/ObjetoTienda', 
            { nombreObjeto: nombreItem, email: email})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log(e);     
        });
    }

    guardarRegistro = (username, history, urlItem) => { 
 
        axios.post("http://localhost:3050/Registrarse", {nickname:this.state.username,email:this.state.email,password:this.state.password,imagen:urlItem})
                        
            .then(response => {console.log(response.data);
                
                if (response.status === 200){               //Inserción correcta
                    this.postObjetoNuevo("Naranja", this.state.email)
                    alert("Usuario registrado correctamente: "+ username);
                    history.push('/MenuInicio');
                }
            })

            .catch(error => {
                console.log(error);
                
                //Insertar usuario en la bd
                if (error.response.status === 400){         //Si el usuario ya está siendo usado o es inválido
                    alert("Nombre de usuario no disponible.");
                    //Borrar nombre de usuario del input
                    this.resetCampos(['username']);
                } else if (error.response.status === 410){  //Si el email esta repetido
                    alert("Email ya existente.");
                    //Borrar email del input
                    this.resetCampos(['email']);
                }  else{                                    //Fallo de registro por otros motivos
                    alert('Ha habido un fallo, vuelva a intentarlo.');
                }
                    
            });
    }

    handleSubmit(e) {
        const history = this.props.history;
        //Cogemos los datos introducidos por el usuario
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const repPassword = this.state.repPassword;


        if (password !== repPassword){ //Si no coinciden las contraseñas
            alert("No coinciden las contraseñas.");
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);
            return;
        }
        
        //Insertar usuario en la bd
        const urlItem = "http://localhost:3060/tienda/color_naranja.png";
        this.guardarRegistro(username, history,urlItem);
        
        e.preventDefault();
    }

    render(){
        const urlItem = "http://localhost:3060/tienda/color_naranja.png";
        return(
            <div className="FormRegistro">
                <div className="imgAvatar">
                    <img src={urlItem} alt="Avatar"/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Usuario </label>
                        <input type="text" name="username" placeholder="Enter your username." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="email">Email </label>
                        <input type="email" name="email" placeholder="Enter your email." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir Contraseña</label>
                        <input type="password" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <button type="submit">Sign up</button>
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