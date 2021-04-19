import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Tienda.css';
import {ConsoleSqlOutlined, LeftOutlined} from '@ant-design/icons';
import Item from '../components/Item';
import {help} from './images';

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
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class InfoTienda extends React.Component{
    render(){
        const history = this.props.history;
        const monedas=this.props.monedas;
        const itemsComprados=this.props.itemsComprados;
        const setItems=this.props.setItems;
        const comprarItem = this.props.comprarItem;

        const cols=[];
        let lastCategory = null;
        setItems.forEach((itemCatalogo) => {
            if (itemsComprados.indexOf(itemCatalogo.nombre) === -1){
                if (itemCatalogo.category !== lastCategory) {
                    cols.push(
                        <div className="itemCategory">
                            <h1>{itemCatalogo.category}</h1>
                        </div>
                    );
                }
                cols.push(
                    <div className="item" onClick={() => history.push("/ItemTienda", {item: itemCatalogo, monedas: monedas})}>
                        <Item item={itemCatalogo}/> 
                    </div>
                );
                lastCategory = itemCatalogo.category;
            }
        });

        return(
            <div className="InfoTienda">
                <tbody className="infoMonedas">
                    <tr>
                        <th>Monedas:</th>
                        <td>{monedas}</td>
                    </tr>
                </tbody>
                <div className="itemsNoComprados">{cols}</div>
            </div>
        );
    }
}

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

class Tienda extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.estadoInicial();
        this.comprarItem = this.comprarItem.bind(this);
    }

    // Petición get a la db: busca los items de la tienda.
    buscarItems(){
        return new Promise((resolve, reject) => {
            fetch(baseUrl+'/PantallaTienda')
            .then(response=>{   //Encuentra los items
                if (response.ok) {
                    resolve(response.json());
                }else{
                    reject(response.status);
                }
            })
        });
    }

    estadoInicial(){
        const usuarioLoggedIn = this.props.location.state.usuario;
        const tablaPartidas = partidas.filter((partida,index) => partida.usuario===usuarioLoggedIn);
        this.buscarItems()
        .then((response) => {
            const setItems = response;
        })
        .catch((err ) => {
            console.log("Error al buscar los items: "+err)
        })

        const tablaCompras = compras.filter((compra,index) => compra.usuario===usuarioLoggedIn);
        const arrayComprados = [];
        tablaCompras.forEach((compra,index) =>{
            arrayComprados.push(compra.item);
        });

        return { monedas: tablaPartidas[0].monedas, itemsComprados: arrayComprados}
    }

    comprarItem(item){
        const monedas = this.state.monedas;
        const itemsComprados = this.state.itemsComprados;
        //Compra del objeto
        if (Number(monedas) >= Number(item.precio)){  //Si tienes monedas suficientes
            //Insertar elemento comprado en tabla de compras
            itemsComprados.push(item.nombre);
            //Actualizar las monedas -> monedas = monedas-precio;
            monedas = Number(monedas) - Number(item.precio);
            //Actualizar estado
            this.setState({monedas: monedas, itemsComprados: itemsComprados});
            alert("Comprado: "+ item.nombre);
            //history.goBack();
        } else{ //Si no tienes monedas suficientes
            alert("Tienes "+ monedas +" monedas y el item "+ 
            item.nombre+" cuesta "+item.precio+" monedas.");
        }
    }

    render(){
        const history = this.props.history;
        const usuarioLoggedIn = this.props.location.state.usuario;
        const monedas = this.state.monedas;
        const itemsComprados = this.state.itemsComprados;

        return(
            <div className="Tienda">
                <Header history={history} usuario={usuarioLoggedIn}/>
                <InfoTienda 
                    history={history}
                    monedas={monedas}
                    itemsComprados={itemsComprados}
                    setItems={setItems}
                    comprarItem = {this.comprarItem}
                />
            </div>
        );
    }
}

export default withRouter(Tienda);