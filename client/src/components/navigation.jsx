import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from "./logout";

export class Navigation extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <li class="dropdown"><a href="shop-3columns.html" class="dropdown-toggle">Cuenta<i class="fa fa-chevron-down"></i></a>
        <ul class="dropdown-menu">
          <li><a href="#">Perfil</a></li>
          <li><a href="#">Carrito de compras</a></li>
          <Logout />
        </ul>
      </li>
    )
    const guestLinks = (
      <li class="dropdown"><a href="shop-3columns.html" class="dropdown-toggle">Cuenta<i class="fa fa-chevron-down"></i></a>
        <ul class="dropdown-menu">
          <li><a href="/login">Iniciar sesión</a></li>
          <li><a href="/register">Registrarse</a></li>
          <li><a href="/catalog">Catalogo</a></li>
        </ul>
      </li>
    )
    return (
      <nav class="navbar navbar-default dark">
        <div class="container">
          <div class="navbar-header">
            <div class="container">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar top-bar"></span>
                <span class="icon-bar middle-bar"></span>
                <span class="icon-bar bottom-bar"></span>
              </button>
              <a class="navbar-brand logo-light" href="/welcome"><img src="/Monchi-Logo.png" alt="#" /></a>
              <a class="navbar-brand logo-dark" href="/welcome"><img src="/Monchi-Logo.png" alt="#" /></a>
            </div>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <div class="container">
              <ul class="nav navbar-nav menu-right">
                {isAuthenticated ? authLinks : guestLinks}
                <li class="header-divider"><a><span></span></a></li>
                <li style={{ lineHeight: "0px" }}>
                  <form action="php/subscribe-mailchimp.php" method="post" id="subscribe-form">
                    <div class="subscribe-form-input">
                      <input type="text" name="search" class="footer-subscribe-input" placeholder="Buscar..." autocomplete="off" />
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Navigation);