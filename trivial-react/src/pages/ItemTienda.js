import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ItemTienda.css';
import {LeftOutlined} from '@ant-design/icons';
import Item from '../components/Item';
import {help} from './images';
import Cookies from 'universal-cookie';
import axios from 'axios';

const baseUrl='http://localhost:3050';

class Header extends React.Component{
    render(){
        const history = this.props.history;
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

    restarMonedas(){
        const cookies = new Cookies();
        const email = cookies.get('email');
        const item = this.props.item;

        //Guarda los resultados en la tabla juega.
        axios.post(baseUrl+'/ObjetoTienda_RestarMonedas', 
            { precioObjeto: item.Precio, email: email})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log(e);     
        });
    }

    postObjetoNuevo(){
        const cookies = new Cookies();
        const email = cookies.get('email');
        const item = this.props.item;

        //Guarda los resultados en la tabla juega.
        axios.post(baseUrl+'/ObjetoTienda', 
            { nombreObjeto: item.Nombre, email: email})
        .then(response => { //Respuesta del servidor
            console.log(response.data.message);  
        }).catch(e => { //Error
            console.log(e);     
        });
    }

    handleCompra(e){
        const cookies = new Cookies();
        const history = this.props.history;
        const item = this.props.item;
        const monedas = this.props.monedas;
        //Compra del objeto
        if (monedas >= Number(item.precio)){  //Si tienes monedas suficientes
            //Actualizar las monedas en las cookies-> monedas = monedas-precio;
            monedas = monedas - Number(item.precio);
            cookies.set('monedas', monedas, {path: '/'});
            //Restar las monedas en la tabla usuarios de la db
            this.restarMonedas();
            //Insertar elemento comprado en la db
            this.postObjetoNuevo();
            alert("Comprado: "+ item.nombre);
            history.goBack();
        } else{ //Si no tienes monedas suficientes
            alert("Tienes "+ monedas +" monedas y el item "+ 
            item.Nombre+" cuesta "+item.Precio+" monedas.");
        }
        e.preventDefault();
    }

    render(){
        const item = this.props.item;
        const monedas = this.props.monedas;
        return(
            <div className="ComprarItem">
                <tbody className="infoMonedas">
                    <tr>
                        <th>Monedas:</th>
                        <td>{monedas}</td>
                    </tr>
                </tbody>
                <div className="mostrarItem">
                    <Item item={item}/>
                </div>
                <tbody className="infoPrecio">
                    <tr>
                        <th>Precio:</th>
                        <td>{item.Precio}</td>
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
    const monedas = this.props.location.state.monedas;
    return (
        <div className="ItemTienda">
            <Header history={history}/>
            <ComprarItem history={history} item={item} monedas={monedas}/>
        </div>
    )
  }  
};

export default withRouter(ItemTienda);