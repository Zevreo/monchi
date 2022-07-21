import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

export function SendForgotPassword(props) {
    let navigate = useNavigate();
    const [EmailAddress, setEmailAddress] = useState();

    async function Submit(e) {
        e.preventDefault();
        const body = {
            EmailAddress: EmailAddress
        }
        await axios.post('/api/auth/forgot', body)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Correo enviado',
                    text: `Se envio el correo a ${EmailAddress}`
                });
            });
    };

    return (
        <section id="sign-up" class="bg-grey-1">
            <div class="sign-up-container">
                <div class="container text-center">
                    <div class="col-md-12">
                        <h3 class="mb5">Olvidaste tu contraseña</h3>
                        <p class="subheading">Recibe un enlace en tu correo electronico</p>
                        <div class="sign-up-form pt30 pb30">
                            <form class="row" onSubmit={Submit}>
                                <input class="sign-up-email bg-white" type="text" placeholder="Correo Electrónico" value={EmailAddress} onChange={e => setEmailAddress(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <input class="btn btn-primary btn-fullwidth" type="submit" value="Enviar correo" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(SendForgotPassword);