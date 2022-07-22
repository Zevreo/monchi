import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2';

export function ChangeForgotPassword(props) {
    let navigate = useNavigate();
    let { token } = useParams();
    const [Password, setPassword] = useState();

    async function Submit(e) {
        e.preventDefault();
        console.log(token);
        const body = {
            newPassword: Password
        }
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        await axios.patch('/api/users/password', body, config)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: `Se cambio la contraseña`
                });
                navigate('/login');
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
                                <input class="sign-up-email bg-white" type="text" placeholder="Nueva contraseña" value={Password} onChange={e => setPassword(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <input class="btn btn-primary btn-fullwidth" type="submit" value="Cambiar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeForgotPassword;