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
    comentario(date) {
        if (date === "admin"){
            return "";
        } else{
            //Fecha y hora actual
            var d = new Date();
            const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            const anyoActual = d.getFullYear();
            const mesActual = meses[d.getMonth()];
            const diaActual = d.getDate();
            const horaActual = d.getHours();
            const minActual = d.getMinutes();
            const segActual = d.getSeconds();

            //Fecha y hora del mensaje
            let fecha = date;
            const anyoMens = fecha.split('--')[0];  //Año
            const mesMens = fecha.split('--')[1];   //Mes
            fecha = fecha.split('--')[2];
            const diaMens = fecha.split('(')[0];    //Día
            fecha = fecha.split('(')[1];
            fecha = fecha.split(')')[0];
            const horaMens = fecha.split(':')[0];  //Horas
            const minMens = fecha.split(':')[1];    //Minutos
            const segMens = fecha.split(':')[1];    //Minutos

            console.log("FECHAS ACTUALES: ");
            console.log(horaActual + "-" + minActual + "-" + segActual);

            console.log("FECHAS MENSAJE: ");
            console.log(horaMens + "-" + minMens + "-" + segMens);

            let dif;
            if (anyoActual > anyoMens){
                dif = Number(anyoActual)-Number(anyoMens);
                return "Enviado hace "+ dif + " años.";
            } else if (mesActual > mesMens){
                dif = Number(mesActual)-Number(mesMens);
                return "Enviado hace "+ dif + " meses.";
            } else if (diaActual > diaMens){
                dif = Number(diaActual)-Number(diaMens);
                return "Enviado hace "+ dif + " días.";
            } else if (horaActual > horaMens){
                dif = Number(horaActual)-Number(horaMens);
                return "Enviado hace "+ dif + " horas.";
            } else if (minActual > minMens){
                dif = Number(minActual)-Number(minMens);
                return "Enviado hace "+ dif + " minutos.";
            } else if (segActual > segMens){
                dif = Number(segActual)-Number(segMens);
                return "Enviado hace "+ dif + " segundos.";
            } else{
                return "Enviado ahora.";
            }
        }
    }

    bajarScroll(){
        var scroll = document.getElementsByClassName("Messages");
        scroll = scroll[0];
        if (scroll){
            scroll.scrollTop = scroll.scrollHeight;
        }
    }

    componentDidUpdate(){
        this.bajarScroll();
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
                        let nombre, color;
                        if (message.sender === "admin"){
                            nombre = "admin";
                            color = "#dcb4e9";
                        } else{
                            
                            nombre=message.sender;

                            //Buscar index en el array del que envia
                            const index = jugadores.findIndex(jugador =>  jugador.username===nombre);
                            color = colores[index];
                        }
                        return (
                            <div>
                                { message.sender !== jugadores[usuario].username ? (
                                <li key={message.id} className="izquierda">
                                    <div className="sender" style={{ color: color}}>{nombre}</div>
                                    <div className="messageConFlecha">
                                        <img className="imgAvatar" src={message.avatar} alt={"Avatar de "+ nombre}></img>
                                        <div class="flecha-izquierda"></div>
                                        <div className="text" style={{ background: color}}>{message.text}</div>
                                        <div className="date">{this.comentario(message.date)}</div>
                                    </div>
                                </li>
                                ):(
                                <li key={message.id} className="derecha">
                                    <div className="sender" style={{ color: color}}>{nombre}</div>
                                    <div className="messageConFlecha">
                                        <img className="imgAvatar" src={message.avatar} alt={"Avatar de "+ nombre}></img>
                                        <div className="text" style={{ background: color}}>{message.text}</div>
                                        <div class="flecha-derecha"></div>
                                        <div className="date">{this.comentario(message.date)}</div>
                                    </div>
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