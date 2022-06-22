import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from "./logout";

export class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    cart: '',
    id: ''
  };
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const ownerLinks = ( isAuthenticated && user.Role == 'Owner') 
    ? (
      <li><a href="/myStore">Tu tienda</a></li>
      ) :
      (<li><a href="/makeStore">Volverte vendedor</a></li>)
    
    
      const authLinks = (
        <ul class="nav navbar-nav menu-right">
          <li class="dropdown"><a class="dropdown-toggle" href="/perfil">Cuenta<i class="fa fa-chevron-down"></i></a>
            <ul class="dropdown-menu">
              <li><a href="/shoppingcart">Carrito de compras</a></li>
              { ownerLinks }
              <Logout />
            </ul>
          </li>
          <li class="header-divider"><a><span></span></a></li>
          <li><a href="#"><span class="ion-ios-cart-outline">{this.state.cart}</span></a></li>
          <li class="header-divider"><a><span></span></a></li>
          <li style={{ lineHeight: "0px" }}>
            <form action="php/subscribe-mailchimp.php" method="post" id="subscribe-form">
              <div class="subscribe-form-input">
                <input type="text" name="search" class="footer-subscribe-input" placeholder="Buscar..." autocomplete="off" />
              </div>
            </form>
          </li>
        </ul>
      )
    const guestLinks = (
      <ul class="nav navbar-nav menu-right">
        <li class="dropdown"><a class="dropdown-toggle" href="/login">Iniciar sesión<i class="fa fa-chevron-down"></i></a>
          <ul class="dropdown-menu">
            <li><a href="/register">Registrarse</a></li>
          </ul>
        </li>
        <li class="header-divider"><a><span></span></a></li>
        <li style={{ lineHeight: "0px" }}>
          <form action="php/subscribe-mailchimp.php" method="post" id="subscribe-form">
            <div class="subscribe-form-input">
              <input type="text" name="search" class="footer-subscribe-input" placeholder="Buscar..." autocomplete="off" />
            </div>
          </form>
        </li>
      </ul>
    )
    return (
      <div>
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
                <a class="navbar-brand logo-light" href="/"><img src="/Monchi-Logo.png" alt="#" /></a>
                <a class="navbar-brand logo-dark" href="/"><img src="/Monchi-Logo.png" alt="#" /></a>
              </div>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <div class="container">
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Navigation);