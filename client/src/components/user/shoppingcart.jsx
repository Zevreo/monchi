import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Converter from '../utilities/converter';
import { Link } from "react-router-dom";

export function ShoppingCart(props) {
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        const { user } = props.auth;
        axios.get(`/api/cart/${user._id}`)
            .then(prod => setProducts(prod.data));
    }, []);
    const { user } = props.auth;
    return (
        <section class="cart pt60 pb60">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 mt40 mb40">
                        <h4 class="bag-summary mb20">Your Items</h4>
                        <table class="shop_table cart" cellspacing="0">
                            <thead>
                                <tr>
                                    <th class="product-thumbnail">Item</th>
                                    <th class="product-name">Description</th>
                                    <th class="product-price">Unit Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Subtotal</th>
                                    <th class="product-remove">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Products.map((d, i) => (
                                    <tr class="cart_item">
                                        <td class="product-thumbnail">
                                            <Link to="#">
                                                <img src={d.ProductImages[0]} alt="#" />
                                            </Link>
                                        </td>
                                        <td class="product-name">
                                            <Link to="#">{d.ProductName}</Link>
                                        </td>
                                        <td class="product-price">
                                            <span class="amount">{user.DefaultCoin}${<Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} />}</span>
                                        </td>
                                        <td class="product-quantity">
                                            <div class="quantity">
                                                <input type="number" step="1" name="cart-qty" value={d.Quantity} class="qty" size="4" />
                                            </div>
                                        </td>
                                        <td class="product-subtotal">
                                            <span class="amount">{user.DefaultCoin}${<Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} Multiplier={d.Quantity} />}</span>
                                        </td>
                                        <td class="product-remove">
                                            <a href="#" class="remove" title="Remove this item">×</a>
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
                                        <td><span class="amount">$131</span></td>
                                    </tr>
                                    <tr class="shipping">
                                        <th>Shipping</th>
                                        <td><p>Free</p></td>
                                    </tr>
                                    <tr class="order-total">
                                        <th>Total</th>
                                        <td><strong><span class="amount">$131</span></strong> </td>
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