import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../utilities/loader';
import { Link } from "react-router-dom";
import Converter from "../utilities/converter";

export function SingleProduct(props) {
    const { user } = props.auth;
    const[search, setSearch] = useState(null);

    let { id } = useParams();
    const [product, setProduct] = useState()

    function GetSingleProduct() {
        axios.get(`/api/product/${id}`)
            .then(prod => setProduct(prod.data));
    };

    
    useEffect(() => {
        GetSingleProduct();
    }, []);

    return (
        
        <div class="site-wrapper">

            <section class="shop-product pt10 pb40">
            <div class="container">
                    {product ?
                        <div class="row">
                            <div class="col-sm-5 mt40 mb40">
                                <div class=" navigation-thin ">
                                    <div>{product ? <img src={product.ProductImage} class="img-responsive width100" alt="#" /> : <Loader />}</div>
                                </div>
                            </div>
                            <div class="col-sm-7 mt40 mb40 product-details">
                                <ol class="breadcrumb">
                                {product.Tags.map((d, i) => <Link to={`/results/search=${d}`}> {d} / </Link>)}

                                </ol>
                                <h3>{product ? product.ProductName : "loading..."}</h3>
                                <h4 class="price"><span class="currency">{user ? user.DefaultCoin: product.PriceCoin}</span>${user ? <Converter Current={product.PriceCoin}
                                    Value={product.ProductPrice} Target={user.DefaultCoin} /> : product.ProductPrice}</h4>
                                <p>{product ? product.ProductDescription : "loading..."}</p>
                                <div class="quantity mb20 mt20">
                                    <input type="number" step="1" min="1" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" />
                                </div>
                               
                                <a href="#" class="btn btn-dark btn-lg btn-appear mt20"><span>Add To Cart <i class="ion-android-arrow-forward"></i></span></a>
                            </div>
                        </div>
                        : <Loader />}
                </div>
            </section>

            <section class="pb40">
                <div class="container">
                    <div class="row white-bg">

                        <div class="col-md-12 section-heading">
                            <h5>You May Also Like</h5>
                            <h3>Related Products</h3>
                        </div>

                        <div class="pt80 pb20">

                            <ul class="shop-items portfolioContainer columns-4 margin">

                                <li class="shop-item">
                                    <a href="shop-product.html">
                                        <div class="item">
                                            <img src="img/shop/2.jpg" alt="#" />
                                            <h4 class="price"><span class="currency">$</span>13.99<span class="old-price">20.95</span></h4>
                                            <div class="info hover-bottom">
                                                <h4>Script Sweatshirt</h4>
                                                <p>View Details</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                                <li class="shop-item">
                                    <a href="shop-product.html">
                                        <div class="item">
                                            <img src="img/shop/3.jpg" alt="#" />
                                            <h4 class="price"><span class="currency">$</span>16.99<span class="old-price">22.95</span></h4>
                                            <div class="info hover-bottom">
                                                <h4>Splatter Tank Top</h4>
                                                <p>View Details</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                                <li class="shop-item">
                                    <a href="shop-product.html">
                                        <div class="item">
                                            <img src="img/shop/4.jpg" alt="#" />
                                            <h4 class="price"><span class="currency">$</span>12.99<span class="old-price">25.95</span></h4>
                                            <div class="info hover-bottom">
                                                <h4>Consume T-Shirt</h4>
                                                <p>View Details</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                                <li class="shop-item">
                                    <a href="shop-product.html">
                                        <div class="item">
                                            <img src="img/shop/5.jpg" alt="#" />
                                            <h4 class="price"><span class="currency">$</span>15.99<span class="old-price">27.95</span></h4>
                                            <div class="info hover-bottom">
                                                <h4>Script Tank Top</h4>
                                                <p>View Details</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                            </ul>

                        </div>

                    </div>
                </div>
            </section>

            <a id="back-to-top"><i class="icon ion-chevron-up"></i></a>


        </div>
    )



}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(SingleProduct);