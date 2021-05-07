import React from 'react';
import '../css/Chat.css';
import {LeftOutlined} from '@ant-design/icons';
import Cookies from 'universal-cookie';

class Header extends React.Component{
    cerrarChat = () => {
        this.props.setParentsState([{clickChat: false}]);
    }

    render(){
        return(
            <div className="Header">
                <div className="iconAtras">
                    <LeftOutlined onClick={this.cerrarChat}/> 
                    Atrás
                </div>
                <h1>Chat de juego</h1>
            </div>
        )
    }
}

class Messages extends React.Component {
    comentario(minEnvioMens) {
        if (minEnvioMens==="admin"){
            return "";
        }else{
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
    }

    render(){
        const colores = ["#e9a6a1", "#e9dea1", "#b2e9a1", "#a1e4e9"];
        const messages = this.props.messages;
        const usuario = this.props.usuario;
        // const cookies = new Cookies();
        // const usuario = cookies.get('user');
        const jugadores = this.props.jugadores;
        return (
            <div className="Messages">
                <ul>                 
                    {messages.map(message => {
                        let nombre, color;
                        if (message.sender === "admin"){
                            nombre = "admin";
                            color = "#dcb4e9";
                        } else{
                            nombre = jugadores[message.sender].username;
                            color = colores[message.sender];
                        }
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
        this.props.sendMessage(this.state.message); // Envío del mensaje
        this.setState({message: ''}); //Borrar input
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

class Chat extends React.Component {  

    render() {
        const {usuario,jugadores,messages,sendMessage,setParentsState} = this.props;
        return (
            <div className="Chat">
                <Header setParentsState={setParentsState}/>
                <Messages messages={messages} usuario={usuario} jugadores={jugadores}/>
                <FormMessage sendMessage={sendMessage}/>
            </div>
        )
    }
}

export default Chat;