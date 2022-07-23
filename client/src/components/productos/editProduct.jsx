import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { EditTags } from "./editTags";
import { EditImages } from "./editImages";
import { EditOptions } from "./editOptions";
import Swal from 'sweetalert2';

export function EditProduct(props) {
    let navigate = useNavigate();
    let { id } = useParams();
    const [ProductName, setProductName] = useState();
    const [ProductPrice, setProductPrice] = useState();
    const [PriceCoin, setPriceCoin] = useState();
    const [ProductDescription, setProductDescription] = useState();
    const [Stock, setStock] = useState();
    const [CurrentStock, setCurrentStock] = useState();
    const [Status, setStatus] = useState();
    const [currency, setCurrency] = useState();
    async function Submit(e) {
        e.preventDefault();
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
                ProductName,
                ProductPrice,
                PriceCoin,
                ProductDescription,
                Stock,
                Status
            };
            await axios.put(`/api/product/${id}`, body, config)
                .then(res => {
                    Swal.fire({
                        title: 'Producto modificado',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 900
                    });
                    setTimeout(() => {
                        navigate("/myStore");
                    }, 1000);
                })
                .catch(err => Swal.fire({
                    title: 'Hubo un error',
                    icon: 'error',
                    text: err,
                    showConfirmButton: false,
                    timer: 900
                }))
        }
    };
    useEffect(() => {
        const { user } = props.auth;
        if (user) {
            axios.get(`/api/product/${id}`)
                .then(res => {
                    setProductName(res.data.ProductName);
                    setProductPrice(res.data.ProductPrice);
                    setProductDescription(res.data.ProductDescription);
                    setPriceCoin(res.data.PriceCoin);
                    setStatus(res.data.Status);
                    setCurrentStock(res.data.Stock);
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
                        <h3 class="mb5">Editar producto</h3>
                        <div class="login-form pt30 pb30" style={{ maxWidth: "100%" }}>
                            <form onSubmit={Submit} className="row">
                                <div className="col-md-4">
                                    <label>Nombre</label>
                                    <input class="input-text" type="text" placeholder="Nombre del producto" value={ProductName} onChange={e => setProductName(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="col-md-4">
                                <label>Precio</label>
                                    <input class="input-text" type="number" placeholder="Precio" value={ProductPrice} onChange={e => setProductPrice(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="col-md-4">
                                <label>Moneda</label>
                                    <select class="bg-white half-left" type="text" placeholder="Moneda" value={PriceCoin} onChange={e => setPriceCoin(e.target.value)} name="PriceCoin" required>
                                        {currency ? currency.map((d, i) => (
                                            <option key={i} value={d.CodeName}>{d.Name}</option>
                                        )) : ''}
                                    </select>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="col-md-6">
                                    <label>Agregar a inventario (actual: {CurrentStock}) </label>
                                    <input class="input-text" type="number" placeholder="Agregar a inventario" value={Stock} onChange={e => setStock(e.target.value)} />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="col-md-6">
                                    <label>Estado</label>
                                    <select class="bg-white half-left" type="text" placeholder="Status" value={Status} onChange={e => setStatus(e.target.value)} name="PriceCoin" required>
                                        <option value='Active'>Activo</option>
                                        <option value='Paused'>Pausado</option>
                                        <option value='Removed'>Removido</option>
                                    </select>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="col-md-12">
                                <label>Descipcion</label>
                                    <textarea class="input-text bg-white" type="text" placeholder="Descripcion" value={ProductDescription} onChange={e => setProductDescription(e.target.value)} required />
                                    <p className="help-block text-danger"></p>
                                    <input className="btn btn-sm btn-login" type="submit" value="Enviar" />
                                </div>
                            </form>
                            <EditImages id={id} />
                            <EditTags id={id} />
                            <EditOptions id={id} />
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
export default connect(mapStateToProps, null)(EditProduct);