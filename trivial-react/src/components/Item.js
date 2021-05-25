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
        <tbody style={{textAlign: 'right'}} className="infoItem">
          <tr className="nombre" style={{marginRigth:'40px',textAlign: 'right'}}>
            <th style={{height: 'auto'}}>Nombre:</th>
            <td style={{height: 'auto', whiteSpace: 'nowrap'}}>{item.Nombre}</td>
          </tr>
          <div>
            <img style={{ marginLeft: "38px", marginTop: "-2px",cursor: "pointer"}}className="iconItem" src={item.Imagen} alt={"Item "+item.Nombre}></img>
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
              <img style={{ marginLeft: "15px", marginTop: "-3px",cursor: "pointer"}}className="iconItemE" src={item.Imagen} alt={"Item "+item.Nombre}></img>
              <h3 style={{color: "green",marginTop: "-2px", marginLeft: "27px",fontSize: "14px", fontStyle: "italic"}}>  Equipado</h3>
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