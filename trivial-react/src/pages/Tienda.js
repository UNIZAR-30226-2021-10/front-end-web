import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Tienda.css';
import {LeftOutlined} from '@ant-design/icons';
import Item from '../components/Item';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.usuario;
        const help = '/images/help.png';
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/DecisionJuego", {usuario: usuario})}/> 
                    Atrás
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class InfoTienda extends React.Component{
    render(){
        const history = this.props.history;
        const partidas=this.props.partidas[0];
        const compras=this.props.compras;
        const setItems=this.props.setItems;

        const arrayComprados = [];
        compras.forEach((compra,index) =>{
            arrayComprados.push(compra.item);
        });

        const cols=[];
        setItems.forEach((itemCatalogo) => {
            if (arrayComprados.indexOf(itemCatalogo.nombre) === -1){
                cols.push(
                    <div onClick={() => history.push("/ItemTienda", {item: itemCatalogo, partidas: partidas})}>
                        <Item item={itemCatalogo} partidas={partidas}/> 
                    </div>
                );
            }
        });

        return(
            <div className="InfoTienda">
                <tbody className="infoMonedas">
                    <tr>
                        <th>Monedas:</th>
                        <td>{partidas.monedas}</td>
                    </tr>
                </tbody>
                <div className="itemsNoComprados">{cols}</div>
            </div>
        );
    }
}

class Tienda extends React.Component{
    render(){
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
            {nombre:"traje1", category: "trajes", icono: '/images/items/traje1.png', precio: '93'},
            {nombre:"traje2", category: "trajes", icono: '/images/items/traje2.png', precio: '60'},
            {nombre:"traje3", category: "trajes", icono: '/images/items/traje3.png', precio: '570'},
            {nombre:"sombrero1", category: "sombreros", icono: '/images/items/sombrero1.png', precio: '30'},
            {nombre:"sombrero2", category: "sombreros", icono: '/images/items/sombrero2.png', precio: '563'},
            {nombre:"sombrero3", category: "sombreros", icono: '/images/items/sombrero3.png', precio: '452'}
        ];

        const history = this.props.history;
        const usuarioLoggedIn = this.props.location.state.usuario;
        const tablaPartidas = partidas.filter((partida,index) => partida.usuario===usuarioLoggedIn);
        const tablaCompras = compras.filter((compra,index) => compra.usuario===usuarioLoggedIn);

        return(
            <div className="Tienda">
                <Header history={history} usuario={usuarioLoggedIn}/>
                <InfoTienda 
                    history={history}
                    partidas={tablaPartidas}
                    compras={tablaCompras}
                    setItems={setItems}
                />
            </div>
        );
    }
}

export default withRouter(Tienda);