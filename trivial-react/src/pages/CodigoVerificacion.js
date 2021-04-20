import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/CodigoVerificacion.css';
import {LeftOutlined} from '@ant-design/icons';
import {help} from './images';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/CambiarContrasena")}/> 
                    Atrás
                </div>
                <h1>Cambiar contraseña</h1>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class FormCodigoVerificacion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            inputCode: '',
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

        //Guardamos el codigo generado
        const generatedCode = this.props.generatedCode;
        
        //Cogemos los datos introducidos por el usuario
        const email = this.state.email;
        const inputCode = this.state.inputCode;
        const password = this.state.password;
        const repPassword = this.state.repPassword;
        
        if (password !== repPassword){  //Si no coinciden las contraseñas
            alert("No coinciden las contraseñas.");
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);
            e.preventDefault();
            return;

        } else if (generatedCode!=inputCode){  //Código de verificación incorrecto
            alert("Código de verificación incorrecto");
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['inputCode']);
            e.preventDefault();
            return;

        } else {
            
            history.push("/MenuInicio");
        }
        
    }

    render(){
        return(
            <div className="FormCodigoVerificacion">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="email">Introduzca el email</label>
                        <input type="text" name="email" placeholder="Enter your email." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="inputCode">Introduzca el codigo de verification</label>
                        <input type="text" name="inputCode" placeholder="Enter your verification code" onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Introduzca la nueva contraseña</label>
                        <input type="password" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir la nueva contraseña</label>
                        <input type="password" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <button type="submit">Confirmar</button>
                    </div>
                </form>
            </div>
        );
    }
}

class CodigoVerificacion extends React.Component{
    render(){
        const history = this.props.history;
        const generatedCode = this.props.location.state.code;
        console.log(generatedCode);
        return(
            <div className="CodigoVerificacion">
                <Header history={history}/>
                <FormCodigoVerificacion history={history} generatedCode={generatedCode}/>
            </div>
        );
    }
}

export default withRouter(CodigoVerificacion);