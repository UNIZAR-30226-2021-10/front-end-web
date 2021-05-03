
export default storage => ({
    //k -> key
    getData(k) {
        var getlocal = storage.getItem(k);
        var parslocal;
        if(getlocal !== null && getlocal !== "" && getlocal !== false && getlocal !== undefined){ //Si existe
            parslocal = JSON.parse(getlocal); //Transforma el contenido de storage a un objeto Javascript
            return parslocal;
        }
        else{
            return null;
        }
    },

    //k -> key, v -> value
    setData(k, v) {
        var data = this.getData(k);
        if (data !== null && data !== v){ //Si hay datos guardados y son distintos a los que se quiere insertar
            storage.setItem(k, JSON.stringify(v)); //Actualizo
        } else{ //Si no existe el elemento en storage o los datos son los mismos
            storage.setItem(k, JSON.stringify(v)); //Guardo estado en storage 
        }
    },

    //k -> key
    removeData(k){
        var data = this.getData(k);
        if (data !== null){ //Si hay datos guardados
            localStorage.removeItem(k); //Se eliminan
        }
    }
  })