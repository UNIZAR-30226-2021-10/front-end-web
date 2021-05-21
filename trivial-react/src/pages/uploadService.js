import axios from 'axios';
import {baseURL} from './images';

class UploadService{
    /*getImages(){
        console.log("Get images cliente");
        return axios.get(baseURL+'/download');
    }*/

    async getHistorial(){
        console.log("Get images cliente");
        return await axios.get(baseURL+'/historial');
    }

    async getNumberOfUsers(){
        return await axios.get(baseURL+'/numberUsers')
    }

    sendImages(data, file){
        console.log("Send images cliente");
        const form = new FormData();
        form.append('selectCategoria', data.selectCategoria);
        form.append('selectTipoArchivo', data.selectTipoArchivo);
        form.append('productName', data.productName);
        form.append('productCategory', data.productCategory);
        form.append('productPrice', data.productPrice);
        form.append('productColor', data.productColor);
        form.append('file', file);
        return axios.post(baseURL+'/upload',form);
    }
}

export default new UploadService();