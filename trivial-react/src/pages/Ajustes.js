import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Ajustes.css';
import {LeftOutlined} from '@ant-design/icons';
import {baseURL} from './images';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
            </div>
        );
    }
}

class FormAjustes extends React.Component{
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            username: cookies.get('user'),
            email: '',
            password: '',
            repPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.eliminarCuenta = this.eliminarCuenta.bind(this);

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
    
    handleSubmit(e) {

        const cookies = new Cookies();
        const history = this.props.history;
        const username = this.state.username;
        const email = cookies.get('email');
        const password = this.state.password;
        const repPassword = this.state.repPassword;

        if (password !== repPassword){ //Si no coinciden las contraseñas
            //Borrar datos de los inputs de las contraseñas
            this.resetCampos(['password','repPassword']);

            swal({
                text: "No coinciden las contraseñas.",
                icon: "warning",
                button: "Ok"
            });
        }else{
            axios.post(baseURL+"/AjustesUsuario", {nickname: username,password: password, email: email})         
                            .then(response => { //Está registrado
                                console.log(response.data);
                                
                                //Actualizar cookies
                                const cookies = new Cookies();
                                cookies.set('user', username, {path: '/'});
                                cookies.set('email', email, {path: '/'});

                                swal({
                                    text: "Datos modificados correctamente",
                                    icon: "success",
                                    button: "Ok"
                                });
                                
                                history.push('/PerfilUsuario', {usuario: username}); 
                                
                            })
                            .catch(error => {
                                console.log(error);
                                //Borrar nombre de usuario del input
                                this.resetCampos(['username']);
                                //Insertar usuario en la bd
                                if (error.response.status === 400){         //Si el usuario ya está siendo usado o es inválido
                                    swal({
                                        text: "Nombre de usuario no disponible.",
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
        e.preventDefault();
    }

    handleEliminar(){

        const cookies = new Cookies();
        const email = cookies.get('email');
        
        //Eliminar cuenta de BBDD
        axios.post(baseURL+"/EliminarCuenta", {email: email})         
                        .then(response => { //Está registrado

                            //Borrar cookies
                            cookies.remove('user');
                            cookies.remove('email');
                            cookies.remove('puntos');
                            cookies.remove('monedas');
                            this.props.history.push("/MenuInicio")
                            
                        })
                        .catch(error => {
                            console.log(error);
                                //Fallo de registro por otros motivos
                                swal({
                                    text: "Ha habido un fallo, vuelva a intentarlo.",
                                    icon: "warning",
                                    button: "Ok"
                                });
                                
                        });

    }

    eliminarCuenta(e) {

        swal({
            title: "¿Estás seguro?",
            text: "Tu cuenta será permanentemente borrada",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.handleEliminar();
                    swal("Tu cuenta ha sido eliminada correctamente", {
                    icon: "success",
                    })
                }
        });
    }

    render(){

        const cookies = new Cookies();

        return(
            <div className="FormAjustes">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">Nombre</label>
                        <input type="text" class="form-control" name="username" defaultValue={cookies.get('user')} placeholder="Enter your username." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="text" class="form-control" name="email" value={cookies.get('email')} readOnly/>
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" name="password" placeholder="Enter your password." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="repPassword">Repetir Contraseña</label>
                        <input type="password" class="form-control" name="repPassword" placeholder="Repeat your password." onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Guardar Cambios</button>
                    </div>
                </form>                

                <div>
                    <button type="submit" style={{marginTop: "15px"}} className="btn btn-danger" onClick={() => this.eliminarCuenta()}>Eliminar cuenta</button>
                </div>
            </div>
        );
    }
}

class Ajustes extends React.Component{
    render(){
        const cookies = new Cookies();
        const history = this.props.history;
        const usuario = cookies.get('user');
        return(
            <div className="Ajustes">
                <Header history={history}/>
                <FormAjustes history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(Ajustes);