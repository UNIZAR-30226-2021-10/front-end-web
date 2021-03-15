import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ItemTienda.css';
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
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class ComprarItem extends React.Component{
    constructor(props) {
        super(props);
        this.handleCompra = this.handleCompra.bind(this);
    }

    handleCompra(e){
        const history = this.props.history;
        const item = this.props.item;
        const partidas = this.props.partidas;
        //Compra del objeto
        if (partidas.monedas >= item.precio){  //Si tienes monedas suficientes
            //Insertar elemento comprado en tabla de compras
            //Actualizar las monedas -> monedas = monedas-precio;
            alert("Comprado: "+ item.nombre);
            history.goBack();
        } else{ //Si no tienes monedas suficientes
            alert("Tienes "+ partidas.monedas +" monedas y el item "+ 
            item.nombre+" cuesta "+item.precio+" monedas.");
        }
        e.preventDefault();
    }

    render(){
        const item = this.props.item;
        const partidas = this.props.partidas;
        return(
            <div className="ComprarItem">
                <tbody className="infoMonedas">
                    <tr>
                        <th>Monedas:</th>
                        <td>{partidas.monedas}</td>
                    </tr>
                </tbody>
                <div className="mostrarItem">
                    <Item item={item}/>
                </div>
                <tbody className="infoPrecio">
                    <tr>
                        <th>Precio:</th>
                        <td>{item.precio}</td>
                    </tr>
                </tbody>
                <div>
                    <button onClick={this.handleCompra}>Comprar</button>
                </div>
            </div>
        )
    }
};

class ItemTienda extends React.Component {
  render() {
    const history = this.props.history;
    const item = this.props.location.state.item;
    const partidas = this.props.location.state.partidas;
    return (
        <div className="ItemTienda">
            <Header history={history}/>
            <ComprarItem history={history} item={item} partidas={partidas}/>
        </div>
    )
  }  
};

export default withRouter(ItemTienda);