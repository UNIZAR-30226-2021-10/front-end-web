import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/CodigoVerificacion.css';
import {LeftOutlined} from '@ant-design/icons';
import {baseURL} from './images';
import axios from 'axios';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
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
                if(inputs[h].name === campos[i]){
                    inputs[h].value="";
                }
            }
        }
    }

    changePassword() {

        axios.post(baseURL+"/CambiarContrasenya", {password: this.state.password, email: this.props.email})         
                        .then(response => { //Está registrado
                            
                            swal({
                                text: "Tu contraseña se ha modificado correctamente",
                                icon: "success",
                                button: "Ok"
                            });


                            this.props.history.push("/MenuInicio");
                            
                        })
                        .catch(error => {
                            console.log(error);
                            
                            //Insertar usuario en la bd
                            if (error.response.status === 400){         //Usuario no registrado
                                swal({
                                    text: "No existe ningún usuario registrado con este email.",
                                    icon: "warning",
                                    button: "Ok"
                                });
                            } else{                                    //Fallo de registro por otros motivos
                                swal({
                                    text: "Ha habido un fallo, vuelva a intentarlo.",
                                    icon: "warning",
                                    button: "Ok"
                                });
                            }     
                        });
    }

    handleSubmit(e) {
        console.log(e);

        //Guardamos el codigo generado
        const generatedCode = this.props.generatedCode;
        
        //Cogemos los datos introducidos por el usuario
        const inputCode = this.state.inputCode;
        const password = this.state.password;
        const repPassword = this.state.repPassword;
        
        if (password !== repPassword){  //Si no coinciden las contraseñas
            swal({
                text: "No coinciden las contraseñas.",
                icon: "warning",
                button: "Ok"
            });
            
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);

        } else if (generatedCode != inputCode){  //Código de verificación incorrecto
            swal({
                text: "Código de verificación incorrecto",
                icon: "warning",
                button: "Ok"
            });

            //Borrar datos del imput del código
            this.resetCampos(['inputCode']);

        } else {    //Se realiza el cambio de contraseña
            this.changePassword();
        }

        e.preventDefault();
    }

    render(){
        return(
            <div className="FormCodigoVerificacion">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="email">Introduzca el email</label>
                        <input class="form-control" type="email" name="email" value={this.props.email} readOnly/>
                    </div>
                    <div>
                        <label for="inputCode">Introduzca el codigo de verification</label>
                        <input class="form-control" type="text" name="inputCode" placeholder="Enter your verification code" onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Introduzca la nueva contraseña</label>
                        <input class="form-control" type="password" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir la nueva contraseña</label>
                        <input class="form-control" type="password" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <button class="btn btn-primary" type="submit">Confirmar</button>
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
        const email = this.props.location.state.email;
        return(
            <div className="CodigoVerificacion">
                <Header history={history}/>
                <FormCodigoVerificacion history={history} generatedCode={generatedCode} email={email}/>
            </div>
        );
    }
}

export default withRouter(CodigoVerificacion);