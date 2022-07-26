import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

export class ViewProduct extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = { store: [null] };
        this.state = { updated: false };
    };
    componentDidUpdate() {
        const id = params.id;
        if (this.state.updated === false) {
            axios.get(`/api/products/${id}`)
                .then(res => this.setState({ product: res.data[0] }));
            this.setState({ updated: true });
        }
    };
    render() {
        return (
            <section class="shop-product pt100 pb40">
            <div class="container"> 
                <div class="row">
                    
                    <div class="col-sm-5 mt40 mb40">
 
                        <div class="image-slider1 owl-carousel navigation-thin pagination-in">
                            <div><img src="img/shop/1.jpg" class="img-responsive width100" alt="#"/></div>
                            <div><img src="img/shop/1.jpg" class="img-responsive width100" alt="#"/></div>
                            <div><img src="img/shop/1.jpg" class="img-responsive width100" alt="#"/></div>
                        </div> 
                        
                    </div>  
                    
                    <div class="col-sm-7 mt40 mb40 product-details">
                        
                        <ol class="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Shirts</a></li>
                            <li class="active">Over Shirt</li>
                        </ol>
                        <h3>this</h3>
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
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(ViewProduct);