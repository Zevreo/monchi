import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Pagination from "../utilities/Pagination";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function MySales(props) {
    const { user } = props.auth;
    const { token } = props.auth;
    const [Sales, setSales] = useState([]);
    const [Store, setStore] = useState();

    async function getStore() {
        if (user) {
            await axios.get(`/api/store/owner/${user._id}`)
                .then(res => setStore(res.data))
                .catch(err => console.error(err));
        }
    }

    useEffect(() => {
        getStore();
    }, []);

    useEffect(() => {
        getSales();
    }, [Store]);

    async function getSales() {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        console.log(Store._id);
        if (user && Store) {
            await axios.get(`/api/order/store/${Store._id}`, config)
                .then(res => setSales(res.data))
                .catch(err => console.error(err));
        }
    }

    return (
        <div class="row">
            <div class="col-md-12 text-center mb40">
                <h4 class="mb0">Ordenes</h4>
            </div>
            <div class="col-sm-8 col-sm-offset-2">
                <div class="panel-group accordion-style3" id="accordion">
                    <table class="shop_table cart table-hover table-bordered" cellspacing="0">
                        <thead>
                            <tr class="row">
                                <th class="product-thumbnail col-sm-2 text-center">Producto</th>
                                <th class="product-name col-sm-2 text-center">Nombre</th>
                                <th class="product-name col-sm-2 text-center">Opciones</th>
                                <th class="product-price col-sm-2 text-center">Precio</th>
                                <th class="product-quantity col-sm-1 text-center">Cantidad</th>
                                <th class="product-name col-sm-1 text-center">Method</th>
                                <th class="product-name col-sm-2 text-center">TransactionId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Sales.map((d, i) => (
                                <tr class="cart_item row" key={i}>
                                    <td class="product-thumbnail col-sm-2 text-center">
                                        <Link to={`/product/${d.ProductId}`}>
                                            <img src={d.Image} alt="#" />
                                        </Link>
                                    </td>
                                    <td class="product-name col-sm-2 text-center">
                                        <Link to={`/product/${d.ProductId}`}>{d.Name}</Link>
                                    </td>
                                    <td class="product-name col-sm-2 text-center">
                                        {d.ProductOptions}
                                    </td>
                                    <td class="product-price col-sm-2 text-center">
                                        <span class="amount">{d.SaleCoin}${d.SalePrice}</span>
                                    </td>
                                    <td class="product-quantity col-sm-1 text-center">
                                        <div class="quantity">
                                            {d.Quantity}
                                        </div>
                                    </td>
                                    <td class="product-name col-sm-1 text-center">
                                        {d.Method}
                                    </td>
                                    <td class="product-name col-sm-2 text-center">
                                        {d.TransactionId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MySales);
