import React from 'react';
import '../css/Dado.css';

class Dado extends React.Component {
  render() {
    const dado = this.props.dado;
    return (
      <div className="Dado">
        <tbody className="infoDado">
          <div>
            <img className="imgDado" src={dado.img} alt={"Category "+dado.category}></img>
          </div>
          <tr className="categoria">
            <td style={{ color: dado.color}}>{dado.category}</td>
          </tr>
        </tbody>
      </div>
    )
  }  
};

export default Dado;