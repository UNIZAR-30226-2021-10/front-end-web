import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/Upload.css';
import UploadService from './uploadService';
import {help, insertarFile, textPlain, applicationPdf ,imgDownload} from './images';

class Header extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Header">
                <h1>Administrador</h1>
                <img className="iconHelp" src={help} alt="Help Icon" onClick={() => history.push("/AyudaJuego")}></img>
            </div>
        );
    }
}

class HomeSection extends React.Component{
    obtenerDatos(){
        const {historialUploaded} = this.props;
        let numItems = 0, numTrajes = 0, numSombreros = 0, numCamisetas = 0;
        historialUploaded.forEach((image, index) => {
            switch (image.Tipo){
                case "trajes":
                    numItems++;
                    numTrajes++;
                    break;
                case "sombreros":
                    numItems++;
                    numSombreros++;
                    break;
                case "camisetas":
                    numItems++;
                    numCamisetas++;
                    break;
                default:
                    break;
            }
        });
        return {numItems, numTrajes, numSombreros, numCamisetas};
    }

    render(){
        const {numItems, numTrajes, numSombreros, numCamisetas} = this.obtenerDatos();
        return(
            <div className="HomeSection">
                <p>En esta ventana se muestran datos estadísticos del juego.</p>
                <table>
                    <tbody>
                        <tr><th>Datos estadísticos</th></tr>
                        <tr><th>Número de usuarios registrados:</th><td>0</td></tr>
                        <tr><th>Número de items en la tienda:</th><td>{numItems}</td></tr>
                        <tr><th><li>Trajes</li></th><td>{numTrajes}</td></tr>
                        <tr><th><li>Sombreros</li></th><td>{numSombreros}</td></tr>
                        <tr><th><li>Camisetas</li></th><td>{numCamisetas}</td></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class FormGeneral extends React.Component{
    render(){
        const {selectTipoArchivo, pathImage, handleChange, onFileChange, handleSubmit} = this.props;
        return(
            <form className="FormGeneral" onSubmit={handleSubmit}>
                <img className="imageUpload" src={pathImage} alt="Imagen to upload"/>
                <div>
                    <select name="selectTipoArchivo" defaultValue={''} onChange={handleChange} required>
                        <option value="" disabled hidden>Selecciona el tipo de archivo</option>
                        <option value="image/*">Imagen</option>
                        <option value="text/plain">Text File</option>
                        <option value="application/pdf">pdf</option>
                    </select>
                    <input type="file" name="file" placeholder="Enter the file to upload." accept={selectTipoArchivo} onChange={onFileChange} required/>
                </div>
                <div>
                    <label for="productName">Image name:</label>
                    <input type="text" name="productName" placeholder="Enter the image name." onChange={handleChange} required/>
                </div>
                <div>
                    <button type="submit">Save Image</button>
                </div>
            </form>
        )
    }

}

class FormTienda extends React.Component{
    render(){
        const {selectTipoArchivo, pathImage, handleChange, onFileChange, handleSubmit} = this.props;
        return(
            <form className="FormTienda" onSubmit={handleSubmit}>
                <img className="imageUpload" src={pathImage} alt="Imagen to upload"/>
                <div>
                    <select name="selectTipoArchivo" defaultValue={''} onChange={handleChange} required>
                        <option value="" disabled hidden>Selecciona el tipo de archivo</option>
                        <option value="image/*">Imagen</option>
                    </select>
                    <input type="file" name="file" placeholder="Enter the file to upload." accept={selectTipoArchivo} onChange={onFileChange} required/>
                </div>
                <div>
                    <label for="productName">Product name:</label>
                    <input type="text" name="productName" placeholder="Enter the product name." onChange={handleChange} required/>
                </div>
                <div>
                    <label for="productCategory">Product category:</label>
                    <select name="productCategory" defaultValue={''} onChange={handleChange} required>
                        <option value="" disabled hidden>Selecciona la categoría del producto</option>
                        <option value="color">Color</option>
                        <option value="cabeza">Cabeza</option>
                        <option value="cara">Cara</option>
                        <option value="cuerpo">Cuerpo</option>
                    </select>
                </div>
                <div>
                    <label for="productPrice">Product price:</label>
                    <input type="text" name="productPrice" placeholder="Enter the product price." onChange={handleChange} required/>
                </div>
                <div>
                    <label for="productColor">Product color:</label>
                    <select name="productColor" defaultValue={''} onChange={handleChange} required>
                        <option value="" disabled hidden>Selecciona el color del producto</option>
                        <option value="negro" style={{background: "#000000", color: "#FFFFFF"}}>Negro</option>
                        <option value="blanco" style={{background: "#FFFFFF"}}>Blanco</option>
                        <option value="rojo" style={{background: "#FFB6AE"}}>Rojo</option>
                        <option value="naranja" style={{background: "#FFE1AE"}}>Naranja</option>
                        <option value="amarillo" style={{background: "#FAFCAF"}}>Amarillo</option>
                        <option value="verde" style={{background: "#B0F2C2"}}>Verde</option>
                        <option value="azul" style={{background: "#B0C2F2"}}>Azul</option>
                        <option value="morado" style={{background: "#E9B0F2"}}>Morado</option>
                        <option value="rosa" style={{background: "#ff7987"}}>Rosa</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Save Image</button>
                </div>
            </form>
        )
    }
}

class UploadSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //Categoría del archivo a insertar
            selectCategoria: '',
            //Tipo archivo, imagen y datos del archivo
            selectTipoArchivo: '',
            pathImage: insertarFile,
            file: '',
            //En caso de ser un archivo de la categoría producto
            productName: '',
            productCategory:'',
            productPrice: '',
            productColor:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value}=e.target;
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }

    onFileChange(e){
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            console.log(file);
            if(file.type.includes("image")){ //Si es una imagen
                //Actualizar estado: pathImage
                const reader = new FileReader();
                reader.readAsDataURL(file); //Leer url de la imagen
                reader.onload =  () =>{ //Cada vez que se cargue la imagen
                    this.setState({pathImage: reader.result}); //Imagen base 64
                }
            } else if(file.type.includes("text/plain")){    //Si es un fichero de texto
                //Actualizar estado: pathImage
                this.setState({pathImage: textPlain}); //Imagen base 64
                
            } else if(file.type.includes("application/pdf")){   //Si es un pdf
                //Actualizar estado: pathImage
                this.setState({pathImage: applicationPdf}); //Imagen base 64
            }
            else{   //No coincide con ningún tipo
                console.log("Error");
            }
            //Actualizar estado: file
            this.setState({file: file}); // Datos de la imagen
        }
    }

    handleSubmit(){
        const {selectCategoria, selectTipoArchivo, file, productName, productCategory, productPrice, productColor}=this.state;
        let data;
        if (selectCategoria === "general"){
            data = {
                selectCategoria: selectCategoria, //Categoría del archivo
                selectTipoArchivo: selectTipoArchivo, //Tipo de archivo
                productName: productName, //Nombre de la imagen
                productCategory: selectCategoria, //Categoría del producto
                productPrice: '0', //Precio del producto
                productColor: '-',  //Color del producto
            }
        } else if (selectCategoria === "tienda"){
            data = {
                selectCategoria: selectCategoria, //Categoría del archivo
                selectTipoArchivo: selectTipoArchivo, //Tipo de archivo
                productName: productName, //Nombre del producto
                productCategory: productCategory, //Categoría del producto
                productPrice: productPrice, //Precio del producto
                productColor: productColor,  //Color del producto
            }
        }

        //Upload file
        UploadService.sendImages(data, file).then((response) =>{
            console.log(response);
            alert("Imagen subida correctamente al servidor.");
        })
        .catch(error => {
            console.log(error);
            if (error.response.status === 400){ //Ya existe una imagen con esa url.
                alert('Ya existe una imagen con esa url.');
            } else if (error.response.status === 410){ //Tipo de archivo seleccionado erróneo.
                alert('Tipo de archivo seleccionado erróneo.');
            } else{  //Fallo de login por otros motivos
                alert('Ha habido un fallo, vuelva a intentarlo.');
            }
        });;
    }

    render(){
        const {selectCategoria, selectTipoArchivo, pathImage} = this.state;
        return(
            <div className="UploadSection">
                <form className="categoriaArchivo">
                    <div>
                        <p>Esta ventana se usa para subir archivos al servidor.</p>
                    </div>
                    <div>
                        <label for="selectCategoria">Categoría:</label>
                        <select name="selectCategoria" defaultValue={''} onChange={this.handleChange} required>
                            <option value="" disabled hidden>Selecciona la categoría</option>
                            <option value="general">General</option>
                            <option value="tienda">Producto de la tienda</option>
                        </select>
                    </div>
                </form>
                    {selectCategoria === "general" ? (
                        <FormGeneral 
                            selectTipoArchivo={selectTipoArchivo}
                            pathImage={pathImage}
                            handleChange={this.handleChange}
                            onFileChange={this.onFileChange} 
                            handleSubmit={this.handleSubmit} 
                        />
                    ):(
                        selectCategoria === "tienda" ? (
                            <FormTienda
                                selectTipoArchivo={selectTipoArchivo}
                                pathImage={pathImage}
                                handleChange={this.handleChange}
                                onFileChange={this.onFileChange} 
                                handleSubmit={this.handleSubmit} 
                            />
                        ):(<div></div>)
                    )}
            </div>
        )
    }
}

class DownloadSection extends React.Component{
    download(){
        const {historialUploaded} = this.props;
        let historial=[];
        historialUploaded.forEach((uploadResponse) => {
            const linkDownload = uploadResponse.Imagen;
            let nameDownload;
            if (uploadResponse.Imagen){
            nameDownload = uploadResponse.Tipo + "-" + 
                                 uploadResponse.Nombre + "-" + 
                                 uploadResponse.Color + "." + uploadResponse.Imagen.split('.')[1];
            } else{ 
                nameDownload = "indefinidoNombre.png";
            }
            historial.push(
                <tr key={uploadResponse.iditem}>
                    <td>{uploadResponse.Nombre}</td>
                    <td>{uploadResponse.Tipo}</td>
                    <td>{uploadResponse.Color}</td>
                    <td><img src={uploadResponse.Imagen} alt="Uploaded File"></img></td>
                    <td>
                        <a className="linkDownload" href={linkDownload} download={nameDownload}>
                            Click here to download
                            <img className="downloadIcon" src={imgDownload} alt="Download Icon"></img>
                        </a>
                    </td>
                </tr>
            );
        })
        return historial;
    }

    render(){
        const download = this.download();
        return(
            <div className="DownloadSection">
                <p>En esta ventana se pueden descargar los archivos subidos al servidor</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Color</th>
                            <th>Imagen</th>
                            <th>Download</th>
                        </tr>
                        {download}
                    </tbody>
                </table>
            </div>
        );
    }
}

class HistorialSection extends React.Component{
    historial(){
        const {historialUploaded} = this.props;
        let historial=[];
        historialUploaded.forEach((uploadResponse) => {
            historial.push(
                <tr key={uploadResponse.iditem}>
                    <td>{uploadResponse.Precio}</td>
                    <td>{uploadResponse.Nombre}</td>
                    <td>{uploadResponse.Tipo}</td>
                    <td>{uploadResponse.Color}</td>
                    <td>{uploadResponse.Imagen}</td>
                </tr>
            );
        })
        return historial;
    }

    render(){
        const historial = this.historial();
        return(
            <div className="HistorialSection">
                <p>Esta ventana muestra el historial de las imagenes subidas al servidor. (Datos en db)</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Precio</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Color</th>
                            <th>Imagen</th>
                        </tr>
                        {historial}
                    </tbody>
                </table>
            </div>
        );
    }
}

class FooterMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
            historialUploaded: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const {name, value}=e.target;
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }

    componentDidMount(){
        UploadService.getHistorial().then((response) => {
            const historialUploaded = response.data.listaResults;
            this.setState({historialUploaded: historialUploaded});
        });
    }

    seccion(){
        const {activeItem, historialUploaded} = this.state;
        let seccion = [];
        if (activeItem === 'home'){
            seccion.push(
                <HomeSection historialUploaded={historialUploaded}/>
            );
        } else if (activeItem === 'upload'){
            seccion.push(
                <UploadSection/>
            );
        } else if (activeItem === 'download'){
            seccion.push(
                <DownloadSection historialUploaded={historialUploaded}/>
            );
        } else if (activeItem === 'historial'){
            seccion.push(
                <HistorialSection historialUploaded={historialUploaded}/>
            );
        }
        return seccion;
    }

    render() {
        const {history} = this.props;
        const seccion = this.seccion();
        return (
            <div className="FooterMenu">
                <div className="menu">
                    <button className="optionMenu" name="activeItem" value="home" onClick={this.handleChange}>Home</button>
                    <button className="optionMenu" name="activeItem" value="upload" onClick={this.handleChange}>Upload</button>
                    <button className="optionMenu" name="activeItem" value="download" onClick={this.handleChange}>Download</button>
                    <button className="optionMenu" name="activeItem" value="historial" onClick={this.handleChange}>Historial</button>
                    <button className="optionLogOut" name="activeItem" value="logout" onClick={() => history.push("/MenuInicio")}>Logout</button>
                </div>
                {seccion}
            </div>
        )
    }
}

class Upload extends React.Component{
    render(){
        const history = this.props.history;
        return(
            <div className="Upload">
                <Header history={history}/>
                <FooterMenu history={history}/>
            </div>
        )
    }
}

export default withRouter(Upload);