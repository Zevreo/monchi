import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router";

export function CreateProduct(props) {
    let navigate = useNavigate();
    const [ProductName, setProductName] = useState();
    const [ProductPrice, setProductPrice] = useState();
    const [PriceCoin, setPriceCoin] = useState();
    const [ProductDescription, setProductDescription] = useState();
    const [UploadImage, setUploadImage] = useState();
    const [ProductImage, setProductImage] = useState();
    const [Stock, setStock] = useState();
    const [tags, setTags] = useState();
    const [store, setStore] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [currency, setCurrency] = useState();
    var formData = new FormData();
    const [dataform, setDataForm] = useState();
    useEffect(() => {
        formData.append("upload_preset", "thumbnail"); // Replace the preset name with your own
        formData.append("api_key", "876895554677544"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);
        formData.append("file", UploadImage);
        setDataForm(formData);
    }, [UploadImage]);
    async function Upload() {
        await axios.post('https://api.cloudinary.com/v1_1/dvticou1l/image/upload', dataform)
            .then(res => {
                setProductImage(res.data.url);
                setSuccess("Imagen cargada correctamente")
            })
            .catch(err => setError(err));
    };
    async function Submit(e) {
        e.preventDefault();
        console.log(ProductImage);
        if (props.auth) {
            const { token } = props.auth;
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            if (token) {
                config.headers['x-auth-token'] = token;
            }
            const body = {
                StoreId: `${store._id}`,
                ProductName,
                ProductPrice,
                PriceCoin,
                ProductDescription,
                ProductImage,
                tags,
                Stock
            };
            await axios.post('/api/product', body, config)
                .then(res => {
                    setSuccess('Producto agregado exitosamente');
                    setTimeout(() => {
                        navigate("/myStore");
                    }, 3000);
                })
                .catch(err => setError(err))
        }
    };
    useEffect(() => {
        const { user } = props.auth;
        if (user) {
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => {
                    setStore(res.data);
                });
            axios.get('/api/fixed/currency')
                .then(res => {
                    setCurrency(res.data);
                });
        }
    }, []);
    const errorMessage = (
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="alert alert-danger fade in">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
                    <i class="ion-android-alert"></i><strong>{error}</strong>
                </div>
            </div>
        </div>
    )
    const successMessage = (
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="alert alert-success fade in">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
                    <i class="ion-android-alert"></i><strong>{success}</strong>
                </div>
            </div>
        </div>
    )
    return (
        <section id="login" class="bg-grey-1">
            <div class="login-container">
                {error !== null ? errorMessage : ''}
                {success !== null ? successMessage : ''}
                <div class="container text-center">
                    <div class="col-md-12">
                        <h3 class="mb5">Crear producto</h3>
                        <p class="subheading">Agregue su producto a su tienda</p>
                        <div class="login-form pt30 pb30">
                            <form onSubmit={Submit}>
                                <input class="input-text" type="text" placeholder="Nombre del producto" value={ProductName} onChange={e => setProductName(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <input class="input-text" type="number" placeholder="Inventario" value={Stock} onChange={e => setStock(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <input class="input-text" type="number" placeholder="Precio" value={ProductPrice} onChange={e => setProductPrice(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <select class="bg-white half-left" type="text" placeholder="Moneda" value={PriceCoin} onChange={e => setPriceCoin(e.target.value)} name="PriceCoin" required>
                                    <option default value='USD'>Elija la moneda (predeterminado: USD)</option>
                                    { currency ? currency.map((d, i) => (
                                        <option key={i} value={d.CodeName}>{d.Name}</option>
                                    )) : ''}
                                </select>
                                <p className="help-block text-danger"></p>
                                <input class="input-text" type="text" placeholder="Descripcion" value={ProductDescription} onChange={e => setProductDescription(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <input className="sign-up-email bg-white" type="file" name="file" accept="image/png, image/jpeg"
                                    onChange={e => setUploadImage(e.target.files[0])} id="imageUpload" title="La imagen cargada toma prioridad" />
                                {UploadImage ?
                                    <button class="btn btn-sm btn-login mb10" type="button" onClick={Upload}>Cargar</button>
                                    :
                                    <input class="sign-up-first-name bg-white" type="text" placeholder="URL de la imagen" value={ProductImage}
                                        onChange={e => setProductImage(e.target.value)} tooltip="La imagen cargada toma prioridad" />}
                                <input class="input-text" type="text" placeholder="Tags separados por commas" value={tags} onChange={e => setTags(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <input class="btn btn-sm btn-login" type="submit" value="Enviar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(CreateProduct);