import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

export class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Updated: false,
            Currency: null
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeDefaultCoin = this.onChangeDefaultCoin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChangeFirstName(e) {
        this.setState({
            FirstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            LastName: e.target.value
        });
    }
    onChangeEmailAddress(e) {
        this.setState({
            EmailAddress: e.target.value
        });
    }
    onChangeBirthDate(e) {
        this.setState({
            BirthDate: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            Country: e.target.value
        });
    }
    onChangePhoneNumber(e) {
        this.setState({
            PhoneNumber: e.target.value
        });
    }
    onChangeDefaultCoin(e) {
        this.setState({
            DefaultCoin: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
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
        const cliente = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            EmailAddress: this.state.EmailAddress,
            BirthDate: this.state.BirthDate,
            Country: this.state.Country,
            PhoneNumber: this.state.PhoneNumber,
            DefaultCoin: this.state.DefaultCoin
        };
        axios.put(`/api/users/${user._id}`, cliente, config)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: 'Enviado',
                    text: 'Se edito la cuenta con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    toast: true,
                    position: "bottom-right",
                    timer: 900
                });
                setTimeout(() => {
                    window.location = "/perfil";
                }, 1000)

            });
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
        if (this.state.Updated === false) {
            axios.get('/api/fixed/currency')
                .then(res => {
                    this.setState({ Currency: res.data });
                    this.setState({ Updated: true });
                });
            axios.get(`/api/users/me/${user._id}`, config)
                .then(res => {
                    this.setState({
                        FirstName: res.data.FirstName,
                        LastName: res.data.LastName,
                        EmailAddress: res.data.EmailAddress,
                        BirthDate: res.data.BirthDate,
                        Country: res.data.Country,
                        PhoneNumber: res.data.PhoneNumber,
                        DefaultCoin: res.data.DefaultCoin
                    })
                });
        }
    }
    render() {
        return (
            <section id="sign-up" class="bg-grey-1">
                <div class="sign-up-container">
                    <div class="container text-center">
                        <div class="col-md-12">
                            <h3 class="mb5">Editar cuenta</h3>
                            <div class="sign-up-form pt30 pb30">
                                <form class="row" onSubmit={this.onSubmit}>
                                    <div class="col-md-6">
                                        <label>Nombre</label>
                                        <input class="sign-up-first-name bg-white" type="text" value={this.state.FirstName} onChange={this.onChangeFirstName} required />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Apellidos</label>
                                        <input class="sign-up-last-name bg-white" type="text" value={this.state.LastName} onChange={this.onChangeLastName} required />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Telefono</label>
                                        <input class="bg-white" type="tel" value={this.state.PhoneNumber} onChange={this.onChangePhoneNumber} required />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Fecha de nacimiento</label>
                                        <input class="bg-white" type="date" value={this.state.BirthDate} onChange={this.onChangeBirthDate} required />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Pais</label>
                                        <select class="bg-white" type="text" value={this.state.Country} onChange={this.onChangeCountry} required>
                                            <option default disabled value=''>Seleccione su pais</option>
                                            <option value='Estados Unidos de América'>Estados Unidos de América</option>
                                            <option value='Europa'>Europa</option>
                                            <option value='Inglaterra'>Inglaterra</option>
                                            <option value='India'>India</option>
                                            <option value='Australia'>Australia</option>
                                            <option value='Canada'>Canada</option>
                                            <option value='Singapur'>Singapur</option>
                                            <option value='Suiza'>Suiza</option>
                                            <option value='Malasia'>Malasia</option>
                                            <option value='Japón'>Japón</option>
                                            <option value='China'>China</option>
                                            <option value='México'>México</option>
                                            <option value='Other'>Otro</option>
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Moneda preferida</label>
                                        <select class="bg-white" type="text" value={this.state.DefaultCoin} onChange={this.onChangeDefaultCoin} required>
                                            <option default disabled value=''>Seleccione su moneda preferida</option>
                                            {this.state.Updated === true ? this.state.Currency.map((d, i) => (
                                                <option key={i} value={d.CodeName}>{d.Name}</option>
                                            )) : ''}
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-12">
                                        <label>Correo electronico</label>
                                        <input class="sign-up-email bg-white" type="text" value={this.state.EmailAddress} onChange={this.onChangeEmailAddress} required />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-12">
                                        <input class="btn btn-sm btn-sign-up" type="submit" value="Enviar" />
                                    </div>
                                </form>
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
export default connect(mapStateToProps, null)(EditUser);