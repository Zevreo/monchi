import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

export class MyAddress extends Component {
    constructor(props) {
        super(props);
        this.state = { addresses: [], updated: false };
    }
    componentDidMount() {
        const { user } = this.props.auth;
        const { token } = this.props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user && this.state.updated === false) {
            axios.get(`/api/address/my/${user._id}`, config)
                .then(res => this.setState({ addresses: res.data }));
            this.setState({ updated: true });
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const UserId = { UserId: user._id };
        const { token } = this.props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const id = e.target.id.value;
        axios.put(`/api/address/default/${id}`, UserId, config)
            .then(res => console.log(res.data));
        window.location = '/perfil';
    }
    SubmitDelete = (e) => {
        e.preventDefault();
        const answer = window.confirm("are you sure?");
        if (answer) {
            const { token } = this.props.auth;
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            if (token) {
                config.headers['x-auth-token'] = token;
            }
            const id = e.target.id.value;
            axios.delete(`/api/address/${id}`, config)
                .then(res => console.log(res.data));
            window.location = '/perfil';
        }

    }
    render() {
        return (
            <div class="checkout">
                <div class="icon-tabs-centered">
                    <ul id="iconTabs" class="nav nav-tabs nav-tabs-center">
                        {this.state.addresses
                            ? this.state.addresses.map((d, i) => (
                                <li><a href={`#tab-i${i}`} data-toggle="tab"><span class={d.Default === true ? "icon-tab ion-ios-location" : "icon-tab ion-ios-location-outline"}></span><span>{d.Surname}</span></a></li>
                            )) : "loading"}
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        {this.state.addresses
                            ? this.state.addresses.map((d, i) => (
                                <div class="tab-pane fade" id={`tab-i${i}`}>
                                    <div class="row text-center">
                                        {d.Default === true ? <h3>Predeterminado</h3> :
                                            <form onSubmit={this.onSubmit}>
                                                <input type="text" class="input-text" value={d._id} name="id" hidden />
                                                <input class="btn btn-lg btn-appear" type="submit" value="Volver predeterminado" />
                                            </form>
                                        }
                                        <div class="half-left col-sm-6">
                                            <label for="exampleFormControlSelect1">Sobrenombre</label>
                                            <input type="text" class="input-text" value={d.Surname} disabled />
                                        </div>
                                        <div class="half-right col-sm-6">
                                            <label for="exampleFormControlSelect1">Calle</label>
                                            <input type="text" class="input-text" value={d.Street} disabled />
                                        </div>
                                        <div class="half-left col-sm-6">
                                            <label for="exampleFormControlSelect1">Numero exterior</label>
                                            <input type="number" class="input-text" value={d.ExternalNum} disabled />
                                        </div>
                                        <div class="half-right col-sm-6">
                                            <label for="exampleFormControlSelect1">Numero interior</label>
                                            <input type="number" class="input-text" value={d.InternalNum} disabled />
                                        </div>
                                        <div class="half-left col-sm-6">
                                            <label for="exampleFormControlSelect1">Codigo postal</label>
                                            <input type="number" class="input-text" value={d.Postcode} disabled />
                                        </div>
                                        <div class="half-right col-sm-6">
                                            <label for="exampleFormControlSelect1">Pais</label>
                                            <input type="text" class="input-text" value={d.Country} disabled />
                                        </div>
                                        <div class="half-left col-sm-6">
                                            <label for="exampleFormControlSelect1">Estado</label>
                                            <input type="text" class="input-text" value={d.State} disabled />
                                        </div>
                                        <div class="half-right col-sm-6">
                                            <label for="exampleFormControlSelect1">Ciudad</label>
                                            <input type="text" class="input-text" value={d.City} disabled />
                                        </div>
                                        <div class="col-sm-12">
                                            <label for="exampleFormControlSelect1">Referencias</label>
                                            <textarea type="text" class="input-text" value={d.References} disabled />
                                        </div>
                                        {d.Default === true ? "" : <form onSubmit={this.SubmitDelete}>
                                            <input type="text" class="input-text" value={d._id} name="id" hidden />
                                            <input class="btn btn-lg btn-appear" type="submit" value="Eliminar" />
                                        </form>}
                                    </div>
                                </div>
                            )) : "loading"}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyAddress);