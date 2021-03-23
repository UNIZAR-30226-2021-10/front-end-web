import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Ranking.css';
import {LeftOutlined, CaretRightOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const help = '/images/help.png';
        const ranking = 'images/ranking.png';
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <div className="tituloRanking">
                    <img className="imgRanking" src={ranking} alt="Ranking Image"></img>
                    <h1>Ranking</h1>
                </div>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

const USUARIOS =[
    {username: "usuario1", avatar: '/images/usuario.png', puntos: "512"},
    {username: "usuario2", avatar: '/images/usuario.png', puntos: "678"},
    {username: "usuario3", avatar: '/images/usuario.png', puntos: "324"},
    {username: "usuario4", avatar: '/images/usuario.png', puntos: "982"},
    {username: "usuario5", avatar: '/images/usuario.png', puntos: "429"},
    {username: "usuario7", avatar: '/images/usuario.png', puntos: "129"},
    {username: "usuario8", avatar: '/images/usuario.png', puntos: "65"},
    {username: "usuario9", avatar: '/images/usuario.png', puntos: "912"}
];

class MostrarRanking extends React.Component{
    BubbleSortDesc(values, length){
        var i, j, flag = 1;
        var temp;
        for (i = 1; (i <= length) && flag; i++){
            flag = 0;
            for (j = 0; j < (length - 1); j++){
                if (Number(values[j + 1].puntos) > Number(values[j].puntos)){
                    temp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = temp;
                    flag = 1;
                }
            }
        }
    }

    ranking(){
        const usuarioLogged = this.props.usuario;
        const usuariosDesc = USUARIOS;
        this.BubbleSortDesc(usuariosDesc,usuariosDesc.length);
        let ranking = [];
        let color='';
        let puesto='';
        var number=0;
        usuariosDesc.forEach((usuario) =>{
            number = number+1;
            if(number==1){
                color= "rgb(214, 204, 55)";
                puesto = "/images/first.png";
            } else if (number==2){
                color="rgb(143, 150, 143)";
                puesto = "/images/second.png";
            } else if (number==3){
                color="rgb(148, 88, 39)";
                puesto = "/images/third.png";
            } else{
                color="rgb(228, 195, 195)";
            }
            ranking.push(
                <li className="filaRanking">
                    { usuario.username == usuarioLogged ? (
                        <div className="usuarioClasif"> <CaretRightOutlined twoToneColor="#52c41a" style={{ fontSize: "5vh" }}/></div>
                    ):(
                        number==1 | number==2 | number==3 ? (
                            <div className="usuarioClasif">
                                <img className="imgPuesto" src={puesto} alt="Puesto Image"></img>
                            </div>
                        ):(<div className="usuarioClasif"> </div>) 
                    )}
                    <div className="fila" style={{ background: color}}>
                        <h1 className="posicion">#{number}</h1>
                        <img className="imgAvatar" src={usuario.avatar} alt={"Avatar de "+ usuario.username}></img>
                        <h1>{usuario.username}</h1>
                        <h1>{usuario.puntos} puntos</h1>
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