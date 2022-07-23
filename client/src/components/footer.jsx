import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

export class Footer extends Component {
    constructor(props){
        super(props);
        this.state = { email: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const body = { Email: this.state.email };
        axios.post('/api/auth/spam', body)
            .then(() => {
                Swal.fire({
                    title: 'Enviado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 900,
                    text: `Spam enviado exitosamente a: ${this.state.email}`
                });
                this.setState({email: '' });
            });
    }
    onChangeEmail(e) {
        this.setState({email: e.target.value })
    }
    render() {
        return (
            <div>
                <footer id="footer-1" class="pt60 pb50">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <h4>Acerca de Monchi</h4>
                                <p>Somos una empresa con el unico objetivo de acercar comercios internacionales a nuestros clientes.</p>
                                <p><a href="https://www.youtube.com/watch?v=xm3YgoEiEDc" target="_blank">© 2022 UTC · </a>Hecho con el <i class="ion-heart highlight"></i> para ti.</p>
                            </div>
                            <div class="col-md-4">
                                <h4>Siguenos en redes</h4>
                                <ul class="footer-1-social">
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                                    <li><a href="#"><i class="fa fa-reddit"></i></a></li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <div class="subscription">
                                    <h4>Newsletter</h4>
                                    <form onSubmit={this.onSubmit} role="form">
                                        <div class="form-validation alert"></div>
                                        <div class="form-group subscribe-form-input">
                                            <input type="email" value={this.state.email} onChange={this.onChangeEmail} class="footer-subscribe-input" placeholder="Ingrese su correo para suscribirse *" autocomplete="off" />
                                        </div>
                                    </form>
                                    <p class="subscribe-info"><i class="ion-information-circled"></i> Rico spam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <a id="back-to-top"><i class="icon ion-chevron-up"></i></a>
            </div>
        )
    }
}

export default Footer;