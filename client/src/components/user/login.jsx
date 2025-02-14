import React, { Component } from "react";
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";

export class Login extends Component {
  state = {
    EmailAddress: '',
    Password: '',
    msg: null
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.msg.msg,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    if (isAuthenticated === true) {
      Swal.fire({
        title: 'Bienvenido de vuelta',
        showConfirmButton: false,
        toast: true,
        position: "bottom-right",
        timer: 900
      });
      window.location = '/';
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = e => {
    e.preventDefault();
    const { EmailAddress, Password } = this.state;
    const cliente = {
      EmailAddress,
      Password
    }
    this.props.login(cliente);
  }

  Resend = e => {
    e.preventDefault();
    const { EmailAddress } = this.state;
    const body = {
      EmailAddress: EmailAddress
    }
    axios.post('/api/users/resendEmail', body)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: `Correo enviado`
        });
      });
  }

  render() {
    return (
      <div>
        <section id="login" class="bg-grey-1">
          <div class="login-container">
            <div class="container text-center">
              <div class="col-md-12">
                <h3 class="mb5">Inicia sesión</h3>
                <p class="subheading">Bienvenido a Monchi</p>
                <div class="login-form pt30 pb30">
                  <form onSubmit={this.onSubmit}>
                    <input class="form-email bg-white" type="text" placeholder="Email Address" name='EmailAddress' onChange={this.onChange} required />
                    <p className="help-block text-danger"></p>
                    <input class="form-password bg-white" type="password" placeholder="Password" name='Password' onChange={this.onChange} required />
                    <p className="help-block text-danger"></p>
                    <input class="btn btn-sm btn-login" type="submit" value="Login" />
                  </form>
                </div>
                <p>¿No tienes una cuenta? <Link to="/register">Registrate</Link></p>
                {this.state.msg !== null && <p><Link to="/forgotPassword">Olvidaste tu contraseña?</Link></p>}
                {this.state.msg === "Confirma tu correo electronico" && <button onClick={this.Resend} type="button" class="btn btn-ghost">Reenviar codigo al correo</button>}
                <p class="terms">Al iniciar sesión accedes a nuestros <Link to="#">Terminos de Servicio</Link> y <Link to="#">Política de Privacidad</Link>.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);