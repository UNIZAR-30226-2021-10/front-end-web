# front-end-web
Repositorio donde residirá el código relacionado con el front-end.

## json-server
Se lanza con npm start en el puerto 3001.  
Simula una base de datos usando el paquete json-server de react.  
Se ha usado para probar el correcto funcionamiento del servidor de websockets y el frontend para la unión a una partida y el chat cuando todavía no estaba implementado el backend de la base de datos en Heroku. Posteriormente, este servidor será eliminado.

## trivial-react
Se lanza con npm start en el puerto 3000.  
Contiene los ficheros js y css de la app web.

## Como probar la app web
1. Entrar en la carpeta json-server y ejecutar npm start. (puerto 3001)
2. Entrar en la carpeta servidor_websockets del backend y ejecutar npm start. (puerto 5000)
3. Entrar en la carpeta trivial-react y ejecutar npm start. (puerto 3000)
