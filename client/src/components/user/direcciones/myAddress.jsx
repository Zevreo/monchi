import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

export function MyAddress(props) {
    const [address, setAddress] = useState();
    const [changed, setChanged] = useState(true);
    const [msg, setMsg] = useState();
    const [count, setCount] = useState();

    function fetchAddress() {
        const { user } = props.auth;
        const { token } = props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user) {
            axios.get(`/api/address/my/${user._id}`, config)
                .then(res => {
                    setAddress(res.data);
                    setChanged(false);
                    setCount(Number(res.headers['x-count']));
                });
        }
    }

    useEffect(() => {
        fetchAddress();
    }, [changed]);

    function SubmitDefault(e) {
        e.preventDefault();
        const { user } = props.auth;
        const UserId = { UserId: user._id };
        const { token } = props.auth;
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
            .then(res => {
                setChanged(true);
                setMsg('Direccion predeterminada cambiada exitosamente');
            });
    }

    function SubmitDelete(e) {
        e.preventDefault();
        const answer = window.confirm("Seguro que deseas borrar esa direccion?");
        if (answer) {
            const { token } = props.auth;
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
                .then(res => {
                    setChanged(true);
                    setMsg('Direccion eliminada exitosamente');
                });
        }
    }

    const Message = (
        <div class="row pt10">
            <div class="col-md-4 col-md-offset-4">
                <div class="alert alert-success fade in">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
                    <i class="ion-android-alert"></i><strong>{msg}</strong>
                </div>
            </div>
        </div>
    )

    return (
        <div class="checkout">
            {msg ? Message : ''}
            <div class="icon-tabs-centered">
                <ul id="iconTabs" class="nav nav-tabs nav-tabs-center">
                    {address
                        ? address.map((d, i) => (
                            <li><a href={`#tab-i${i}`} data-toggle="tab"><span class={d.Default === true ? "icon-tab ion-ios-location" : "icon-tab ion-ios-location-outline"}></span><span>{d.Surname}</span></a></li>
                        )) : "loading"}
                </ul>
                <div id="myTabContent" class="tab-content">
                    {address
                        ? address.map((d, i) => (
                            <div class="tab-pane fade" id={`tab-i${i}`}>
                                <div class="row text-center">
                                    {d.Default === true ? <h3>Predeterminado</h3> :
                                        <form onSubmit={e => SubmitDefault(e)}>
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
                                    {d.Default === false && count > 1 ?
                                        <form onSubmit={e => SubmitDelete(e)}>
                                            <input type="text" class="input-text" value={d._id} name="id" hidden />
                                            <input class="btn btn-lg btn-appear" type="submit" value="Eliminar" />
                                        </form> : ""}
                                </div>
                            </div>
                        )) : "loading"}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyAddress);