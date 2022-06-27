import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

export class Allproducts extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {updated: false, products: [null] };
        this.Submit = this.Submit.bind(this);
    };
    Submit = (e)=> {
        
        e.preventDefault();
        const { user } = this.props.auth;
        const { token } = this.props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if(token){
            config.headers['x-auth-token'] = token;
        }
        if(user){
            const productCar = {
                UserId: user._id,
                ProductId:e.target.ProductId.value,
                Quantity:1
                
            };
            console.log(productCar);
             axios.post('/api/cart', productCar, config)
            .then(res => console.log(res.data));
        window.location = '/shoppingcart';
        }
    };

    componentDidUpdate() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get(`/api/product/`)
                .then(prod => { this.setState({ products: prod.data });
                });
            this.setState({ updated: true });
        }
    };
    
   

    render() {
        const { user } = this.props.auth;
        return (
            <div class="site-wrapper">
                <section class="shop pt60 pb40">
                <div class="container">
                    <div class="row white-bg">
                        <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                            { this.state.products.map((d, i) => (
                                <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px'}} key={i}>
                                    { d ?
                                        <div>
                                        <a href={`/product/${d._id}`}>
                                            <div class="item">
                                                <img src={d.ProductImage} alt="#" class="contain" />
                                                <h4 class="price"><span class="currency">{d.PriceCoin}$</span>{d.ProductPrice}</h4>
                                                <div class="info hover-bottom">
                                                    <h4>{d.ProductName}</h4>
                                                    <p>Tags:{ d.Tags.map((d, i) => <i> {d} </i> )}</p>
                                                </div>
                                            </div>
                                        </a>
                                            <form onSubmit={this.Submit}>
                                                <input type="hidden" value={user._id}  name="UserId"></input>
                                                <input type="hidden" value={d._id}  name="ProductId"></input>
                                                <input type="submit"  value="Enviar"/>
                                            </form>
                                        </div>
                                        :
                                        ""
                                    }
                                </li>
                            ))}
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
            // <section class="shop pt60 pb40">
            //     <div class="mb60">

            //     </div>
            //     <div class="container">
            //         <div class="row white-bg">
            //             <ul class="col-md-12 container margin row">
            //                 { this.state.products.map((d, i) => (
            //                     <li class="product-item col-lg-3 col-md-4 col-sm-6" key={i}>
            //                         { d ?
            //                             <a href={`/product/${d._id}`}>
            //                                 <div class="item">
            //                                     <img src={d.ProductImage} alt="#" />
            //                                     <h4 class="price"><span class="currency">{d.PriceCoin}$</span>{d.ProductPrice}</h4>
            //                                     <div class="info hover-bottom">
            //                                         <h4>{d.ProductName}</h4>
            //                                         <p>Tags:{ d.Tags.map((d, i) => <i> {d} </i> )}</p>
            //                                     </div>
            //                                 </div>
            //                             </a>
            //                             :
            //                             ""
            //                         }
            //                     </li>
            //                 ))}
            //             </ul>

            //             <div class="col-md-12 text-center">
            //                 <ul class="pagination">
            //                     <li>
            //                         <a href="#" aria-label="Previous">
            //                             <span aria-hidden="true"><i class="ion-ios-arrow-thin-left"></i></span>
            //                         </a>
            //                     </li>
            //                     <li class="active">
            //                         <a href="#">1</a>
            //                     </li>
            //                     <li>
            //                         <a href="#">2</a>
            //                     </li>
            //                     <li>
            //                         <a href="#">3</a>
            //                     </li>
            //                     <li>
            //                         <a href="#">4</a>
            //                     </li>
            //                     <li>
            //                         <a href="#">5</a>
            //                     </li>
            //                     <li>
            //                         <a href="#" aria-label="Next">
            //                             <span aria-hidden="true"><i class="ion-ios-arrow-thin-right"></i></span>
            //                         </a>
            //                     </li>
            //                 </ul>
            //             </div>
            //         </div>
            //     </div>
            // </section>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Allproducts);