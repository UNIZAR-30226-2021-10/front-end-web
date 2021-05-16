import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import '../css/App.css';
import MenuInicio from '../pages/MenuInicio'
import Registrarse from '../pages/Registrarse'
import CambiarContrasena from '../pages/CambiarContrasena';
import CodigoVerificacion from '../pages/CodigoVerificacion';
import AyudaJuego from '../pages/AyudaJuego';
import DecisionJuego from '../pages/DecisionJuego';
import ModoMultijugador from '../pages/ModoMultijugador';
import ModoIndividual from '../pages/ModoIndividual';
import PerfilUsuario from '../pages/PerfilUsuario';
import Ajustes from '../pages/Ajustes'
import Tienda from '../pages/Tienda';
import ItemTienda from '../pages/ItemTienda';
import MultijugadorUnirse from '../pages/MultijugadorUnirse';
import MultijugadorCrear from '../pages/MultijugadorCrear';
import RespuestaCorrecta from '../pages/RespuestaCorrecta';
import RespuestaIncorrecta from '../pages/RespuestaIncorrecta';
import FinalMultijugador from '../pages/FinalMultijugador';
import IndividualPartida from '../pages/IndividualPartida';
import FinalIndividual from '../pages/FinalIndividual';
import Ranking from '../pages/Ranking';
import Historial from '../pages/Historial';
import Upload from '../pages/Upload';
import Equipacion from '../pages/Equipacion';
import AbandonarPartida from '../pages/AbandonarPartida';


class App extends React.Component{
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MenuInicio}/>
            <Route exact path="/MenuInicio" component={MenuInicio}/>
            <Route exact path="/Registrarse" component={Registrarse}/>
            <Route exact path="/CambiarContrasena" component={CambiarContrasena}/>
            <Route exact path="/CodigoVerificacion" component={CodigoVerificacion}/>
            <Route exact path="/DecisionJuego" component={DecisionJuego}/>
            <Route exact path="/ModoMultijugador" component={ModoMultijugador}/>
            <Route exact path="/ModoIndividual" component={ModoIndividual}/>
            <Route exact path="/PerfilUsuario" component={PerfilUsuario}/>
            <Route exact path="/Ajustes" component={Ajustes}/>
            <Route exact path="/Tienda" component={Tienda}/>
            <Route exact path="/ItemTienda" component={ItemTienda}/>
            <Route exact path="/MultijugadorUnirse" component={MultijugadorUnirse}/>
            <Route exact path="/MultijugadorUnirse/:code" component={MultijugadorUnirse}/>
            <Route exact path="/MultijugadorCrear" component={MultijugadorCrear}/>
            <Route exact path="/RespuestaCorrecta" component={RespuestaCorrecta}/>
            <Route exact path="/RespuestaIncorrecta" component={RespuestaIncorrecta}/>
            <Route exact path="/AyudaJuego" component={AyudaJuego}/>
            <Route exact path="/FinalMultijugador" component={FinalMultijugador}/>
            <Route exact path="/IndividualPartida" component={IndividualPartida}/>
            <Route exact path="/FinalIndividual" component={FinalIndividual}/>
            <Route exact path="/Ranking" component={Ranking}/>
            <Route exact path="/Historial" component={Historial}/>
            <Route exact path="/Upload" component={Upload}/>
            <Route exact path="/Equipacion" component={Equipacion}/>
            <Route exact path="/AbandonarPartida" component={AbandonarPartida}/>
            <Route render={() => <h1>Not found!</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
