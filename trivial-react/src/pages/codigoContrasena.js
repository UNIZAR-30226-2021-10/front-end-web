import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/CambiarContrasena.css';
import {LeftOutlined} from '@ant-design/icons';
import {help, baseURL} from './images';
import axios from 'axios';
import Cookies from 'universal-cookie';
const correoWonder = "trivial@gmail.com";
const passwordWonder = "12345";
exports.sendEmail = function(req, res){
    // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: correoWonder,
                pass: passwordWonder
            }
        });
    // Definimos el email
    var mailOptions = {
        from: transporter.auth.user,
        to: req.body.email,
        subject: 'Cambiar password',
        text: 'Contenido del email'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};

    class Header extends React.Component{
        render(){
            const history = this.props.history;
            const usuario = this.props.usuario;
            return(
                <div className="Header">
                    <div className="iconAtras">
                        <LeftOutlined onClick={() => history.push("/DecisionJuego", {usuario: usuario})}/> 
                        Atrás
                    </div>
                    <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
                </div>
            );
        }
    }





axios.post(baseURL+"/CambiarConstrasenya", {email: email,password: password})
.then(response => {
    console.log(response.data);
    alert("Password cambiada correctamente: "+ email);
    history.push('/PerfilUsuario', {usuario: username}); 
})
.catch(error => {
    console.log(error);
    if (error.response.status == 400){
        alert("Correo no registrado");
        this.resetCampos('email');
    } else {
        alert("Error desconocido");
        this.resetCampos('email');
        this.resetCampos(['password','repPassword']);
    }
});