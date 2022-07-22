import React, { useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export function ChangeCredentials(props) {
    let navigate = useNavigate();
    const { user, token } = props.auth;
    const [Password, setPassword] = useState();
    const [Email, setEmail] = useState(user.EmailAddress);

    async function Submit(e) {
        e.preventDefault();
        console.log(token);
        const body = {
            newPassword: Password,
            newEmail: Email
        }
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        await axios.patch(`/api/users/credentials/${user._id}`, body, config)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: `Se cambiaron las credenciales`
                });
                setTimeout(() => {
                    props.logout();
                    navigate('/login');
                }, 1000)
            });
    };

    return (
        <section id="sign-up" class="bg-grey-1">
            <div class="sign-up-container">
                <div class="container text-center">
                    <div class="col-md-12">
                        <h3 class="mb5">Cambia tus credenciales de inicio de sesión</h3>
                        <div class="sign-up-form pt30 pb30">
                            <form class="row" onSubmit={Submit}>
                                <label>Contraseña:</label>
                                <input class="sign-up-email bg-white" type="password" placeholder="Nueva contraseña" value={Password} onChange={e => setPassword(e.target.value)} required />
                                <p className="help-block text-danger"></p>
                                <label>Correo electrónico:</label>
                                <input class="sign-up-email bg-white" type="text" placeholder="Nueva contraseña" value={Email} onChange={e => setEmail(e.target.value)} required />
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    logout: PropTypes.func.isRequired
});
export default connect(mapStateToProps, {logout})(ChangeCredentials);