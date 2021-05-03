import io from 'socket.io-client';
let socket;
export const iniciarSocket = (username, code, firstJoin, avatar, history) => {
    socket = io('localhost:5000', {
        transports: [ 'websocket' ],
        upgrade: false
    });
    socket.emit('join', {username: username, code: code, firstJoin: firstJoin, avatar: avatar}, (error) =>{
        if (error){
            alert(error);
            history.goBack();
        }
    });
    console.log("Se ha unido el usuario");
}

export const disconnectSocket = () => {
    socket.emit('disconnection');
    socket.off();
}

export const actualizarMensajes = (messages, jugadores, setParentsState) => {
    socket.on('message', (message) =>{
        console.log("Me ha llegado mensaje");
        console.log(message);
        //Actualizar mensajes
        var mensajesActuales = messages;
        mensajesActuales.push(message);
        setParentsState([{messages: mensajesActuales}]);
    });
    socket.on('newPlayer', (jugador) =>{
        var jugadoresActuales = jugadores;
        jugadoresActuales.push(jugador);
        setParentsState([{jugadores: jugadoresActuales}]);
    });
}

export const enviarMensaje = (message) => {
    socket.emit('sendMessage', message);
    console.log("He enviado mensaje");
    console.log(message);
}