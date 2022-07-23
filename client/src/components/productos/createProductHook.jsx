import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

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
                Swal.fire({
                    title: 'Imagen cargada correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 900,
                    imageUrl: res.data.url
                });
            })
            .catch(err => 
                Swal.fire({
                    title: 'Hubo un error',
                    icon: 'error',
                    text: err,
                    showConfirmButton: false,
                    timer: 900
                })
                );
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
                    Swal.fire({
                        title: 'Producto agregado',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 900
                    });
                    setTimeout(() => {
                        navigate("/myStore");
                    }, 1000);
                })
                .catch(err => 
                    Swal.fire({
                        title: 'Hubo un error',
                        icon: 'error',
                        text: err,
                        showConfirmButton: false,
                        timer: 900
                    })
                    )
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
    return (
        <section id="login" class="bg-grey-1">
            <div class="login-container">
                <div class="container text-center">
                    <div class="col-md-12">
                        <h3 class="mb5">Crear producto</h3>
                        <p class="subheading">Agregue su producto a su tienda</p>
                        <div class="pt30 pb30">
                            <form onSubmit={Submit} className="row">
                                <div class="col-md-6">
                                    <input class="input-text" type="text" placeholder="Nombre del producto" value={ProductName} onChange={e => setProductName(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div class="col-md-6">
                                    <input class="input-text" type="number" placeholder="Inventario" value={Stock} onChange={e => setStock(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div class="col-md-6">
                                    <input class="input-text" type="number" placeholder="Precio" value={ProductPrice} onChange={e => setProductPrice(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div class="col-md-6">
                                    <select class="bg-white half-left" type="text" placeholder="Moneda" value={PriceCoin} onChange={e => setPriceCoin(e.target.value)} name="PriceCoin" required>
                                        <option default value='USD'>Elija la moneda (predeterminado: USD)</option>
                                        {currency ? currency.map((d, i) => (
                                            <option key={i} value={d.CodeName}>{d.Name}</option>
                                        )) : ''}
                                    </select>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div class="col-md-6">
                                    <input class="input-text" type="text" placeholder="Descripcion" value={ProductDescription} onChange={e => setProductDescription(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div class="col-md-6">
                                    <input class="input-text" type="text" placeholder="Tags separados por commas" value={tags} onChange={e => setTags(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div class="col-md-6">
                                    <input className="sign-up-email bg-white" type="file" name="file" accept="image/png, image/jpeg"
                                        onChange={e => setUploadImage(e.target.files[0])} id="imageUpload" title="La imagen cargada toma prioridad" />
                                </div>
                                <div class="col-md-6">
                                    {UploadImage ?
                                        <button class="btn btn-sm btn-login mb10" type="button" onClick={Upload}>Cargar</button>
                                        :
                                        <input class="sign-up-first-name bg-white" type="text" placeholder="URL de la imagen" value={ProductImage}
                                            onChange={e => setProductImage(e.target.value)} tooltip="La imagen cargada toma prioridad" />
                                    }
                                </div>
                                <div class="col-md-12 mt20">
                                    <input class="btn btn-sm btn-login" type="submit" value="Enviar" />
                                </div>
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