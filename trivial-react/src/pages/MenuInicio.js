import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/MenuInicio.css';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const help = '/images/help.png';
        return(
            <div className="Header">
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
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
        const password = this.state.password;
        //Comprobar si el usuario esta en la bd y coincide la password
        if (false){  //No está registrado el usuario en la bd
            alert('No hay ningún usuario registrado con nombre: '+ username);
            //Borrar nombre de usuario del input
            this.resetCampos(['username']);
        } else if(false){   //No coincide el password con ese usuario
            alert('El usuario o la contraseña no son correctos');
            //Borrar todos los campos
            this.resetCampos(['username','password']);
        } else if(true){  //Está registrado
            alert("Bienvenido: "+ username);
            history.push('/DecisionJuego', {usuario: username});
        } else{     //Fallo de login por otros motivos
            alert('Ha habido un fallo, vuelva a intentarlo.');
        } 
        e.preventDefault();
    }

    render(){
        const logo = '/images/logo.png';
        return(
            <div className="FormInicio">
                <img className="imgLogo" src={logo} alt="Wondergames Logo"></img>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Usuario </label>
                        <input type="text" name="username" placeholder="Enter your username." onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" name="password" placeholder="Enter your password." onChange={this.handleChange} required/>
                    </div>
                    <button type="submit">Acceder</button>
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
                    <button className="btnContraseñaOlvidada" onClick={() => history.push("/CambiarContrasena")}>Contraseña Olvidada</button>
                {"  "}
                    <button className="btnRegistrarse" onClick={() => history.push("/Registrarse")}>Registrarse</button>
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