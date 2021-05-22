import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/ItemTienda.css';
import {LeftOutlined} from '@ant-design/icons';
import Item from '../components/Item';
import {baseURL} from './images';
import Cookies from 'universal-cookie';
import axios from 'axios';
import swal from 'sweetalert';


/*const style = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};*/


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
        axios.post(baseURL+'/ObjetoTienda_RestarMonedas', 
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
        axios.post(baseURL+'/ObjetoTienda', 
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
        let monedas = this.props.monedas;
        //Compra del objeto
        if (monedas >= item.Precio){  //Si tienes monedas suficientes
            //Actualizar las monedas en las cookies-> monedas = monedas-precio;
            monedas = monedas - item.Precio;
            cookies.set('monedas', monedas, {path: '/'});
            //Restar las monedas en la tabla usuarios de la db
            this.restarMonedas();
            //Insertar elemento comprado en la db
            this.postObjetoNuevo();
            swal({
                text:"Comprado: "+ item.Nombre, 
                icon: "success",
                buttons: true
            })
            .then((ok) => {
                if(ok){
                    console.log ('item comprado');
                    history.push("/Tienda");
                }
            })
            
        } else{ //Si no tienes monedas suficientes
            swal({text:"No tienes suficientes monedas para comprar este item", icon: "warning"});
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
                    <button className="btn btn-primary" onClick={this.handleCompra}>Comprar</button>
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