import io from 'socket.io-client';
let socket;

//Iniciar socket del cliente
export const iniciarSocket = (username, code, firstJoin, history) => {
    socket = io('localhost:5000', {
        transports: [ 'websocket' ],
        upgrade: false
    });
    socket.emit('join', {username: username, code: code, firstJoin: firstJoin}, (error) =>{
        if (error){
            alert(error);
            history.goBack();
        }
    });
    console.log("Se ha unido el usuario");
}

//Desconectar socket
export const disconnectSocket = () => {
    socket.emit('disconnection');
    socket.off();
}

//Metodo para recibir eventos (mensajes, union al chat, cambio de turno)
export const actualizarMensajes = (messages, jugadores, setParentsState) => {

    //Nuevo mensaje en el chat
    socket.on('message', (message) =>{
        console.log("Me ha llegado mensaje");
        console.log(message);
        //Actualizar mensajes
        var mensajesActuales = messages;
        mensajesActuales.push(message);
        setParentsState([{messages: mensajesActuales}]);
    });

    //Nuevo jugador se une a la partida
    socket.on('newPlayer', (jugador) =>{
        var jugadoresActuales = jugadores;
        jugadoresActuales.push(jugador);
        setParentsState([{jugadores: jugadoresActuales}]);
    });

}

export const actualizarEventos = (setParentsState, endGame, history, usuario) => {

    //Otro jugador ha pasado el turno
    socket.on('recibirTurno', (nuevoTurno, nuevaRonda) =>{

        setParentsState([{turno:nuevoTurno, ronda:nuevaRonda}]);
        console.log("Turno del jugador " + nuevoTurno);
    });

    socket.on('finalizarPartida', (jugadoresDesc) =>{

        endGame(jugadoresDesc, history, usuario);
        console.log("Fin de la partida");
    });

}


//Cliente evia mensaje al chat
export const enviarMensaje = (message) => {
    socket.emit('sendMessage', message);
    console.log("He enviado mensaje");
    console.log(message);
}

//Metodo para pasar el turno
export const pasarTurno = (nuevoTurno, nuevaRonda) => {
    socket.emit('pasarTurno', nuevoTurno, nuevaRonda);
    console.log("He pasado el turno");
}

export const sendFinPartida = (jugadoresDesc) => {
    socket.emit('sendFinPartida', jugadoresDesc);
    console.log("Partida finalizada");
}