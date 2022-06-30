import React, { Component } from "react";
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

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
      } else {
        this.setState({ msg: null });
      }
    }
    if (isAuthenticated === true) {
      window.location = '/';
    }
    if (this.state.msg !== null) {

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
  render() {
    const errorMessage = (
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="alert alert-danger fade in">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
            <i class="ion-android-alert"></i><strong>{this.state.msg}</strong>
          </div>
        </div>
      </div>
    )
    return (
      <div>
        <section id="login" class="bg-grey-1">
          <div class="login-container">
            {this.state.msg !== null ? errorMessage : ''}
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