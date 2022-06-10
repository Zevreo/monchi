import React, { Component } from "react";
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { connect } from 'react-redux';

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
    if(isAuthenticated===true){
      window.location = '/welcome';
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
    return (
      <div>
        <div id="contact" >
          <div className="container" style={{ height: "100%" }}>
            <div className="col-md-12">
              <div className="row">
                <div className="title" style={{ textAlign: "center" }}>
                  <h2>Login</h2>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text" className="form-control" placeholder="Correo" required
                          name='EmailAddress' onChange={this.onChange}
                          style={{ textAlign: "center", width: "50%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Contraseña" required
                          name='Password' onChange={this.onChange}
                          style={{ textAlign: "center", width: "50%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div id="success"></div>
                  <div id="col-md-12" style={{ textAlign: "center" }}>
                    <div id="col-md-6" style={{ textAlign: "center" }}>
                      <a>
                        <button type="submit" className="btn btn-custom btn-lg">
                          Ingresar
                      </button></a>
                    </div>
                    <p>¿No tiene una cuenta, por que no unirse?</p>
                    <div id="col-md-6" style={{ textAlign: "center" }}>
                      <a href="/registro">
                        <button type="button" className="btn btn-custom btn-lg">
                          Registrarse
                        </button>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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