import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyProducts from './myProducts';
import { Link } from "react-router-dom";

export class MyStore extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = { store: [null] };
        this.state = { updated: false };
    };
    componentDidMount() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => this.setState({ store: res.data }));
            this.setState({ updated: true });
        }
    };
    componentDidUpdate() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => this.setState({ store: res.data }));
            this.setState({ updated: true });
        }
    };
    render() {
        return (
            <div>
                <section class="shop-product bg-grey-1">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4 mt40 mb40">
                                <div><img src={ this.state.store ? `${this.state.store.StoreImage}` : "/613b38eaa594d30013a82b27.png" } class="img-responsive width100" alt="Imagen de tienda" /></div>
                            </div>
                            <div class="col-sm-8 mt40 mb40 product-details">
                                <h3>{this.state.store ? this.state.store.Name : "loading"}</h3>
                                <h4 >{this.state.store ? this.state.store.Country : "loading"}</h4>
                                <p>{this.state.store ? this.state.store.Description : "loading"}</p>
                                <Link to="/createProduct" class="btn btn-dark btn-lg btn-appear mt20"><span>Agregar un producto <i class="ion-android-arrow-forward"></i></span></Link>
                                <Link to="#" class="btn btn-dark btn-lg btn-appear mt20"><span>Ver mis ventas <i class="ion-android-arrow-forward"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </section>
                { this.state.store ? <MyProducts Store={this.state.store}/> : "loading" }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyStore);