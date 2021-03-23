import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Chat.css';
import {LeftOutlined} from '@ant-design/icons';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={() => history.goBack()}/> 
                    Atrás
                </div>
                <h1>Chat de juego</h1>
            </div>
        )
    }
}

class Messages extends React.Component {
    comentario(minEnvioMens) {
        var d = new Date();
        const minActuales = d.getMinutes();
        const diferencia = Number(minActuales)-Number(minEnvioMens);
        if (diferencia==0){
            return "Enviado ahora.";
        } else if (diferencia>0){
            return "Enviado hace "+diferencia+" minutos.";
        } else{
            return "Enviado hace mucho.";
        }
    }

    render(){
        const colores = ["#e9a6a1", "#e9dea1", "#b2e9a1", "#a1e4e9"];
        const messages = this.props.messages;
        const usuario = this.props.usuario;
        const jugadores = this.props.jugadores;
        return (
            <div className="Messages">
                <ul>                 
                    {messages.map(message => {
                        const nombre = jugadores[message.sender].username;
                        const color = colores[message.sender];
                        return (
                            <div>
                                { message.sender!=usuario ? (
                                <li key={message.id} className="izquierda">
                                    <div className="sender" style={{ color: color}}>{nombre}</div>
                                    <div className="messageConFlecha">
                                        <img className="imgAvatar" src={message.avatar} alt={"Avatar de "+ nombre}></img>
                                        <div class="flecha-izquierda"></div>
                                        <div className="text" style={{ background: color}}>{message.text}</div>
                                    </div>
                                    <div className="date">{this.comentario(message.date)}</div>
                                </li>
                                ):(
                                <li key={message.id} className="derecha">
                                    <div className="sender" style={{ color: color}}>{nombre}</div>
                                    <div className="messageConFlecha">
                                        <img className="imgAvatar" src={message.avatar} alt={"Avatar de "+ nombre}></img>
                                        <div className="text" style={{ background: color}}>{message.text}</div>
                                        <div class="flecha-derecha"></div>
                                    </div>
                                    <div className="date">{this.comentario(message.date)}</div>
                                </li>
                                )}
                            </div>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

class FormMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e){
        const {name, value}=e.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(e){
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
        e.preventDefault();
    }

    render() {
        return (
            <div className="FormMessage">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="message" placeholder="Enter your message." value={this.state.message} onChange={this.handleChange}/>
                    <button type="submit">Send</button> 
                </form>
            </div>
      )
    }
}

const MESSAGES_DATA = [
    {sender: "0", avatar: '/images/usuario.png', text: "¡Hola!", date: "0"},
    {sender: "1", avatar: '/images/usuario.png', text: "¡Hola!,¿que tal?", date: "10"},
    {sender: "3", avatar: '/images/usuario.png', text: "Bien, ¿tu?", date: "20"},
    {sender: "2", avatar: '/images/usuario.png', text: "Bien. Mucha suerte!", date: "30"},
    {sender: "3", avatar: '/images/usuario.png', text: "¡Suerte a todos!", date: "40"},
    {sender: "1", avatar: '/images/usuario.png', text: "¿Como vais?", date: "50"}
]

class Chat extends React.Component {  
    constructor() {
        super()
        this.state = {
           messages: MESSAGES_DATA
        }
        this.sendMessage = this.sendMessage.bind(this);
    } 

    componentDidMount() {
    }

    sendMessage(message) {
        const usuario = this.props.location.state.usuario;
        const jugadores = this.props.location.state.jugadores;
        var d = new Date();
        const min = d.getMinutes();
        var mensajesActuales = this.state.messages;
        mensajesActuales.push({sender: usuario, avatar: jugadores[usuario].avatar, text: message, date: min });
        this.setState({messages: mensajesActuales});
    }

    render() {
        const history = this.props.history;
        const usuario = this.props.location.state.usuario;
        const jugadores = this.props.location.state.jugadores;
        const messages = this.state.messages;
        return (
            <div className="Chat">
                <Header history={history}/>
                <Messages messages={messages} usuario={usuario} jugadores={jugadores}/>
                <FormMessage sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

export default withRouter(Chat);
