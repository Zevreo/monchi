import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import Pagination from "../utilities/Pagination";
import { Link } from "react-router-dom";

export function MyOrders(props) {
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState();
    const [Page, setPage] = useState(1);
    const [disable, setDisable] = useState(false);
    const [maxPage, setMax] = useState(1);

    function fetchOrders() {
        const { user } = props.auth;
        const { token } = props.auth;
        const config = {
            headers: {
                "Content-type": "application/json",
                "page": Page
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user) {
            axios.get('/api/order', config)
                .then(res => {
                    setOrders(res.data);
                    setPage(Number(res.headers['x-page']));
                    setCount(Number(res.headers['x-count']));
                    setDisable(false);
                });
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        setMax(Math.ceil(count / 5));
    }, [orders]);

    useEffect(() => {
        fetchOrders();
    }, [Page]);

    let floor = ((5 * (Page - 1)) + 1);
    let ceil = (5 * Page) > count ? count : (5 * Page);

    return (
        <div class="row">
            <div class="col-md-12 text-center mb40">
                <h4 class="mb0">Ordenes</h4>
                <p>Showing {floor} to {ceil} of {count} results</p>
            </div>
            <div class="col-sm-10 col-sm-offset-1 ">
                <div class="panel-group accordion-style3" id="accordion">
                    {orders.map((d, i) => (
                        <div class="panel panel-default" key={i}>
                            <div class="panel-heading">
                                <button class={`panel-title ${i > 0 ? 'collapsed' : ''}`} data-toggle="collapse" data-target={`#collapse${i}`}>
                                    <h4>Order: #{d._id}</h4>
                                    <h5>Total: {d.SaleCoin}${d.SaleTotal}</h5>
                                    Date: { new Intl.DateTimeFormat('es-MX', {dateStyle: 'full', timeStyle: 'short'}).format(new Date(d.createdAt)) }
                                </button>
                            </div>
                            <div id={`collapse${i}`} class={`panel-collapse collapse ${i === 0 ? 'in' : ''}`}>
                                <div class="panel-body">
                                    <h4 class="bag-summary mb20">Your Items</h4>
                                    <table class="shop_table cart table-hover" cellspacing="0">
                                        <thead>
                                            <tr class="row">
                                                <th class="product-thumbnail col-sm-2 text-center">Producto</th>
                                                <th class="product-name col-sm-3 text-center">Nombre</th>
                                                <th class="product-name col-sm-3 text-center">Opciones</th>
                                                <th class="product-price col-sm-2 text-center">Precio</th>
                                                <th class="product-quantity col-sm-2 text-center">Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {d.SaleProducts.map((a, b) => (
                                                <tr class="cart_item row" key={b}>
                                                    <td class="product-thumbnail col-sm-2">
                                                        <Link to={`/product/${a.ProductId}`}>
                                                            <img src={a.ProductImage} alt="#" />
                                                        </Link>
                                                    </td>
                                                    <td class="product-name col-sm-3 text-center">
                                                        <Link to={`/product/${a.ProductId}`}>{a.ProductName}</Link>
                                                    </td>
                                                    <td class="product-name col-sm-3 text-center">
                                                        {a.ProductOptions}
                                                    </td>
                                                    <td class="product-price col-sm-2 text-center">
                                                        <span class="amount">{a.SaleCoin}${a.SalePrice}</span>
                                                    </td>
                                                    <td class="product-quantity col-sm-2 text-center">
                                                        <div class="quantity">
                                                            {a.Quantity}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div class="col-sm-12 text-center">
                <Pagination Page={Page} maxPage={maxPage} disable={disable} setDisable={setDisable} setPage={setPage} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyOrders);