import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

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
            DefaultCoin: '',
            Updated: false,
            Currency: null
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
    componentDidMount() {
        if (this.state.Updated === false) {
            axios.get('/api/fixed/currency')
                .then(res => {
                    this.setState({Currency: res.data});
                    this.setState({Updated: true});
                });

            axios.get('/api/fixed/country')
                .then(res => {
                    this.setState({Countries: res.data});
                    this.setState({Updated: true});
                }); 
        }

        

    }



    render() {
        return (
            <section id="sign-up" class="bg-grey-1">
                <div class="sign-up-container">
                    <div class="container text-center">
                        <div class="col-md-12">
                            <h3 class="mb5">Cree su cuenta</h3>
                            <p class="subheading">Bienvenido a Monchi</p>
                            <div class="sign-up-form pt30 pb30">
                                <form class="row" onSubmit={this.onSubmit}>
                                    <div class="col-md-6">
                                        <input class="sign-up-first-name bg-white" type="text" placeholder="Nombre" value={this.state.FirstName} onChange={this.onChangeFirstName} required />
                                        <p className="help-block text-danger"></p>
                                        <input class="sign-up-email bg-white" type="text" placeholder="Correo Electrónico" value={this.state.EmailAddress} onChange={this.onChangeEmailAddress} required />
                                        <p className="help-block text-danger"></p>
                                        <input class="bg-white" type="date" placeholder="Fecha de nacimiento" value={this.state.BirthDate} onChange={this.onChangeBirthDate} required />
                                        <p className="help-block text-danger"></p>
                                        <select class="bg-white" type="text" value={this.state.Countries} onChange={this.onChangeCountry} required>
                                        
                                                 { this.state.Updated===true ? this.state.Countries.map((d, i) => (
                                                <option key={i} value={d.CountryName}>{d.countryName}</option>
                                            )) : ''}
                                        
                                                                                
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    
                                    <div class="col-md-6">
                                        <input class="sign-up-last-name bg-white" type="text" placeholder="Apellidos" value={this.state.LastName} onChange={this.onChangeLastName} required />
                                        <p className="help-block text-danger"></p>
                                        <input class="sign-up-password bg-white" type="password" placeholder="Contraseña" value={this.state.Password} onChange={this.onChangePassword} required />
                                        <p className="help-block text-danger"></p>
                                        <input class="bg-white" type="tel" placeholder="Teléfono" value={this.state.PhoneNumber} onChange={this.onChangePhoneNumber} required />
                                        <p className="help-block text-danger"></p>
                                        <select class="bg-white" type="text" placeholder="Moneda" value={this.state.DefaultCoin} onChange={this.onChangeDefaultCoin} required>
                                            <option default disabled value=''>Seleccione su moneda preferida</option>
                                            { this.state.Updated===true ? this.state.Currency.map((d, i) => (
                                                <option key={i} value={d.CodeName}>{d.Name}</option>
                                            )) : ''}
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="actions">
                                        <p class="dark-grey">Al crear una cuenta accedes a nuestros <Link to="#">Terminos de Servicio</Link>.</p>
                                    </div>
                                    <input class="btn btn-sm btn-sign-up" type="submit" value="Registrar" />
                                </form>
                            </div>
                            <p>O <Link to="/login">inicia sesión</Link> usando una cuenta existente</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Registro;