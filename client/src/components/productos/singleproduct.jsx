import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../loader';
import { Link } from "react-router-dom";

export function SingleProduct(props){
    let {product} =useParams();
    const[singleproduct,setsingleproduct]=useState([null]);
    const[Product,setProduct] =useState([product])

    function GetSingleProduct(){
        axios.get(`/api/product/${Product}`)
        .then(sprod => setsingleproduct(sprod.data));
    };

    useEffect(()=>{
        GetSingleProduct();
    },[Product]);

    return(
<div class="site-wrapper">
            
            <section class="shop-product pt100 pb40">
                <div class="container"> 
                    {singleproduct.map((d,i) =>(
                        <div class="row">
                        
                        <div class="col-sm-5 mt40 mb40">
     
                            <div class=" navigation-thin ">
                                <div><img src="" class="img-responsive width100" alt="#"/></div>
                            </div> 
                            
                        </div>  
                        
                        <div class="col-sm-7 mt40 mb40 product-details">
                            
                            <ol class="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Shirts</a></li>
                                <li class="active">Over Shirt</li>
                            </ol>
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
                    ))}
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
            <footer id="footer-1" class="pt60 pb50">
                <div class="container">
                    <div class="row">
                    
                        <div class="col-md-4">
                            <h4>About Purefive</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie, tellus id pellentesque feugiat, sem sem cursus orci, a placerat ante ante nec massa.</p>
                            <p><a href="http://themeforest.net/user/vossendesign/portfolio" target="_blank">© 2015 Purefive · </a>Made with <i class="ion-heart highlight"></i> for great people.</p>
                        </div>

                        <div class="col-md-4"> 
                            <h4>Follow us</h4>
                            <ul class="footer-1-social">
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-behance"></i></a></li>
                                <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                                <li><a href="#"><i class="fa fa-flickr"></i></a></li>
                                <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa fa-google-plus-square"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li> 
                                <li><a href="#"><i class="fa fa-dropbox"></i></a></li>
                                <li><a href="#"><i class="fa fa-pinterest-p"></i></a></li>
                                <li><a href="#"><i class="fa fa-tumblr-square"></i></a></li>
                                <li><a href="#"><i class="fa fa-youtube"></i></a></li> 
                                <li><a href="#"><i class="fa fa-vk"></i></a></li>
                                <li><a href="#"><i class="fa fa-vine"></i></a></li>
                                <li><a href="#"><i class="fa fa-spotify"></i></a></li>
                                <li><a href="#"><i class="fa fa-skype"></i></a></li> 
                                <li><a href="#"><i class="fa fa-reddit"></i></a></li>
                                <li><a href="#"><i class="fa fa-tripadvisor"></i></a></li> 
                            </ul>
                        </div>   
                         
                        <div class="col-md-4">
                            <div class="subscription">
                                <h4>Newsletter</h4> 
                                    
                                <form action="php/subscribe-mailchimp.php" method="post" id="subscribe-form" role="form">
                                    <div class="form-validation alert"></div>
                                    <div class="form-group subscribe-form-input">
                                        <input type="email" name="email" id="subscribe-form-email" class="footer-subscribe-input" placeholder="Enter your email to subscribe *" autocomplete="off" />   
                                    </div>
                                </form>
                                <p class="subscribe-info"><i class="ion-information-circled"></i> We will never send you spam or share your email with third parties</p>
                                    
                            </div>
                        </div>  
                        
                    </div>
                </div>  
                
			</footer>

            <a id="back-to-top"><i class="icon ion-chevron-up"></i></a>

            
        </div>
    )



}


export default SingleProduct;