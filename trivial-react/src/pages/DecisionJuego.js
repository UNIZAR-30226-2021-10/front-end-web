import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/DecisionJuego.css'
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
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

class Decision extends React.Component{
    render(){
        const history = this.props.history;
        const username = this.props.usuario;
        const logo = '/images/logo.png';
        return(
            <div className="Decision">
                <img className="imgLogo" src={logo} alt="Wondergames Logo"></img>
                <h1>¿Cómo quieres jugar?</h1>
                <div className="respuestaBotones">
                    <h1>
                        <button className="btnModoMultijugador" onClick={() => history.push("/ModoMultijugador", {usuario: username})}>Modo Multijugador</button>
                        o
                        <button className="btnModoIndividual" onClick={() => history.push("/ModoIndividual", {usuario: username})}>Modo Individual</button>
                    </h1>
                </div>
            </div>
        );
    }
}

class Footer extends React.Component{
    render(){
        const history = this.props.history;
        const username = this.props.usuario;
        const compras = '/images/compras.png';
        const ranking = '/images/trofeo.png';
        const usuario = '/images/usuario.png';
        return(
            <div className="Footer">
                <img className="iconCompras" src={compras} alt="Shop Icon" onClick={() => history.push("/Tienda", {usuario: username})}></img>
                <img className="iconRanking" src={ranking} alt="Ranking Icon" onClick={() => history.push("/Ranking", {usuario: username})}></img>
                <img className="iconUsuario" src={usuario} alt="User Icon" onClick={() => history.push("/PerfilUsuario", {usuario: username})}></img>
            </div>
        );
    }
}

class DecisionJuego extends React.Component{
    render(){
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        return(
            <div className="DecisionJuego">
                <Header history={history} />
                <Decision history={history} usuario={usuario}/>
                <Footer history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(DecisionJuego);