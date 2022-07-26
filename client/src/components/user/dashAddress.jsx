import React, { Component } from "react";
import { connect } from 'react-redux';
import Perfil from "./perfil";
import MyAddress from "./direcciones/myAddress";
import MyOrders from "./ordenes";
import { Link } from "react-router-dom";

export class DashAddress extends Component {
    render() {
        return (
            <section class="bg-grey-1">
                <div class="login-container">
                    <div class="row">
                        <div class="col-md-7 mr-auto text-center">
                            <div class="buttons-tabs-centered">
                                <ul id="buttonTabs" class="nav nav-tabs nav-tabs-center">
                                    <li class=""><a href="#tab-c1" data-toggle="tab">Mi informacion</a></li>
                                    <li class="active"><a href="#tab-c2" data-toggle="tab">Domicilios</a></li>
                                    <li class=""><a href="#tab-c3" data-toggle="tab">Pedidos</a></li>
                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade" id="tab-c1">
                                        <Perfil/>
                                    </div>
                                    <div class="tab-pane fade active in" id="tab-c2">
                                        <Link to="/newAddress" class="btn btn-dark btn-lg btn-appear mt20">Agregar</Link>
                                        <MyAddress/>
                                    </div>
                                    <div class="tab-pane fade " id="tab-c3">
                                        <MyOrders/>
                                    </div>
                                </div>
                            </div>
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
export default connect(mapStateToProps, null)(DashAddress);
