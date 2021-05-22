import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/PerfilUsuario.css';
import {LeftOutlined, SettingFilled} from '@ant-design/icons';
import Item from '../components/Item'
import Cookies from 'universal-cookie';
import axios from 'axios';
import {baseURL, imagesURL} from './images'


const style = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.usuario;
        const cookies = new Cookies();
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/DecisionJuego")}/> 
                    Atrás
                </div>
                <h1>Perfil de {cookies.get('user')}</h1>
                <div className="iconSettings">
                    <SettingFilled onClick={() => history.push("/Ajustes", {usuario: usuario})}/>
                </div>
            </div>
        );
    }
}

class DisableCache extends React.Component{
    render(){
      return (
        <head>
            <meta Http-Equiv="Cache-Control" Content="no-cache"></meta>
            <meta Http-Equiv="Pragma" Content="no-cache"></meta>
            <meta Http-Equiv="Expires" Content="0"></meta>
            <meta Http-Equiv="Pragma-directive: no-cache"></meta>
            <meta Http-Equiv="Cache-directive: no-cache"></meta>
        </head>
      )
    }
  }


class InfoPerfilUsuario extends React.Component{
    borrarCookies = () =>{
        const history = this.props.history;
        const cookies = new Cookies();
        cookies.remove('user');
        cookies.remove('email');
        cookies.remove('puntos');
        cookies.remove('monedas');
        history.push("/MenuInicio");
    }
    equipar = (thisItem) =>{
        const itemsComprados = this.props.itemsComprados;
        const history = this.props.history;
        if (thisItem.Tipo == 'color'){
            itemsComprados.forEach((item) => {
                if(item.Tipo == 'color'){
                    if (item.Nombre == thisItem.Nombre){
                        if (item.equipado == 1){
                            item.equipado=0;
                        } else {
                            item.equipado=1;
                        }
                    }
                    else{
                        item.equipado=0;
                    }
                }
            })
        }
        else if (thisItem.Tipo == 'cuerpo'){
            itemsComprados.forEach((item) => {
                if(item.Tipo == 'cuerpo'){
                    if (item.Nombre == thisItem.Nombre){
                        if (item.equipado == 1){
                            item.equipado=0;
                        } else {
                            item.equipado=1;
                        }
                    }
                    else{
                        item.equipado=0;
                    }
                }
            })
        
        }
        else if (thisItem.Tipo == 'cara'){
            itemsComprados.forEach((item) => {
                if(item.Tipo == 'cara'){
                    if (item.Nombre == thisItem.Nombre){
                        if (item.equipado == 1){
                            item.equipado=0;
                        } else {
                            item.equipado=1;
                        }
                    }
                    else{
                        item.equipado=0;
                    }
                }
            })
        
        }
        else if (thisItem.Tipo == 'cabeza'){
            itemsComprados.forEach((item) => {
                if(item.Tipo == 'cabeza'){
                    if (item.Nombre == thisItem.Nombre){
                        if (item.equipado == 1){
                            item.equipado=0;
                        } else {
                            item.equipado=1;
                        }
                    }
                    else{
                        item.equipado=0;
                    }
                }
            })
        
        }
    }
    actualizarBD = () =>{
        const history = this.props.history;
        const cookies = new Cookies();
        const itemsComprados = this.props.itemsComprados;
        const usuario = this.props.usuario;
        const equipados=[];
        const nombre=[];
        const imagenes=[];
        const email = cookies.get('email');
        let avatar;
        itemsComprados.forEach((item) => {
            equipados.push(item.equipado);
            nombre.push(item.iditem);
            if(item.equipado == 1){
                if (imagenes.length>4){
                    if (item.Tipo == 'color'){
                        imagenes.shift();
                        imagenes.unshift(item.Imagen);
                    }else{
                        imagenes.pop();
                        imagenes.push(item.Imagen)
                    }
                }else {
                    if (item.Tipo == 'color'){
                        imagenes.unshift(item.Imagen);
                    } else{
                    imagenes.push(item.Imagen);
                    }
                }
            }
        })
        console.log(imagenes);
        axios.post(baseURL+'/UpdateItemsUsuario', {equipados, nombre, email: email})
            .then(response=>{   
                if (response.status == 200) { 
                    console.log("datos guardados");
                }else{
                    console.log("error al guardar los datos");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        axios.post(baseURL+'/construirAvatar', {imagenes:imagenes})
            .then(response => {
                avatar = response.data;
                axios.post(imagesURL+'/UpdateAvatarUsuario', {nombre:email, imagen:avatar})
                .then(response =>{
                    console.log(response.data.imagenAv);
                    cookies.set('avatar', response.data.imagenAv, {path: '/'});
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        
    }
    render(){
        const cookies = new Cookies();
        const itemsComprados = this.props.itemsComprados;
        const history = this.props.history;
        const cols=[];
        itemsComprados.forEach((item) => {
            cols.push(  <div className = "itemsTienda">
                            <Item item={item}/> 
                            <button className="btnEquip" onClick={()=> this.equipar(item)}>Equipar</button>
                        </div>
                    );
        });

        return(
            <div className="InfoPerfilUsuario">
                <div className="imgAvatar">
                    {<img src={cookies.get('avatar')} alt="Avatar"></img>}
                    <button type="button" class="btn btn-danger" onClick={() => this.borrarCookies()}>Log out</button>
                    <button type="button" class="btn btn-primary" onClick={() => history.push("/Equipacion")}>Equiparse</button>
                </div>
                <tbody>
                    <tr>
                        <th>Nombre:</th>
                        <td>{cookies.get('user')}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>{cookies.get('email')}</td>
                    </tr>
                    <tr>
                        <th>Puntos Acumulados:</th>
                        <td>{cookies.get('puntos')}</td>
                    </tr>
                    <tr>
                        <th>Monedas Conseguidas:</th>
                        <td>{cookies.get('monedas')}</td>
                    </tr>
                </tbody>
            </div>
        );
    }
}

class PerfilUsuario extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            itemsComprados: []
        };
    }

    // Petición get a la db: busca los items que tiene el usuario.
    buscarItems(email){
        return new Promise((resolve, reject) => {
            axios.post(baseURL+'/PerfilUsuario', {email: email})
            .then(response=>{   //Encuentra los items
                if (response.status === 200) { 
                    resolve(response.data); 
                }else{
                    reject(response.status);
                }
            })
        });
    }

    componentDidMount(){
        const cookies = new Cookies();
        const email = cookies.get('email');
        this.buscarItems(email)
        .then((response) => {
            this.setState({itemsComprados: response});
        })
        .catch((err) => {
            console.log("Error al buscar los items: "+err)
        })
    }

    render(){
        const cookies = new Cookies();
        const history = this.props.history;
        const usuarioLoggedIn = cookies.get('user');
        const itemsComprados = this.state.itemsComprados;

        return(
            <div className="PerfilUsuario">
                <DisableCache/>
                <Header history={history} usuario={usuarioLoggedIn}/>
                <InfoPerfilUsuario 
                    history={history}
                    itemsComprados={itemsComprados}
                />
            </div>
        );
    }
}

export default withRouter(PerfilUsuario);