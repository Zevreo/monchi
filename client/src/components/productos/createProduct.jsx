import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";

export function CreateProduct(props) {
    const [ProductName, setProductName] = useState();
    const [ProductPrice, setProductPrice] = useState();
    const [PriceCoin, setPriceCoin] = useState();
    const [ProductDescription, setProductDescription] = useState();
    const [tags, setTags] = useState();
    const [updated, setUpdated] = useState(false);
    const [store, setStore] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    async function Submit() {
        try {
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
                    tags
                };
                await axios.post('/api/product', body, config)
                    .then(setSuccess("Product agregado exitosamente"))
                    .catch(err => setError(err))
            }

        }
        catch {

        }
    };
    useEffect(() => {
        const { user } = props.auth;
        if (user && updated === false) {
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => {
                    setStore(res.data);
                    setUpdated(true)});
        }
    }, [])
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
                                <input class="input-text" type="number" placeholder="Precio" value={ProductPrice} onChange={e => setProductPrice(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <select class="bg-white" type="text" placeholder="Moneda" value={PriceCoin} onChange={e => setPriceCoin(e.target.value)} required>
                                    <option default disabled value=''>Seleccione su moneda preferida</option>
                                    <option value='USD'>Dólar estadounidense</option>
                                    <option value='EUR'>Euro</option>
                                    <option value='GBP'>Libra esterlina</option>
                                    <option value='INR'>Rupia</option>
                                    <option value='AUD'>Dólar australiano</option>
                                    <option value='CAD'>Dólar canadiense</option>
                                    <option value='SGD'>Dólar de Singapur</option>
                                    <option value='CHF'>Franco suizo</option>
                                    <option value='MYR'>Ringgit</option>
                                    <option value='JPY'>Yen</option>
                                    <option value='CNY'>Yuan</option>
                                    <option value='MNX'>Peso mexicano</option>
                                </select>
                                <p className="help-block text-danger"></p>
                                <input class="input-text" type="text" placeholder="Descripcion" value={ProductDescription} onChange={e => setProductDescription(e.target.value)} required />
                                <p className="help-block text-danger"></p>
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