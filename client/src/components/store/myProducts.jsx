import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

export class MyProducts extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = { store: [null] };
        this.state = { updated: false };
    };
    componentDidUpdate() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => this.setState({ store: res.data[0] }));
            this.setState({ updated: true });
        }
    };
    render() {
        return (
            <section class="shop pt60 pb40">
                <div class="container">
                    <div class="row white-bg">
                        <h2>Mis productos</h2>
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
                                <a href="shop-product.html">
                                    <div class="item">
                                        <img src="img/shop/1.jpg" alt="#"/>
                                            <h4 class="price"><span class="currency">$</span>19.99<span class="old-price">26.95</span></h4>
                                            <div class="info hover-bottom">
                                                <h4>The Over Shirt</h4>
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
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyProducts);
