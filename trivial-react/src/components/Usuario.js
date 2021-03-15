import React from 'react';
import '../css/Usuario.css';

class Usuario extends React.Component {
  render() {
    const usuario = this.props.usuario;
    console.log(usuario);
    return (
      <div className="Usuario">
        <tbody className="infoUsuario">
          <div>
            <img className="imgAvatar" src={usuario.avatar} alt={"Avatar de "+ usuario.username}></img>
          </div>
          <div className="datosUsuario">
            <tr>
                <p>{usuario.username}</p>
            </tr>
            <tr>
                <td>{usuario.puntos} puntos</td>
            </tr>
          </div>
        </tbody>
      </div>
    )
  }  
};

export default Usuario;