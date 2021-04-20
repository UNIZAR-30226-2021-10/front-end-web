import React from 'react';
import '../css/Item.css';

class Item extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className="Item">
        <tbody className="infoItem">
          <tr className="nombre">
            <th>Nombre:</th>
            <td>{item.Nombre}</td>
          </tr>
          <div>
            <img className="iconItem" src={item.Imagen} alt={"Item "+item.Nombre}></img>
          </div>
        </tbody>
      </div>
    )
  }  
};

export default Item;