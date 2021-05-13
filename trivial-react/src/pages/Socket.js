import io from 'socket.io-client';
let socket;

//Iniciar socket del cliente
export const iniciarSocket = (username, code, firstJoin, history, avatar) => {
    socket = io('localhost:5000', {
        transports: [ 'websocket' ],
        upgrade: false
    });
    socket.emit('join', {username: username, code: code, avatar:avatar, firstJoin: firstJoin}, (error) =>{
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
        
        console.log(jugador)
        jugadoresActuales.push(jugador);
        setParentsState([{jugadores: jugadoresActuales}]);
    });

}




//Recibe eventos de otros jugadores
export const actualizarEventos = (setParentsState, endGame, history, usuario, code, jugadores) => {

    //Otro jugador ha pasado el turno
    socket.on('recibirTurno', (nuevoTurno, nuevaRonda, puntos) =>{

        //TODO ACTUALIZAR PARA JUGADOR DESCONECTADO        
        var i=0;
        var anterior;
        var maxJugadores=jugadores.length;
        jugadores.forEach(jugador => {
            console.log(jugador);
            if((i+1)%maxJugadores === nuevoTurno){
                anterior=i;
            }
            i=i+1;
        });
        console.log(anterior)
        console.log(puntos)
        jugadores[anterior].puntos=puntos;
        

        setParentsState([{turno:nuevoTurno, ronda:nuevaRonda, jugadores:jugadores}]);
        console.log("Turno del jugador " + nuevoTurno);
    });

    //Partida finalizada
    socket.on('finalizarPartida', (jugadoresDesc) =>{

        endGame(jugadoresDesc, jugadores[usuario], history, usuario, code);
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
//jugadores: vector con la info de los jugadores para actualizar los puntos
export const pasarTurno = (nuevoTurno, nuevaRonda, jugadores) => {
    socket.emit('pasarTurno', nuevoTurno, nuevaRonda, jugadores);
    console.log("He pasado el turno");
}

export const sendFinPartida = (jugadoresDesc) => {
    socket.emit('sendFinPartida', jugadoresDesc);
    console.log("Partida finalizada");
}