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
        this.state = { store: [null], updated: false, products: [null] };
    };
    componentDidUpdate() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => {
                    this.setState({ store: res.data });
                    axios.get(`/api/product/store/${res.data._id}`)
                        .then(prods => this.setState({ products: prods.data }))
                });
            this.setState({ updated: true });
        }

    };
    render() {
        return (
            <section class="shop pt60 pb40">
                <div class="container">
                    <div class="row white-bg">
                        <ul class="col-md-12 container margin row">
                            { this.state.products.map((d, i) => (
                                <li class="product-item col-lg-3 col-md-4 col-sm-6" key={i}>
                                    { d ?
                                        <a href={`/product/${d._id}`}>
                                            <div class="item">
                                                <img src={d.ProductImage} alt="#" />
                                                <h4 class="price"><span class="currency">{d.PriceCoin}$</span>{d.ProductPrice}</h4>
                                                <div class="info hover-bottom">
                                                    <h4>{d.ProductName}</h4>
                                                    <p>Tags:{ d.Tags.map((d, i) => <i> {d} </i> )}</p>
                                                </div>
                                            </div>
                                        </a>
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
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyProducts);
