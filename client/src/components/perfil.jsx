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
                                    <li class=""><a href="#tab-c2" data-toggle="tab">Domicilios</a></li>
                                    <li class=""><a href="#tab-c3" data-toggle="tab">Pedidos</a></li>
                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade active in" id="tab-c1">
                                        <Informacionperfil></Informacionperfil>
                                    </div>
                                    <div class="tab-pane fade" id="tab-c2">
                                        <a href="/newAddress" class="btn btn-dark btn-lg btn-appear mt20">Agregar</a>
                                        <section class="checkout">
                                            <div class="icon-tabs-centered">
                                                <ul id="iconTabs" class="nav nav-tabs nav-tabs-center">
                                                    <li class="active"><a href="#tab-i1" data-toggle="tab"><span class="icon-tab ion-ios-flask-outline"></span><span>Experiences</span></a></li>
                                                    <li class=""><a href="#tab-i2" data-toggle="tab"><span class="icon-tab ion-ios-bolt-outline"></span><span>Work We Do</span></a></li>
                                                </ul>
                                                <div id="myTabContent" class="tab-content">
                                                    <div class="tab-pane fade active in" id="tab-i1">
                                                        <div class="row text-center ">
                                                            <h3 class="mb20">Sobrenombre (Predeterminado)</h3>
                                                            <label for="exampleFormControlSelect1">Calle</label>
                                                            <input type="text" class="input-text" name="billing_first_name" value="" />
                                                            <div class="half-left col-sm-6">
                                                                <label for="exampleFormControlSelect1">Numero exterior</label>
                                                                <input type="text" class="input-text" name="billing_first_name" value="" />
                                                            </div>
                                                            <div class="half-right col-sm-6">
                                                                <label for="exampleFormControlSelect1">Numero interior</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-left col-sm-6">
                                                                <label for="exampleFormControlSelect1">Codigo postal</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-right col-sm-6">
                                                                <label for="exampleFormControlSelect1">Pais</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-left col-sm-6">
                                                                <label for="exampleFormControlSelect1">Estado</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-right col-sm-6">
                                                                <label for="exampleFormControlSelect1">Ciudad</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <label for="exampleFormControlSelect1">Referencias</label>
                                                            <input type="text" class="input-text" name="billing_first_name" value="" />
                                                        </div>
                                                    </div>

                                                    <div class="tab-pane fade" id="tab-i2">
                                                        <div class="row text-center ">
                                                            <h3 class="mb20">Sobrenombre (Predeterminado)</h3>
                                                            <label for="exampleFormControlSelect1">Calle</label>
                                                            <input type="text" class="input-text" name="billing_first_name" value="" />
                                                            <div class="half-left col-sm-6">
                                                                <label for="exampleFormControlSelect1">Numero exterior</label>
                                                                <input type="text" class="input-text" name="billing_first_name" value="" />
                                                            </div>
                                                            <div class="half-right col-sm-6">
                                                                <label for="exampleFormControlSelect1">Numero interior</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-left col-sm-6">
                                                                <label for="exampleFormControlSelect1">Codigo postal</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-right col-sm-6">
                                                                <label for="exampleFormControlSelect1">Pais</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-left col-sm-6">
                                                                <label for="exampleFormControlSelect1">Estado</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <div class="half-right col-sm-6">
                                                                <label for="exampleFormControlSelect1">Ciudad</label>
                                                                <input type="text" class="input-text" name="billing_last_name" value="" />
                                                            </div>
                                                            <label for="exampleFormControlSelect1">Referencias</label>
                                                            <input type="text" class="input-text" name="billing_first_name" value="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div class="tab-pane fade" id="tab-c3">
                                        <></>
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
