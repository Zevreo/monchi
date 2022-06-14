import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyProducts from './myProducts';

export class MyStore extends Component {
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
            <div>
                <section class="shop-product pt100">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4 mt40 mb40">
                                <div><img src={this.state.store ? this.state.store.StoreImage : "loading"} class="img-responsive width100" alt="#" /></div>
                            </div>
                            <div class="col-sm-8 mt40 mb40 product-details">
                                <h3>{this.state.store ? this.state.store.Name : "loading"}</h3>
                                <h4 >{this.state.store ? this.state.store.Country : "loading"}</h4>
                                <p>{this.state.store ? this.state.store.Description : "loading"}</p>
                                <a href="#" class="btn btn-dark btn-lg btn-appear mt20"><span>Agregar un producto <i class="ion-android-arrow-forward"></i></span></a>
                                <a href="#" class="btn btn-dark btn-lg btn-appear mt20"><span>Ver mis ventas <i class="ion-android-arrow-forward"></i></span></a>
                            </div>
                        </div>
                    </div>
                </section>
                <MyProducts/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyStore);