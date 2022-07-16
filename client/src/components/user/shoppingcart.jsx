import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { Converter, ConverterMultiply } from '../utilities/converter';
import { Link } from "react-router-dom";

export function ShoppingCart(props) {
    const { user } = props.auth;
    const [Products, setProducts] = useState([]);
    const [Total, setTotal] = useState(0);

    useEffect(() => {
        GetCart();
    }, []);

    function GetCart() {
        axios.get(`/api/cart/${user._id}`)
            .then(prod => setProducts(prod.data));
    }

    async function QtyChange(cart, qty) {
        let body = { Quantity: qty }
        axios.patch(`/api/cart/quantity/${cart}`, body)
            .then(() => GetCart())
    }

    function RemoveItem(cart) {
        axios.delete(`/api/cart/${cart}`)
            .then(() => GetCart());
    }

    useEffect(() => {
        CalcTotal();
    }, [Products]);

    async function CalcTotal() {
        let conv = 0;
        let Subtotal = 0;
        setTotal(0);
        for (var prod of Products) {
            conv = await ConverterMultiply(prod.PriceCoin, user.DefaultCoin, prod.ProductPrice, prod.Quantity);
            Subtotal = Subtotal + conv;
        }
        setTotal(Subtotal);
    }

    return (
        <section class="cart pt60 pb60">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 mt40 mb40">
                        <h4 class="bag-summary mb20">Your Items</h4>
                        <table class="shop_table cart" cellspacing="0">
                            <thead>
                                <tr>
                                    <th class="product-thumbnail">Producto</th>
                                    <th class="product-name pr10">Nombre</th>
                                    <th class="product-name pr10">Opciones</th>
                                    <th class="product-price pr10">Precio</th>
                                    <th class="product-quantity">Cantidad</th>
                                    <th class="product-subtotal">Subtotal</th>
                                    <th class="product-remove">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Products.map((d, i) => (
                                    <tr class="cart_item">
                                        <td class="product-thumbnail">
                                            <Link to={`/product/${d.ProductId}`}>
                                                <img src={d.ProductImages[0]} alt="#" />
                                            </Link>
                                        </td>
                                        <td class="product-name pr10">
                                            <Link to={`/product/${d.ProductId}`}>{d.ProductName}</Link>
                                        </td>
                                        <td class="product-name pr10">
                                            {d.CartOptions}
                                        </td>
                                        <td class="product-price pr10">
                                            <span class="amount">{user.DefaultCoin}${<Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} />}</span>
                                        </td>
                                        <td class="product-quantity">
                                            <div class="quantity">
                                                <input type="number" step="1" min="1" title="Qty" class="input-text qty text" size="4" name="cart-qty" value={d.Quantity} onChange={e => QtyChange(d.CartId, e.target.value)} />
                                            </div>
                                        </td>
                                        <td class="product-subtotal">
                                            <span class="amount">{user.DefaultCoin}${<Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} Multiplier={d.Quantity} />}</span>
                                        </td>
                                        <td class="product-remove">
                                            <button type="button" onClick={e => RemoveItem(d.CartId)} class="remove btn shadow-none" title="Remove this item">×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-sm-3 mt40 mb40">
                        <h4 class="bag-totals mb20">Cart Totals</h4>
                        <div class="cart_totals">
                            <table cellspacing="0">
                                <tbody>
                                    <tr class="cart-subtotal">
                                        <th>Subtotal</th>
                                        <td><span class="amount">{user.DefaultCoin}${Total}</span></td>
                                    </tr>
                                    <tr class="shipping">
                                        <th>Shipping</th>
                                        <td><p>Free</p></td>
                                    </tr>
                                    <tr class="order-total">
                                        <th>Total</th>
                                        <td><strong><span class="amount">{user.DefaultCoin}${Total}</span></strong> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="wc-proceed-to-checkout">
                                <a href="#" class="btn btn-primary btn-md btn-appear"><span>Cheeckout <i class="ion-bag"></i></span></a>
                            </div>
                        </div>
                        <a href="shop-4columns.html" class="highlight mt20">Continue Shopping</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(ShoppingCart);