import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class Perfil extends Component {
    render() {
        const { user } = this.props.auth;
        return (
            <div class="checkout">
                <div class="row text-center ">
                    <h3 class="mb20">Tu informacion</h3>
                    <div class="half-left col-sm-6">
                        <label for="exampleFormControlSelect1">Nombre</label>
                        <input type="text" class="input-text" name="billing_first_name" value={user ? user.FirstName : "loading"} />
                    </div>
                    <div class="half-right col-sm-6">
                        <label for="exampleFormControlSelect1">Apellido</label>
                        <input type="text" class="input-text" name="billing_last_name" value={user ? user.LastName : "loading"} />
                    </div>
                    <div class="half-left col-sm-6">
                        <label for="exampleFormControlSelect1">Fecha de nacimiento</label>
                        <input type="text" class="input-text" name="billing_first_name" value={user ? user.BirthDate : "loading"} />
                    </div>
                    <div class="half-right col-sm-6">
                        <label for="exampleFormControlSelect1">Pais</label>
                        <input type="text" class="input-text" name="billing_last_name" value={user ? user.Country : "loading"} />
                    </div>
                    <div class="half-left col-sm-6">
                        <label for="exampleFormControlSelect1">Telefono</label>
                        <input type="text" class="input-text" name="billing_last_name" value={user ? user.PhoneNumber : "loading"} />
                    </div>
                    <div class="half-right col-sm-6">
                        <label for="exampleFormControlSelect1">Moneda predeterminada</label>
                        <input type="text" class="input-text" name="billing_last_name" value={user ? user.DefaultCoin : "loading"} />
                    </div>
                </div>
                <Link to="/editUser" class="btn btn-dark btn-lg btn-appear mt20">Editar</Link>
                <Link to="/editUser" class="btn btn-dark btn-lg btn-appear mt20">Cambiar contraseña</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Perfil);