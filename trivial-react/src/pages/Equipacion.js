import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Equipacion.css';
import {LeftOutlined, SettingFilled} from '@ant-design/icons';
import Item from '../components/Item'
import Cookies from 'universal-cookie';
import axios from 'axios';
import {baseURL, imagesURL} from './images'
import { ClearCacheProvider, useClearCacheCtx } from 'react-clear-cache';
  

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.usuario;
        const cookies = new Cookies();
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/PerfilUsuario")}/> 
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
    constructor(props){
        super(props)
        this.state = {
           itemsC: []
          }
    }
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
        if (thisItem.Tipo === 'color'){
            itemsComprados.forEach((item) => {
                if(item.Tipo === 'color'){
                    if (item.Nombre === thisItem.Nombre){
                        if (item.equipado === 1){
                            item.equipado=1;
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
        else if (thisItem.Tipo === 'cuerpo'){
            itemsComprados.forEach((item) => {
                if(item.Tipo === 'cuerpo'){
                    if (item.Nombre === thisItem.Nombre){
                        if (item.equipado === 1){
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
        else if (thisItem.Tipo === 'cara'){
            itemsComprados.forEach((item) => {
                if(item.Tipo === 'cara'){
                    if (item.Nombre === thisItem.Nombre){
                        if (item.equipado === 1){
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
        else if (thisItem.Tipo === 'cabeza'){
            itemsComprados.forEach((item) => {
                if(item.Tipo === 'cabeza'){
                    if (item.Nombre === thisItem.Nombre){
                        if (item.equipado === 1){
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
        this.setState({itemsC: itemsComprados})
    }
    actualizarBD = () =>{
        const cookies = new Cookies();
        const itemsComprados = this.props.itemsComprados;
        const equipados=[];
        const nombre=[];
        const imagenes=[];
        const email = cookies.get('email');
        let avatar;
        itemsComprados.forEach((item) => {
            equipados.push(item.equipado);
            nombre.push(item.iditem);
            console.log(item.Tipo)
            if(item.equipado === 1){
                
                if (item.Tipo === 'color'){
                        imagenes[0] = item.Imagen;
                }else if (item.Tipo === 'cara'){
                        imagenes[1] = item.Imagen;
                    
                }else if(item.Tipo === 'cuerpo') {
                    imagenes[2] = item.Imagen;
                    
                }else{
                    imagenes[3] = item.Imagen;

                }
            }
        })
    
        console.log(imagenes);
        
        axios.post(baseURL+'/UpdateItemsUsuario', {equipados, nombre, email: email})
            .then(response=>{   
                if (response.status === 200) { 
                    console.log("datos guardados");
                }else{
                    console.log("error al guardar los datos");
                }
            })
            .catch(err=>{
                console.log(err);
            })




            const refreshCacheAndReload = () => {
                if (caches) {
                  // Service worker cache should be cleared with caches.delete()
                  caches.keys().then((names) => {
                    for (const name of names) {
                      caches.delete(name);
                    }
                  });
                }
                // delete browser cache and hard reload
                window.location.reload(true);
              };
              
        axios.post(baseURL+'/construirAvatar', {imagenes:imagenes})
            .then(response => {
                avatar = response.data;
                console.log(response.data);
                axios.post(imagesURL+'/UpdateAvatarUsuario', {nombre:email, imagen:avatar})
                .then(response =>{
                    cookies.set('avatar', response.data.imagenAv, {path: '/'});
                    //const { emptyCacheStorage } = useClearCacheCtx();
                    //emptyCacheStorage(); //carlos tonto que no fonfona
                    refreshCacheAndReload();
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

        const cols=[];
        itemsComprados.forEach((item) => {
            
                cols.push(  
                            <div className = "itemsTienda" onClick={()=> this.equipar(item)}>
                                <Item item={item} equipado={item.equipado} /> 
                            </div>
                );
            
        });

        return(
            <div className="InfoPerfilUsuario">
                <div className="imgAvatarEquip">
                    {<img src={cookies.get('avatar')} alt="Avatar"></img>}
                    <button type="button" class="btn btn-success" onClick={() => this.actualizarBD()}>Guardar</button>
                </div>
                
                <div className="itemsComprados">
                    {cols}
                </div>
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
                if (response.status === 200) { //response.ok
                    resolve(response.data); //response.json()
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
            response.forEach( item =>{
                var r = item.Imagen.replace('http://localhost:3060', imagesURL)
                item.Imagen = r;
            })
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