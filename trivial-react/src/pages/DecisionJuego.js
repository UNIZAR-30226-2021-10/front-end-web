import React from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/DecisionJuego.css';
import {help, historialIcon, logo, compras, trofeo, imgUsuario} from './images';
import "bootstrap/dist/css/bootstrap.min.css"

class Header extends React.Component{
    render(){
        const history = this.props.history;
        const username = this.props.usuario;
        return(
            <div className="Header">
                <img className="iconHistorial" src={historialIcon} alt="Historial Icon" onClick={() => history.push("/Historial", {usuario: username})}></img>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class Decision extends React.Component{
    render(){
        const history = this.props.history;
        const username = this.props.usuario;
        return(
            <div className="Decision">
                <img className="imgLogo" src={logo} alt="Wondergames Logo"></img>
                <h1>¿Cómo quieres jugar?</h1>
                <div className="respuestaBotones btn-group justify-content-lg-center">
                    <h1>
                        <button className="btn btn-primary " onClick={() => history.push("/ModoMultijugador", {usuario: username})}>Modo Multijugador</button>
                        <button className="btn btn-secondary" onClick={() => history.push("/ModoIndividual", {usuario: username})}>Modo Individual</button>
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
        return(
            <div className="Footer">
                <img className="iconCompras" src={compras} alt="Shop Icon" onClick={() => history.push("/Tienda", {usuario: username})}></img>
                <img className="iconRanking" src={trofeo} alt="Ranking Icon" onClick={() => history.push("/Ranking", {usuario: username})}></img>
                <img className="iconUsuario" src={imgUsuario} alt="User Icon" onClick={() => history.push("/PerfilUsuario", {usuario: username})}></img>
            </div>
        );
    }
}

class DecisionJuego extends React.Component{
    render(){
        const history = this.props.history;
        const cookies = new Cookies();
        const usuario = cookies.get('user');
        return(
            <div className="DecisionJuego">
                <Header history={history} usuario={usuario}/>
                <Decision history={history} usuario={usuario}/>
                <Footer history={history} usuario={usuario}/>
            </div>
        );
    }
}

export default withRouter(DecisionJuego);