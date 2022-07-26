import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2';

export function ConfirmMail(props) {
    let navigate = useNavigate();
    let { token } = useParams();

    useEffect(() => {
        console.log(token);
        const body = {
            Nada: "xd"
        }
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        axios.patch('/api/users/confirmEmail', body, config)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: `Se activo su cuenta`
                });
                navigate('/login');
            });
    }, [])

    return (
        <section id="sign-up" class="bg-grey-1">
            <div class="sign-up-container">
                <div class="container text-center">
                    <div class="col-md-12">
                        <h3 class="mb5">Confirmando su correo</h3>
                        <p class="subheading">Porfavor espere un momento</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmMail;