import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

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
            this.setState( {updated: true } );
        }
    };
    render() {
        return (
            <section class="checkout">
                <div class="row">
                    <div class="col-sm-8 col-sm-offset-2 text-center ">
                        <h3 class="mb20">Tu informacion</h3>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">FirsName</label>
                            <input type="text" class="input-text" name="billing_first_name" value={ this.state.store ? this.state.store.Name : "loading" } />
                        </div>
                        <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">Pais</label>
                            <input type="text" class="input-text" name="billing_last_name" value={ this.state.store ? this.state.store.Country : "loading"} />
                        </div>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Descripcion</label>
                            <input type="text" class="input-text" name="billing_last_name" value={ this.state.store ? this.state.store.Description : "loading"} />
                        </div>
                        <div class="half-right col-sm-6">
                            <img src={ this.state.store ? this.state.store.StoreImage : "loading"} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyStore);