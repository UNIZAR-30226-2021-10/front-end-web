import axios from 'axios';

const baseUrl = 'http://localhost:3060';

class UploadService{
    /*getImages(){
        console.log("Get images cliente");
        return axios.get(baseUrl+'/download');
    }*/

    async getHistorial(){
        console.log("Get images cliente");
        return await axios.get(baseUrl+'/historial');
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
        form.append('esAO', data.esAO);
        form.append('file', file);
        return axios.post(baseUrl+'/upload',form);
    }
}

export default new UploadService();