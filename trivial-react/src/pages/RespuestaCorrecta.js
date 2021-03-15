import React from 'react';
import '../css/RespuestaCorrecta.css';
import { CheckCircleTwoTone } from "@ant-design/icons";

class RespuestaCorrecta extends React.Component {
  render() {
    const puntos = this.props.puntos;
    return (
      <div className="RespuestaCorrecta">
        <tbody className="infoRespuesta">
            <div>
                <CheckCircleTwoTone className="iconCorrecta" twoToneColor="#52c41a" style={{ fontSize: "25vh" }}/>
            </div>
            <div className="infoCorrecta" >
                <h1>¡Respuesta correcta!</h1>
                <h1>+{puntos} puntos</h1>
            </div>
        </tbody>
      </div>
    )
  }  
};

export default RespuestaCorrecta;