import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/CambiarContrasena.css';
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const help = '/images/help.png';
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
            password: '',
            repPassword: ''
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
        console.log(e);
        const history = this.props.history;
        //Cogemos los datos introducidos por el usuario
        const email = this.state.email;
        const password = this.state.password;
        const repPassword = this.state.repPassword;
        //Buscar usuario en la bd con correo "email" y cambiar contraseña
        if (password !== repPassword){ //Si no coinciden las contraseñas
            alert("No coinciden las contraseñas.");
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);
        } else if (false){ //No coincide el email con el de ningún usuario registrado
            alert("No existe ningún usuario con el email: "+ email);
            //Borrar todos los campos
            this.resetCampos(['email','password','repPassword']);
        } else if (true){  //Existe el usuario
            //Verificación mediante envío de email
            alert("Verifica el cambio de contraseña desde el email que te hemos enviado.");
            //Esperar a que acepte el cambio desde email (poner timeout)
            //Cambiar contraseña en la bd
            alert("Contraseña cambiada correctamente.");
            history.push('/MenuInicio');
        } else{     //Fallo de cambio de contraseña por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className="FormCambiarContrasena">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="email">Introduzca el email</label>
                        <input type="text" name="email" placeholder="Enter your email." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Introduzca la nueva contraseña</label>
                        <input type="text" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir la nueva contraseña</label>
                        <input type="text" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <button type="submit">Confirmar</button>
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