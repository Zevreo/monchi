import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class Perfil extends Component {
    render() {
        const { user } = this.props.auth;
        return (
            <div class="checkout ">
                <div class="row text-center">
                    <h3 class="mb20">Tu informacion</h3>
                    <div class="col-sm-6 mb30">
                        <span>Nombre: <h4 class="input-text">{user && user.FirstName}</h4></span>
                    </div>
                    <div class="col-sm-6 mb30">
                        <span>Apellidos: <h4 class="input-text">{user && user.LastName}</h4></span>
                    </div>
                    <div class="col-sm-6 mb30">
                        <span>Fecha de nacimiento: <h4 class="input-text">{user && user.BirthDate}</h4></span>
                    </div>
                    <div class="col-sm-6 mb30">
                        <span>Pais: <h4 class="input-text">{user && user.Country}</h4></span>
                    </div>
                    <div class="col-sm-6 mb30">
                        <span>Telefono: <h4 class="input-text">{user && user.PhoneNumber}</h4></span>
                    </div>
                    <div class="col-sm-6 mb30">
                        <span>Moneda preferida: <h4 class="input-text">{user && user.DefaultCoin}</h4></span>
                    </div>
                </div>
                <Link to="/editUser" class="btn btn-dark btn-lg btn-appear mt20">Editar</Link>
                <Link to="/changeCredentials" class="btn btn-dark btn-lg btn-appear mt20">Cambiar email/password</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Perfil);