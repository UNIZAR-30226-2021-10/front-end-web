import React from 'react';
import '../css/Item.css';

class Item extends React.Component {

  
  render() {
    const item = this.props.item;
    if(this.props.equipado !== undefined){
      console.log(this.props.equipado)
    }
    return(
      (this.props.equipado === undefined) ?
      (<div className="Item">
        <tbody className="infoItem">
          <tr className="nombre">
            <th>Nombre:</th>
            <td>{item.Nombre}</td>
          </tr>
          <div>
            <img style={{ marginLeft: "35px", marginTop: "8px",cursor: "pointer"}}className="iconItem" src={item.Imagen} alt={"Item "+item.Nombre}></img>
          </div>
        </tbody>
      </div>
      )
      :
      (
        (this.props.equipado === 1) ?
        (
          <div className="ItemEquipado">
          <tbody className="infoItem">
            <tr className="nombre">
              <th>Nombre:</th>
              <td>{item.Nombre}</td>
            </tr>
            <div>
              <img style={{ marginLeft: "35px", marginTop: "8px",cursor: "pointer"}}className="iconItem" src={item.Imagen} alt={"Item "+item.Nombre}></img>
            </div>
          </tbody>
          </div>
          ) : 
          (
              <div className="Item">
                <tbody className="infoItem">
                  <tr className="nombre">
                    <th>Nombre:</th>
                    <td>{item.Nombre}</td>
                  </tr>
                  <div>
                    <img style={{ marginLeft: "35px", marginTop: "8px",cursor: "pointer"}}className="iconItem" src={item.Imagen} alt={"Item "+item.Nombre}></img>
                  </div>
                </tbody>
              </div>
          )
      )
      
    )
  }  
};

export default Item;