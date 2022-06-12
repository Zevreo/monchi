import React, { Component } from "react";
import axios from 'axios';

export class Registro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FirstName: '',
            LastName: '',
            EmailAddress: '',
            BirthDate: '',
            Password: '',
            Country: '',
            PhoneNumber: '',
            DefaultCoin: ''
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
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
    onChangePassword(e) {
        this.setState({
            Password: e.target.value
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
        const cliente = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            EmailAddress: this.state.EmailAddress,
            BirthDate: this.state.BirthDate,
            Password: this.state.Password,
            Country: this.state.Country,
            PhoneNumber: this.state.PhoneNumber,
            DefaultCoin: this.state.DefaultCoin
        };
        console.log(cliente);
        axios.post('/api/users', cliente)
            .then(res => console.log(res.data));
        window.location = '/login';
    }
    render() {
        return (
            <section id="sign-up" class="bg-grey-1">
                <div class="sign-up-container">
                    <div class="container text-center ">
                        <div class="mb5">

                        </div>
                        <div class="col-md-12 ">
                            <h3 class="">Create your account</h3>
                            <p class="subheading">Welcome to Purefive</p>
                            <div class="login-form pt30 pb30">
                                <form onSubmit={this.onSubmit}>
                                    <input class="sign-up-first-name bg-white" type="text" placeholder="Nombre" value={this.state.FirstName} onChange={this.onChangeFirstName} required />
                                    <p className="help-block text-danger"></p>
                                    <input class="sign-up-last-name bg-white" type="text" placeholder="Apellidos" value={this.state.LastName} onChange={this.onChangeLastName} required />
                                    <p className="help-block text-danger"></p>
                                    <input class="sign-up-email bg-white" type="text" placeholder="Correo Electrónico" value={this.state.EmailAddress} onChange={this.onChangeEmailAddress} required />
                                    <p className="help-block text-danger"></p>
                                    <input class="sign-up-password bg-white" type="password" placeholder="Contraseña" value={this.state.Password} onChange={this.onChangePassword} required />
                                    <p className="help-block text-danger"></p>
                                    <input class="bg-white" type="date" placeholder="Fecha de nacimiento" value={this.state.BirthDate} onChange={this.onChangeBirthDate} required />
                                    <p className="help-block text-danger"></p>
                                    <input class="bg-white" type="tel" placeholder="Teléfono" value={this.state.PhoneNumber} onChange={this.onChangePhoneNumber} required />
                                    <p className="help-block text-danger"></p>
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
                                    <select class="bg-white" type="text" placeholder="Moneda" value={this.state.DefaultCoin} onChange={this.onChangeDefaultCoin} required>
                                        <option default disabled value=''>Seleccione su moneda preferida</option>
                                        <option value='USD'>Dólar estadounidense</option>
                                        <option value='EUR'>Euro</option>
                                        <option value='GBP'>Libra esterlina</option>
                                        <option value='INR'>Rupia</option>
                                        <option value='AUD'>Dólar australiano</option>
                                        <option value='CAD'>Dólar canadiense</option>
                                        <option value='SGD'>Dólar de Singapur</option>
                                        <option value='CHF'>Franco suizo</option>
                                        <option value='MYR'>Ringgit</option>
                                        <option value='JPY'>Yen</option>
                                        <option value='CNY'>Yuan</option>
                                        <option value='MNX'>Peso mexicano</option>
                                    </select>
                                    <p className="help-block text-danger"></p>
                                    <div class="actions">
                                        <p class="dark-grey">By creating an account, you agree to the <a href="#">Terms of Service</a>.</p>
                                    </div>
                                    <input class="btn btn-sm btn-sign-up" type="submit" value="Registrar" />
                                </form>
                            </div>
                            <p>Or <a href="#">login</a> usign an existing account</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Registro;