import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/PerfilUsuario.css';
import {LeftOutlined, SettingFilled} from '@ant-design/icons';
import Item from '../components/Item'

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.usuario;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/DecisionJuego", {usuario: usuario})}/> 
                    Atrás
                </div>
                <h1>Perfil de {usuario}</h1>
                <div className="iconSettings">
                    <SettingFilled onClick={() => history.push("/Ajustes", {usuario: usuario})}/>
                </div>
            </div>
        );
    }
}

class InfoPerfilUsuario extends React.Component{
    render(){
        const history = this.props.history;
        const usuarios=this.props.usuarios[0];
        const partidas=this.props.partidas[0];
        const compras=this.props.compras;
        const setItems=this.props.setItems;
        
        const arrayComprados = [];
        compras.forEach((compra,index) =>{
            arrayComprados.push(compra.item);
        });

        const cols=[];
        setItems.forEach((itemCatalogo) => {
            if (arrayComprados.indexOf(itemCatalogo.nombre) > -1){
                cols.push(<Item item={itemCatalogo}/>);
            }
        });

        return(
            <div className="InfoPerfilUsuario">
                <div className="imgAvatar">
                    <img src={usuarios.avatar} alt="Avatar"></img>
                </div>
                <tbody>
                    <tr>
                        <th>Nombre:</th>
                        <td>{usuarios.usuario}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>{usuarios.email}</td>
                    </tr>
                    <tr>
                        <th>Puntos Acumulados:</th>
                        <td>{partidas.puntos}</td>
                    </tr>
                    <tr>
                        <th>Monedas Conseguidas:</th>
                        <td>{partidas.monedas}</td>
                    </tr>
                    <tr>
                        <th>Items: </th>
                    </tr>
                </tbody>
                <div className="itemsComprados">{cols}</div>
            </div>
        );
    }
}

class PerfilUsuario extends React.Component{
    render(){
        const usuarios = [
            {usuario: "usuario1", email: "usuario1@gmail.com", avatar:'/images/avatar.png'},
            {usuario: "usuario2", email: "usuario2@gmail.com", avatar:'/images/avatar.png'}
        ];
        const partidas = [
            {usuario: "usuario1", puntos: "1324", monedas: "563"},
            {usuario: "usuario2", puntos: "324", monedas: "100"}
        ];
        const compras = [
            {usuario: "usuario1", item: "traje1"},
            {usuario: "usuario1", item: "sombrero1"},
            {usuario: "usuario2", item: "traje2"},
            {usuario: "usuario2", item: "sombrero2"}
        ];
        const setItems = [
            {nombre:"traje1", category: "trajes", icono: '/images/items/traje1.png'},
            {nombre:"traje2", category: "trajes", icono: '/images/items/traje2.png'},
            {nombre:"traje3", category: "trajes", icono: '/images/items/traje3.png'},
            {nombre:"sombrero1", category: "sombreros", icono: '/images/items/sombrero1.png'},
            {nombre:"sombrero2", category: "sombreros", icono: '/images/items/sombrero2.png'},
            {nombre:"sombrero3", category: "sombreros", icono: '/images/items/sombrero3.png'}
        ];

        const history = this.props.history;
        const usuarioLoggedIn = this.props.location.state.usuario;
        const tablaUsuarios = usuarios.filter((usuario,index) => usuario.usuario===usuarioLoggedIn);
        const tablaPartidas = partidas.filter((partida,index) => partida.usuario===usuarioLoggedIn);
        const tablaCompras = compras.filter((compra,index) => compra.usuario===usuarioLoggedIn);

        return(
            <div className="PerfilUsuario">
                <Header history={history} usuario={usuarioLoggedIn}/>
                <InfoPerfilUsuario 
                    history={history}
                    usuarios={tablaUsuarios}
                    partidas={tablaPartidas}
                    compras={tablaCompras}
                    setItems={setItems}
                />
            </div>
        );
    }
}

export default withRouter(PerfilUsuario);