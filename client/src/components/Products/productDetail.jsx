import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useParams } from "react-router";

export function ProductDetail(props) {
    let { id } = useParams();
    const [product, setProduct] = useState();
    async function Request() {
        await axios.get(`/api/product/${id}`)
            .then(res => setProduct(res.data));
    }
    useEffect(() => {
        Request();
    }, []);
    return (
        <div class="site-wrapper">
            <section class="shop-product pt100 pb40">
                <div class="container"> 
                    <div class="row">
                        {product ? product.prod.ProductName : ""}
                        <div class="col-sm-5 mt40 mb40">
     
                            <div class="image-slider1 owl-carousel navigation-thin pagination-in">
                                <div><img src={product ? product.prod.ProductImage : "img/shop/1.jpg"} class="img-responsive width100" alt="#"/></div>
                                <div><img src={product ? product.prod.ProductImage : "img/shop/1.jpg"} /></div>
                                <div><img  src={product ? product.prod.ProductImage : "img/shop/1.jpg"} /></div>
                            </div> 
                            
                        </div>  
                        
                        <div class="col-sm-7 mt40 mb40 product-details">
                            
                            <ol class="breadcrumb">

                            <li>{this.state.store ? this.state.store.Name : "loading"}</li>
                                <li >{this.state.tags ? this.tags.Tags : "loading"}</li>
                                <li>{this.state.tags ? this.tags.Tags : "loading"}</li>

                                <li><a href="#">Home</a></li>
                                <li><a href="#">Shirts</a></li>
                                <li class="active">Over Shirt</li>
                            </ol>
                            <h3>{this.state.ProductProperties? this.state.ProductProperties.PropertyName : "loading"}</h3>        
                            <h3>The Over Shirt</h3>
                            <h4 class="price"><span class="currency">$</span>19.99<span class="old-price-single">26.95</span></h4>
                            <p>Short sleeve off white Tshirt made from pure cotton, featuring The Over Co. print on the chest, along with the Over logo label on the right hip side. Regular fit. Short sleeve off white Tshirt made from pure cotton, featuring The Over Co. print on the chest, along with the Over.</p> 
                            
                            <div class="quantity mb20 mt20">
                                <input type="number" step="1" min="1" name="quantity" value="1" title="Qty" class="input-text qty text" size="4"/> 
                            </div>
                            
                            <p class="mb0">Category: <a href="#" class="highlight">Shirts</a></p>
                            <p class="mb0">SKU: 4815162342</p>
                            <p class="mb0">Colors: Black, White</p>
                            <ul class="list-inline mt20"> 
                                <li><a href="#"><i class="fa fa-facebook"></i><span class="share-count">6</span></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i><span class="share-count">8</span></a></li> 
                                <li><a href="#"><i class="fa fa-pinterest"></i><span class="share-count">3</span></a></li> 
                            </ul> 
                            <a href="#" class="btn btn-dark btn-lg btn-appear mt20"><span>Add To Cart <i class="ion-android-arrow-forward"></i></span></a>
                            
                        </div> 
                        
                    </div>
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
                                            <img src="img/shop/2.jpg" alt="#"/>
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
                                            <img src="img/shop/3.jpg" alt="#"/>
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
                                            <img src="img/shop/4.jpg" alt="#"/>
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
                                            <img src="img/shop/5.jpg" alt="#"/>
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
            </div>       
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(ProductDetail);