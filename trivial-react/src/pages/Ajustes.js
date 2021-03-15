import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Ajustes.css';
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const ajustes = '/images/ajustes.png';
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <div className="tituloAjustes">
                    <img className="imgAjustes" src={ajustes} alt="Settings Image"></img>
                    <h1>Ajustes</h1>
                </div>
            </div>
        );
    }
}

class FormAjustes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
        const history = this.props.history;
        const usuarioLogged = this.props.usuario;
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const repPassword = this.state.repPassword;
        //Cambiar datos introducidos de ese usuario en bd.
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
        } else if (true){  //Valores cambiados correctamente
            alert("Datos modificados correctamente.");
            history.push("/PerfilUsuario", {usuario: username});
        } else{     //Fallo, por nombre de usuario ya usado u otra cosa
            alert('Ha habido un fallo, vuelva a intentarlo.');
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className="FormAjustes">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Nombre</label>
                        <input type="text" name="username" placeholder="Enter your username." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="text" name="email" placeholder="Enter your email." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="text" name="password" placeholder="Enter your password." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir Contraseña</label>
                        <input type="text" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        );
    }
}

class Ajustes extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="Ajustes">
                <Header history={history}/>
                <FormAjustes history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(Ajustes);