import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/PerfilUsuario.css';
import {LeftOutlined, SettingFilled} from '@ant-design/icons';
import Item from '../components/Item'
import Cookies from 'universal-cookie';
import axios from 'axios';

const baseUrl='http://localhost:3050';

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
                        item.equipado=1;
                    }
                    else{
                        item.equipado=0;
                    }
                }
            })
            console.log(itemsComprados);
        }
        else if (thisItem.Tipo == 'cuerpo'){
            itemsComprados.forEach((item) => {
                if(item.Tipo == 'cuerpo'){
                    if (item.Nombre == thisItem.Nombre){
                        item.equipado=1;
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
                        item.equipado=1;
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
                        item.equipado=1;
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
        const equipados=[];
        const nombre=[];
        const email = cookies.get('email');
        itemsComprados.forEach((item) => {
            equipados.push(item.equipado);
            nombre.push(item.iditem);
        })
        axios.post(baseUrl+'/UpdateItemsUsuario', {equipados, nombre, email: email})
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
    }
    render(){
        const cookies = new Cookies();
        const history = this.props.history;
        const itemsComprados = this.props.itemsComprados;

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
                    <button className="btnLogOut" onClick={() => this.borrarCookies()}>Log out</button>
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
                    <tr>
                        <th>Items: </th>
                    </tr>
                </tbody>
                <div className="itemsComprados">{cols}</div>
                <div className="guardar"> <button className="btnGuardar" onClick={() => this.actualizarBD()} > Guardar </button> </div>
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
            axios.post(baseUrl+'/PerfilUsuario', {email: email})
            .then(response=>{   //Encuentra los items
                if (response.status == 200) { //response.ok
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
            this.setState({itemsComprados: response});
        })
        .catch((err) => {
            console.log("Error al buscar los items: "+err)
        })
    }

    render(){
        const history = this.props.history;
        const usuarioLoggedIn = this.props.location.state.usuario;
        const itemsComprados = this.state.itemsComprados;
        console.log(itemsComprados);

        return(
            <div className="PerfilUsuario">
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