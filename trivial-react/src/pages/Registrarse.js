import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Registrarse.css';
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const help ='/images/help.png';
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

    handleSubmit(e) {
        const history = this.props.history;
        //Cogemos los datos introducidos por el usuario
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const repPassword = this.state.repPassword;
        const avatar = this.state.avatar;
        //Insertar usuario en la bd
        if (false){  //Si el usuario ya está siendo usado o es inválido
            alert("Nombre de usuario no disponible.");
            //Borrar nombre de usuario del input
            this.resetCampos(['username']);
        } else if (false){  //Si el email es inválido
            alert("Email inválido.");
            //Borrar email del input
            this.resetCampos(['email']);
        } else if (password !== repPassword){ //Si no coinciden las contraseñas
            alert("No coinciden las contraseñas.");
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);
        } else if (true){  //Inserción correcta
            alert("Usuario registrado correctamente: "+ username);
            history.push('/MenuInicio');
        } else{     //Fallo de registro por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        }
        e.preventDefault();
    }

    render(){
        const avatar='/images/avatar.png';
        return(
            <div className="FormRegistro">
                <div className="imgAvatar">
                    <img src={avatar} alt="Avatar"/>
                    <input type="file" name="avatar" onChange={this.handleChange} required/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Usuario </label>
                        <input type="text" name="username" placeholder="Enter your username." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="email">Email </label>
                        <input type="text" name="email" placeholder="Enter your email." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="text" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir Contraseña</label>
                        <input type="text" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange} required/>
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