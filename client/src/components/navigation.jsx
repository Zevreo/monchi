import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from "./user/logout";
import { Link } from "react-router-dom";

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: '', id: '', search: '' };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  Search = e => {
    e.preventDefault();
    window.location = `/results/search=${this.state.search}`;
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const ownerLinks = (isAuthenticated && user.Role === 'Owner')
      ? (
        <li><Link to="/myStore">Tu tienda</Link></li>
      ) :
      (<li><Link to="/makeStore">Volverte vendedor</Link></li>)


    const authLinks = (
      <ul class="nav navbar-nav menu-right">
        <li class="dropdown"><Link className="dropdown-toggle" to="/perfil">Cuenta<i class="fa fa-chevron-down"></i></Link>
          <ul class="dropdown-menu">
            <li><Link to="/shoppingcart">Carrito de compras</Link></li>
            <li><Link to="/paginater">Paginater</Link></li>
            {ownerLinks}
            <Logout />
          </ul>
        </li>
        <li class="header-divider"></li>
        <li><Link to="/shoppingcart"><span class="ion-ios-cart-outline">{this.state.cart}</span></Link></li>
        <li class="header-divider"></li>
        <li style={{ lineHeight: "0px" }}>
          <form onSubmit={this.Search}>
            <div class="subscribe-form-input">
              <input type="text" class="footer-subscribe-input" placeholder="Buscar..." autoComplete="off"
              onChange={this.onChange} name="search"/>
            </div>
          </form>
        </li>
      </ul>
    )
    const guestLinks = (
      <ul class="nav navbar-nav menu-right">
        <li class="dropdown"><Link className="dropdown-toggle" to="/login">Iniciar sesión<i class="fa fa-chevron-down"></i></Link>
          <ul class="dropdown-menu">
            <li><Link to="/register">Registrarse</Link></li>
            <li><Link to="/paginater">Paginater</Link></li>
          </ul>
        </li>
        <li class="header-divider"></li>
        <li style={{ lineHeight: "0px" }}>
          <form onSubmit={this.Search}>
            <div class="subscribe-form-input">
              <input type="text" class="footer-subscribe-input" placeholder="Buscar..." autoComplete="off" 
              onChange={this.onChange} name="search"/>
            </div>
          </form>
        </li>
      </ul>
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
              <Link className="navbar-brand logo-light" to="/"><img src="/Monchi-Logo.png" alt="#" /></Link>
              <Link className="navbar-brand logo-dark" to="/"><img src="/Monchi-Logo.png" alt="#" /></Link>
            </div>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <div class="container">
              {isAuthenticated ? authLinks : guestLinks}
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