import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';


export class shoppingcart extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = { updated: false, products: [null] };
    };
    componentDidUpdate() {
        const{user} = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get(`/api/cart/${user._id}`)
                .then(prod => {
                    this.setState({ products: prod.data });
                });
            this.setState({ updated: true });
        }
    };
    
    render() {
        const{user} = this.props.auth;
        return (
            <div>
                <section class="page-hero">
                    <div class="page-hero-parallax">
                        <div class="hero-image bg-shop">
                            <div class="hero-container container pt50">
                                <div class="hero-content text-left scroll-opacity">
                                    <div class="section-heading">
                                        <h1 class="white mb10">Carrito de compras</h1>
                                        <h5 class="white pl5">Save Up To 70% Off Sale</h5>
                                    </div>
                                    <ol class="breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/shoppingcart">Shop</a></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> 
                <section class="cart pt60 pb60" class="sopas">
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
                            <th class="product-subtotal">Descuento</th>
                            <th class="product-remove">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((d, i) =>(
                            <div key={i}>
                            {d ?
                            <tr class="cart_item">
                            <td class="product-thumbnail">
                                <a href="#">
                                    <img src={d.ProductImage} alt="#"/>
                                </a> 
                                <a href="#"></a>
                            </td>
                            <td class="product-name">
                                <a href="#" >{d.ProductName}</a> 
                            </td>
                            <td class="product-price">
                                <span class="amount">{user ? user.DefaultCoin : d.PriceCoin}$</span> 
                            </td>
                            <td class="product-quantity">
                                <div class="quantity">
                                    <input type="number" step="1" name="cart-qty" value="1" class="qty" size="4"/> 
                                </div>
                            </td>
                            <td class="product-subtotal">
                                <span class="amount">$99</span> 
                            </td>
                            <td class="product-remove">
                                <a href="#" class="remove" title="Remove this item">×</a> 
                            </td>
                            </tr>
                                :
                                ""
                            }
                            </div>
                        ))}
                    </tbody>

                    </table>
                    <form class="coupon mb-xs-24"/>
                                <h5>Add a coupon code:</h5>
                                <input class="coupon-code" type="text" placeholder="Coupon Code"/>
                                <input class="apply-btn btn-dark" type="submit" value="Apply"/>
                    <form/>
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
                            <a href="/" class="highlight mt20">Continue Shopping</a>
                        </div>
                        
                    </div>
                </div>
                </section>
                
            </div>    
        )
    } 
};

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(shoppingcart);