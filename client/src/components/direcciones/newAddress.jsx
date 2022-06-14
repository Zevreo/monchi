import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class NewAddress extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            Street: '',
            ExternalNum: '',
            InternalNum: '',
            Country: '',
            State: '',
            City: '',
            Postcode: '',
            References: '',
            Surname: ''
        }
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeExternalNum = this.onChangeExternalNum.bind(this);
        this.onChangeInternalNum = this.onChangeInternalNum.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangePostcode = this.onChangePostcode.bind(this);
        this.onChangeReferences = this.onChangeReferences.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
    }
    onChangeStreet(e) {
        this.setState({
            Street: e.target.value
        });
    }
    onChangeExternalNum(e) {
        this.setState({
            ExternalNum: parseInt(e.target.value)
        });
    }
    onChangeInternalNum(e) {
        this.setState({
            InternalNum: parseInt(e.target.value)
        });
    }
    onChangeCountry(e) {
        this.setState({
            Country: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            State: e.target.value
        });
    }
    onChangeCity(e) {
        this.setState({
            City: e.target.value
        });
    }
    onChangePostcode(e) {
        this.setState({
            Postcode: parseInt(e.target.value)
        });
    }
    onChangeReferences(e) {
        this.setState({
            References: e.target.value
        });
    }
    onChangeSurname(e) {
        this.setState({
            Surname: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const { user } = this.props.auth;
        console.log(user);
        if (user) {
            const address = {
                UserId: user._id,
                Street: this.state.Street,
                ExternalNum: this.state.ExternalNum,
                InternalNum: this.state.InternalNum,
                Country: this.state.Country,
                State: this.state.State,
                City: this.state.City,
                Postcode: this.state.Postcode,
                References: this.state.References,
                Surname: this.state.Surname
            };
            console.log(address);
            axios.post('/api/address', address)
                .then(res => console.log(res.data));
            window.location = '/perfil';
        }
    }
    render() {
        return (
            <section class="pt90 pb100">
                <div class="container">
                    <div class="checkout">
                        <form class="row text-center" onSubmit={this.onSubmit}>
                            <div class="half-left col-sm-6">
                                <label for="exampleFormControlSelect1">Sobrenombre</label>
                                <input type="text" class="input-text" value={this.state.Surname} onChange={this.onChangeSurname} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-left col-sm-6">
                                <label for="exampleFormControlSelect1">Calle</label>
                                <input type="text" class="input-text" value={this.state.Street} onChange={this.onChangeStreet} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-left col-sm-6">
                                <label for="exampleFormControlSelect1">Numero exterior</label>
                                <input type="number" class="input-text" value={this.state.ExternalNum} onChange={this.onChangeExternalNum} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-right col-sm-6">
                                <label for="exampleFormControlSelect1">Numero interior</label>
                                <input type="number" class="input-text" value={this.state.InternalNum} onChange={this.onChangeInternalNum} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-left col-sm-6">
                                <label for="exampleFormControlSelect1">Codigo postal</label>
                                <input type="number" class="input-text" value={this.state.Postcode} onChange={this.onChangePostcode} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-right col-sm-6">
                                <label for="exampleFormControlSelect1">Pais</label>
                                <input type="text" class="input-text" value={this.state.Country} onChange={this.onChangeCountry} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-left col-sm-6">
                                <label for="exampleFormControlSelect1">Estado</label>
                                <input type="text" class="input-text" value={this.state.State} onChange={this.onChangeState} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div class="half-right col-sm-6">
                                <label for="exampleFormControlSelect1">Ciudad</label>
                                <input type="text" class="input-text" value={this.state.City} onChange={this.onChangeCity} required />
                                <p className="help-block text-danger"></p>
                            </div>
                            <label for="exampleFormControlSelect1">Referencias</label>
                            <textarea type="text" class="input-text" value={this.state.References} onChange={this.onChangeReferences} required />
                            <p className="help-block text-danger"></p>
                            <input class="btn btn-sm btn-sign-up" type="submit" value="Registrar" />
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(NewAddress);
