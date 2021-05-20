import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Ranking.css';
import {LeftOutlined, CaretRightOutlined} from '@ant-design/icons';
import {help, ranking, first, second, third} from './images';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faQuestionCircle, faTrophy } from '@fortawesome/free-solid-svg-icons'

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
                <div className="tituloRanking">
                    <FontAwesomeIcon  className="imgRanking" icon={faTrophy}/>
                    <h1>Ranking</h1>
                </div>
                <FontAwesomeIcon  className="iconHelp" icon={faQuestionCircle} onClick={() => history.push("/AyudaJuego")}/>
            </div>
        );
    }
}

class MostrarRanking extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            usuariosDesc: []
        };
    }

    // Petición get a la db: busca la información de los usuarios registrados.
    buscarUsuarios(){
        return new Promise((resolve, reject) => {
            axios.post(baseUrl+'/Ranking')
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
        this.buscarUsuarios()
        .then((response) => {
            console.log(response);
            this.setState({usuariosDesc: response});
        })
        .catch((err) => {
            console.log("Error al buscar los usuarios: "+err)
        })
    }

    ranking(){
        const usuarioLogged = this.props.usuario;
        const usuariosDesc = this.state.usuariosDesc;
        let ranking = [];
        let color='';
        let puesto='';
        var number=0;
        usuariosDesc.forEach((usuario) =>{
            number = number+1;
            if(number === 1){
                color= "rgb(214, 204, 55)";
                puesto = first;
            } else if (number === 2){
                color="rgb(143, 150, 143)";
                puesto = second;
            } else if (number === 3){
                color="rgb(148, 88, 39)";
                puesto = third;
            } else{
                color="rgb(228, 195, 195)";
            }
            ranking.push(
                <li className="filaRanking">
                    { usuario.nickname === usuarioLogged ? (
                        <div className="usuarioClasif"> <CaretRightOutlined twoToneColor="#52c41a" style={{ fontSize: "5vh" }}/></div>
                    ):(
                        number === 1 | number === 2 | number === 3 ? (
                            <div className="usuarioClasif">
                                <img className="imgPuesto" src={puesto} alt="Puesto Icon"></img>
                            </div>
                        ):(<div className="usuarioClasif"> </div>) 
                    )}
                    <div className="fila" style={{ background: color}}>
                        <h1 className="posicion">#{number}</h1>
                        <img className="imgAvatar" src={usuario.imagen} alt={"Avatar de "+ usuario.nickname}></img>
                        <h1>{usuario.nickname}</h1>
                        <h1 className="pointsRnk">{usuario.puntos} puntos</h1>
                    </div>
                </li>
            );
        });
        return {ranking};
    }
    render(){
        const {ranking} = this.ranking();
        return(
            <div className="MostrarRanking">
                <ul className="ranking">
                    {ranking}
                </ul>
            </div>
        );
    }
}


class Ranking extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="Ranking">
                <Header history={history}/>
                <MostrarRanking history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(Ranking);