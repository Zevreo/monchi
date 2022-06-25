import React, { Component } from "react";
import axios from 'axios';

export class shoppingcart extends Component {
    
    render() {
        return (
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
                                        <li><a href="/welcome">Home</a></li>
                                        <li><a href="/shoppingcart">Shop</a></li>
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
                                                <img src='/img/shop/1.jpg' alt="#" />
                                                <h4 class="price"><span class="currency">$</span>19.99<span class="old-price">26.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>The Over Shirt</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src='/img/shop/2.jpg' alt="#" />
                                                <h4 class="price"><span class="currency">$</span>13.99<span class="old-price">20.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>Script Sweatshirt</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
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
                                                    <button>Add to cart</button>
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
                                                    <button>Add to cart</button>
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
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="img/shop/6.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>18.99<span class="old-price">23.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>The Deadline</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="img/shop/7.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>14.99<span class="old-price">20.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>Dark Shirt Logo</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="img/shop/8.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>17.99<span class="old-price">29.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>Nowhere T-Shirt</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="img/shop/9.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>12.99<span class="old-price">21.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>Ping Sweatshirt</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="img/shop/10.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>19.99<span class="old-price">26.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>The Loose Scripts</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="img/shop/11.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>13.99<span class="old-price">20.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>Script Sweatshirt</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="shop-item">
                                        <a href="shop-product.html">
                                            <div class="item">
                                                <img src="./img/shop/12.jpg" alt="#" />
                                                <h4 class="price"><span class="currency">$</span>16.99<span class="old-price">22.95</span></h4>
                                                <div class="info hover-bottom">
                                                    <h4>The Arch Sweatshirt</h4>
                                                    <p>View Details</p>
                                                    <button>Add to cart</button>
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
                </div>
            </div>
        )
    }
}
export default shoppingcart;