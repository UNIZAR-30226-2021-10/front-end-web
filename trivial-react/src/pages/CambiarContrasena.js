import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/CambiarContrasena.css';
import {LeftOutlined} from '@ant-design/icons';
import {help} from './images';
import emailjs from 'emailjs-com';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/MenuInicio")}/> 
                    Atrás
                </div>
                <h1>Cambiar contraseña</h1>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class FormCambiarContrasena extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
        //Cogemos los datos introducidos por el usuario
        const email = this.state.email;
        console.log(email);
        history.push("CodigoVerificacion");

        
        e.preventDefault();
    }

    render(){
        return(
            <div className="FormCambiarContrasena">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="email">Introduzca el email</label>
                        <input type="email" name="email" placeholder="Enter your email." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <h3>Cuando pulse el boton "Enviar" recibirá un correo electrónico con un código de validación
                            que deberá introducir en la siguiente pantalla
                        </h3>
                    </div>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        );
    }
}

class CambiarContrasena extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="CambiarContrasena">
                <Header history={history}/>
                <FormCambiarContrasena history={history}/>
            </div>
        );
    }
}

export default withRouter(CambiarContrasena);