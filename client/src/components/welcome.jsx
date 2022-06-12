import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
export class Welcome extends Component{
    
    render() {
        
        return(
            <div>
        <section class="page-hero">
            <div class="page-hero-parallax">
                
                <div class="hero-image bg-shop">
                     
                    <div class="hero-container container pt50">  
                        <div class="hero-content text-left scroll-opacity"> 
                            <div class="section-heading">
                                <h1 class="white mb10">Shop</h1>
                                <h5 class="white pl5">Save Up To 70% Off Sale</h5>  
                            </div>  
                            <ol class="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Shop</a></li>
                                <li class="active">4 Columns</li>
                            </ol>
                        </div> 
                    </div> 
                    
                </div> 
                
            </div>
        </section>
            
        
        <div class="site-wrapper">
            
       
            <section class="shop pt60 pb40">
                <div class="container">
                    <div class="row white-bg">   
    
                        <p class="shop-result-count">Showing 1–12 of 23 results</p>
                        <select class="shop-sorting">
                            <option value=".popular">Sort by Popularity</option>
                            <option value=".rating">Sort by Rating</option>
                            <option value=".price-low">Sort by Price - Low</option>
                            <option value=".price-high">Sort by Price - High</option>
                            <option value=".newest">Sort by Newest</option>        
                        </select>     

                        <ul class="shop-items portfolioContainer columns-4 margin">
                            
                            <li class="shop-item">
                                <a href="#">
                                    <div class="item">
                                        <img src='/img/shop/1.jpg' alt="#"/>
                                        <h4 class="price"><span class="currency">$</span>19.99<span class="old-price">26.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>The Over Shirt</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li>  
                            
                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src='/img/shop/2.jpg' alt="#"/>
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
                            
                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/6.jpg" alt="#"/>
                                        <h4 class="price"><span class="currency">$</span>18.99<span class="old-price">23.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>The Deadline</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li> 
                            
                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/7.jpg" alt="#"/>
                                        <h4 class="price"><span class="currency">$</span>14.99<span class="old-price">20.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>Dark Shirt Logo</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li> 
                            
                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/8.jpg" alt="#"/>
                                        <h4 class="price"><span class="currency">$</span>17.99<span class="old-price">29.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>Nowhere T-Shirt</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li> 
                            
                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/9.jpg" alt="#"/>
                                        <h4 class="price"><span class="currency">$</span>12.99<span class="old-price">21.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>Ping Sweatshirt</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li> 

                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/10.jpg" alt="#"/>
                                        <h4 class="price"><span class="currency">$</span>19.99<span class="old-price">26.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>The Loose Scripts</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li>  
                            
                            <li class="shop-item">
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/11.jpg" alt="#"/>
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
                                        <img src="./img/shop/12.jpg" alt="#"/> 
                                        <h4 class="price"><span class="currency">$</span>16.99<span class="old-price">22.95</span></h4>
                                        <div class="info hover-bottom"> 
                                            <h4>The Arch Sweatshirt</h4>
                                            <p>View Details</p>  
                                        </div>
                                    </div>
                                </a>
                            </li> 
                            
                        </ul>
                    
                      
                        <div class="col-md-12 text-center"> 
                            <ul class="pagination">
                                <li>
                                    <a href="#" aria-label="Previous">
                                        <span aria-hidden="true"><i class="ion-ios-arrow-thin-left"></i></span>
                                    </a>
                                </li>
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">4</a>
                                </li>
                                <li>
                                    <a href="#">5</a>
                                </li>
                                <li>
                                    <a href="#" aria-label="Next">
                                        <span aria-hidden="true"><i class="ion-ios-arrow-thin-right"></i></span>
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
        </div>
        )
    }
}

export default Welcome;