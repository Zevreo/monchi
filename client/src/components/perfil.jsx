import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Sinacces from "./perfilcomponents/sinacceso";
import Informacionperfil from "./perfilcomponents/informacionperfil";

export class Perfil extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    render() {
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
            <section class="pt90 pb100">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7 mr-auto text-center">
                            <div class="buttons-tabs-centered">
                                <ul id="buttonTabs" class="nav nav-tabs nav-tabs-center">
                                    <li class="active"><a href="#tab-c1" data-toggle="tab">Mi informacion</a></li>
                                    <li class=""><a href="#tab-c2" data-toggle="tab">Domicilio</a></li>
                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade active in" id="tab-c1">
                                        <Informacionperfil></Informacionperfil>
                                    </div>
                                    <div class="tab-pane fade" id="tab-c2">
                                        <section class="checkout">
                                            <div class="">
                                                <div class="row">
                                                    <div class="col-sm-8 col-sm-offset-2 text-center ">
                                                        <h3 class="mb20">Tu Domicilio</h3>
                                                        <label for="exampleFormControlSelect1">Street</label>
                                                        <input type="text" class="input-text" name="billing_first_name" value="" />
                                                        <label for="exampleFormControlSelect1">Suburb</label>
                                                        <input type="text" class="input-text" name="billing_last_name" value="" />
                                                        <div class="half-left col-sm-6">
                                                            <label for="exampleFormControlSelect1">Postal Code</label>
                                                            <input type="text" class="input-text" name="billing_first_name" value="" />
                                                        </div>
                                                        <div class="half-right col-sm-6">
                                                            <label for="exampleFormControlSelect1">Country</label>
                                                            <input type="text" class="input-text" name="billing_last_name" value="" />
                                                        </div>
                                                        <div class="half-left col-sm-6">
                                                            <label for="exampleFormControlSelect1">State</label>
                                                            <input type="text" class="input-text" name="billing_last_name" value="" />
                                                        </div>
                                                        <div class="half-right col-sm-6">
                                                            <label for="exampleFormControlSelect1">References</label>
                                                            <input type="text" class="input-text" name="billing_last_name" value="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
        const guestLinks = (
            <Sinacces></Sinacces>
        )
        return (
            <div>
                {isAuthenticated ? authLinks : null}
                {!isAuthenticated ? guestLinks : null}

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Perfil);
