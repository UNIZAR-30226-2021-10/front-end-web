import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Tienda.css';
import {LeftOutlined} from '@ant-design/icons';
import Item from '../components/Item';
import {help, tienda} from './images';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const baseUrl='http://localhost:3050';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.push("/DecisionJuego")}/> 
                    Atrás
                </div>
                <div className="tituloTienda">
                    <img className="imgTienda" src={tienda} alt="Tienda Icon"></img>
                    <h1>Tienda</h1>
                </div>
                    <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
            </div>
        );
    }
}

class InfoTienda extends React.Component{
    render(){
        const history = this.props.history;
        const monedas=this.props.monedas;
        const itemsNoComprados=this.props.itemsNoComprados;

        //Ordenar por categoría
        //itemsNoComprados.sort();
        //Construir array a mostrar
        const cols=[];
        let lastCategory = null;
        itemsNoComprados.forEach((itemCatalogo) => {
            if (itemCatalogo.Tipo !== lastCategory) {
                cols.push(
                    <div className="itemCategory">
                        <h1>{itemCatalogo.Tipo}</h1>
                    </div>
                );
            }
            cols.push(
                <div className="item" onClick={() => history.push("/ItemTienda", {item: itemCatalogo, monedas: monedas})}>
                    <Item item={itemCatalogo}/> 
                </div>
            );
            lastCategory = itemCatalogo.Tipo;
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

class Tienda extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            itemsNoComprados: []
        };
    }

    // Petición get a la db: busca los items de la tienda.
    buscarItems(email){
        return new Promise((resolve, reject) => {
            axios.post(baseUrl+'/PantallaTienda', {email: email})
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
            this.setState({itemsNoComprados: response});
        })
        .catch((err) => {
            console.log("Error al buscar los items: "+err)
        })
    }

    render(){
        const history = this.props.history;
        const cookies = new Cookies();
        const monedas = Number(cookies.get('monedas'));
        const itemsNoComprados = this.state.itemsNoComprados;
        console.log(itemsNoComprados);

        return(
            <div className="Tienda">
                <Header history={history}/>
                <InfoTienda 
                    history={history}
                    monedas={monedas}
                    itemsNoComprados={itemsNoComprados}
                />
            </div>
        );
    }
}

export default withRouter(Tienda);