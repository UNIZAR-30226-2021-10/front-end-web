//-----------------------RUTAS DE LAS IMÁGENES FIJAS DEL FRONTEND------------------

//URL del servidor de imágenes
const baseUrl = 'http://localhost:3060';

//Menu: iconos de ventana "Decision Juego".
const compras = baseUrl+"/appImages/menu/compras.png";
const trofeo = baseUrl+"/appImages/menu/trofeo.png";
const imgUsuario = baseUrl+"/appImages/menu/usuario.png";
const historialIcon = baseUrl+"/appImages/menu/historialicon.png";

//Dado: imágenes dado de "Partidas Individual y Multijugador".
const amarillo = baseUrl+"/appImages/dado/amarillo.jpeg";
const azul = baseUrl+"/appImages/dado/azul.jpeg";
const marron = baseUrl+"/appImages/dado/marron.jpeg";
const naranja = baseUrl+"/appImages/dado/naranja.jpeg";
const rosa = baseUrl+"/appImages/dado/rosa.jpeg";
const verde = baseUrl+"/appImages/dado/verde.jpeg";

//Ranking: imágenes de ventana "Ranking".
const ranking = baseUrl+"/appImages/ranking/ranking.png";
const first = baseUrl+"/appImages/ranking/first.png";
const second = baseUrl+"/appImages/ranking/second.png";
const third = baseUrl+"/appImages/ranking/third.png";

//Upload: imágenes de ventana "Upload".
const insertarFile = baseUrl+"/appImages/upload/insertarFile.png";
const textPlain = baseUrl+"/appImages/upload/textPlain.png";
const applicationPdf = baseUrl+"/appImages/upload/applicationPdf.png";
const imgDownload = baseUrl+"/appImages/upload/download.png";

//Ventanas: logo e imágenes de otras ventanas:"Ajustes", "Perfil Usuario", "Historial".
const logo = baseUrl+"/appImages/ventanas/logo.png";
const ajustes = baseUrl+"/appImages/ventanas/ajustes.png";
const imgAvatar = baseUrl+"/appImages/ventanas/avatar.png";
const historial = baseUrl+"/appImages/ventanas/historial.jpg";
const tienda = baseUrl+"/appImages/ventanas/tienda.png";
const admin = baseUrl+"/appImages/ventanas/admin.png";

//Iconos: Chat y Help
const chat = baseUrl+"/appImages/iconos/chat.png";
const help = baseUrl+"/appImages/iconos/help.png";

export { compras, trofeo, imgUsuario, historialIcon,            //Menu
         amarillo, azul, marron, naranja, rosa, verde,          //Dado
         ranking, first, second, third,                         //Ranking
         insertarFile, textPlain, applicationPdf, imgDownload,  //Upload 
         logo, ajustes, imgAvatar,  historial, tienda, admin,   //Ventanas
         chat, help }                                           //Iconos