import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

export function MyAddress(props) {
    const [address, setAddress] = useState();
    const [changed, setChanged] = useState(true);
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
            .then(() => {
                setChanged(true);
                Swal.fire({
                    title: 'Direccion predeterminada cambiada',
                    icon: 'success',
                    showConfirmButton: false,
                    toast: true,
                    position: "bottom-right",
                    timer: 1500
                });
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
                .then(() => {
                    setChanged(true);
                    Swal.fire({
                        title: 'Direccion eliminada',
                        icon: 'success',
                        showConfirmButton: false,
                        toast: true,
                        position: "bottom-right",
                        timer: 1500
                    });
                });
        }
    }

    return (
        <div class="checkout">
            <div class="icon-tabs-centered">
                <ul id="iconTabs" class="nav nav-tabs nav-tabs-center">
                    {address
                        && address.map((d, i) => (
                            <li><a href={`#tab-i${i}`} data-toggle="tab"><span class={d.Default === true ? "icon-tab ion-ios-location" : "icon-tab ion-ios-location-outline"}></span><span>{d.Surname}</span></a></li>
                        ))}
                </ul>
                <div id="myTabContent" class="tab-content">
                    {address
                        && address.map((d, i) => (
                            <div class="tab-pane fade" id={`tab-i${i}`}>
                                <div class="row text-center">
                                    {d.Default === true ? <h3>Predeterminado</h3> :
                                        <form onSubmit={e => SubmitDefault(e)}>
                                            <input type="text" class="input-text" value={d._id} name="id" hidden />
                                            <input class="btn btn-lg btn-appear" type="submit" value="Volver predeterminado" />
                                        </form>
                                    }
                                    <div class="col-sm-4 mb30">
                                        <span>Sobrenombre: <h4 class="input-text">{d.Surname}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Calle: <h4 class="input-text">{d.Street}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Numero exterior: <h4 class="input-text">{d.ExternalNum}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Numero interior: <h4 class="input-text">{d.InternalNum}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Codigo postal: <h4 class="input-text">{d.Postcode}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Pais: <h4 class="input-text">{d.Country}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Estado: <h4 class="input-text">{d.State}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Ciudad: <h4 class="input-text">{d.City}</h4></span>
                                    </div>
                                    <div class="col-sm-4 mb30">
                                        <span>Referencias: <h4 class="input-text">{d.References}</h4></span>
                                    </div>
                                    {(d.Default === false && count > 1) &&
                                        <form onSubmit={e => SubmitDelete(e)}>
                                            <input type="text" class="input-text" value={d._id} name="id" hidden />
                                            <input class="btn btn-lg btn-appear" type="submit" value="Eliminar" />
                                        </form>}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyAddress);