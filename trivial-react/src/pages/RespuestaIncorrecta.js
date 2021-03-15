import React from 'react';
import '../css/RespuestaIncorrecta.css';
import { CloseCircleTwoTone } from "@ant-design/icons";

class RespuestaIncorrecta extends React.Component {
  render() {
    const answer = this.props.answer;
    return (
      <div className="RespuestaIncorrecta">
        <tbody className="infoRespuesta">
            <div>
                <CloseCircleTwoTone className="iconIncorrecta" twoToneColor="red" style={{ fontSize: "25vh" }}/>
            </div>
            <div className="infoIncorrecta" >
                <h1>¡Respuesta incorrecta!</h1>
                <h1>La respuesta correcta era: {answer}</h1>
            </div>
        </tbody>
      </div>
    )
  }  
};

export default RespuestaIncorrecta;