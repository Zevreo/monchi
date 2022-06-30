import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Converter from '../converter';
import { Link } from "react-router-dom";
import Loader from '../loader';

export class Allproducts extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = { updated: false, products: [null] };
    };
    componentDidMount() {
        if (this.state.updated === false) {
            axios.get(`/api/product/`)
                .then(prod => {
                    this.setState({ products: prod.data });
                });
            this.setState({ updated: true });
        }
    };
    render() {
        const { user } = this.props.auth;
        return (
            <section class="shop bg-grey-1">
                <div class="container">
                    <div class="row white-bg">
                        <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                            {this.state.products.map((d, i) => (
                                <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
                                    {d ?
                                        <Link to={`/product/${d._id}`}>
                                            <div class="item">
                                                <img src={d.ProductImage} alt="#" class="contain" />
                                                <h4 class="price">
                                                    <span class="currency">{user ? user.DefaultCoin : d.PriceCoin}$</span>
                                                    {user ? <Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} /> : d.ProductPrice}
                                                </h4>
                                                <div class="info hover-bottom">
                                                    <h4>{d.ProductName}</h4>
                                                    <p>Tags:{d.Tags.map((d, i) => <i> {d} </i>)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                        :
                                        <li className="relative col-md-12 center-items"><Loader /></li>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Allproducts);