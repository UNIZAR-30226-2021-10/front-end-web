//-----------------------RUTAS DE LAS IMÁGENES FIJAS DEL FRONTEND------------------

//URL del servidor de imágenes
//const imagesURL = 'http://localhost:3060';
export const imagesURL = 'https://trivial-images.herokuapp.com';

//URL BBDD
//localhost:3050
export const baseURL = 'https://trivial-db.herokuapp.com';

//URL websockets
//localhost:5000
export const socketURL = 'https://websocketstrivial.herokuapp.com'



//Menu: iconos de ventana "Decision Juego".
const compras = imagesURL+"/appImages/menu/compras.png";
const trofeo = imagesURL+"/appImages/menu/trofeo.png";
const imgUsuario = imagesURL+"/appImages/menu/usuario.png";
const historialIcon = imagesURL+"/appImages/menu/historialicon.png";

//Dado: imágenes dado de "Partidas Individual y Multijugador".
const amarillo = imagesURL+"/appImages/dado/amarillo.jpeg";
const azul = imagesURL+"/appImages/dado/azul.jpeg";
const marron = imagesURL+"/appImages/dado/marron.jpeg";
const naranja = imagesURL+"/appImages/dado/naranja.jpeg";
const rosa = imagesURL+"/appImages/dado/rosa.jpeg";
const verde = imagesURL+"/appImages/dado/verde.jpeg";

//Ranking: imágenes de ventana "Ranking".
const ranking = imagesURL+"/appImages/ranking/ranking.png";
const first = "../imagenes/first.PNG";
const second = "../imagenes/first.PNG";
const third = "../imagenes/first.PNG";

//Upload: imágenes de ventana "Upload".
const insertarFile = imagesURL+"/appImages/upload/insertarFile.png";
const textPlain = imagesURL+"/appImages/upload/textPlain.png";
const applicationPdf = imagesURL+"/appImages/upload/applicationPdf.png";
const imgDownload = imagesURL+"/appImages/upload/download.png";

//Ventanas: logo e imágenes de otras ventanas:"Ajustes", "Perfil Usuario", "Historial".
const logo = imagesURL+"/appImages/ventanas/logo.png";
const ajustes = imagesURL+"/appImages/ventanas/ajustes.png";
const imgAvatar = imagesURL+"/appImages/ventanas/avatar.png";
const historial = imagesURL+"/appImages/ventanas/historial.jpg";
const tienda = imagesURL+"/appImages/ventanas/tienda.png";
const admin = imagesURL+"/appImages/ventanas/admin.png";

//Iconos: Chat y Help
const chat = imagesURL+"/appImages/iconos/chat.png";
const help = imagesURL+"/appImages/iconos/help.png";

export { compras, trofeo, imgUsuario, historialIcon,            //Menu
         amarillo, azul, marron, naranja, rosa, verde,          //Dado
         ranking, first, second, third,                         //Ranking
         insertarFile, textPlain, applicationPdf, imgDownload,  //Upload 
         logo, ajustes, imgAvatar,  historial, tienda, admin,   //Ventanas
         chat, help }                                           //Iconos