import io from 'socket.io-client';
import {socketURL} from './images';
import swal from 'sweetalert';
let socket;

//Iniciar socket del cliente
export const iniciarSocket = (username, code, firstJoin, history, avatar) => {
    socket = io(socketURL, {
        transports: [ 'websocket' ],
        upgrade: false
    });
    socket.emit('join', {username: username, code: code, avatar:avatar, firstJoin: firstJoin}, (error) =>{
        if (error!=="ok"){
            swal({
                text: "No se ha podido entrar.",
                icon: "warning",
                button: "Ok"
            });
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

//Recargar página 
export const refreshPage = (username, code, history) => {
    socket = io(socketURL, {
        transports: [ 'websocket' ],
        upgrade: false
    });
    socket.emit('refresh', {username: username, code: code}, (error) =>{
        if (error){
            alert(error);
            history.goBack();
        }
    });
}

//Metodo para recibir eventos (mensajes, union al chat, cambio de turno)
export const actualizarMensajes = (messages, jugadores, setParentsState, maxRondas, usuario, handleTurno) => {

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
        jugador.conectado=true;
        console.log(jugador)
        jugadoresActuales.push(jugador);
        setParentsState([{jugadores: jugadoresActuales}]);
    });

    //Jugador de nombre username se desconecta
    socket.on('desconexion', (jugadorDesconectado) =>{
        var jugadoresActuales = jugadores;
        var num_conectados=0;
        
        jugadoresActuales.forEach(j => {
            if(j.username===jugadorDesconectado){
                j.conectado=false;
                j.puntos=0;
                
                
            }

            if(j.conectado==true){
                num_conectados++;
            }
        })

        console.log("DESCONEXION");
        console.log(num_conectados)

        setParentsState([{jugadores: jugadoresActuales}]);

        if(num_conectados==1){
            console.log("UN CONECTADO")
            setParentsState([{ronda:maxRondas, turno:usuario}]);
            handleTurno();
        }
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

        for(i=1; i<=maxJugadores; i++){
            let index=(nuevoTurno+maxJugadores-i)%maxJugadores;
            if(jugadores[index].conectado === true){
                anterior=index;
                break;
            }
        }
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