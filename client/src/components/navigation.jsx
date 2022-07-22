import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Logout from "./user/logout";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Navigation(props) {
  const [cart, setCart] = useState([]);
  const [Search, setSearch] = useState();
  let navigate = useNavigate();

  const { isAuthenticated } = props.auth;
  const { user } = props.auth;

  function DoSearch(e) {
    e.preventDefault();
    navigate(`/results/search=${Search}`);
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        axios.get(`/api/cart/${user._id}`)
          .then(prod => setCart(prod.data));
      }, 2000);
    }
  });

  const ownerLinks = (isAuthenticated && user.Role === 'Owner')
    ? (
      <li><Link to="/myStore">Tu tienda</Link></li>
    ) :
    (<li><Link to="/makeStore">Volverte vendedor</Link></li>)


  const authLinks = (
    <ul class="nav navbar-nav menu-right">
      <li class="dropdown"><Link className="dropdown-toggle" to="/perfil">Cuenta<i class="fa fa-chevron-down"></i></Link>
        <ul class="dropdown-menu">
          <li><Link to="/shoppingcart">Carrito de compras ({cart.length})</Link></li>
          {ownerLinks}
          <Logout />
        </ul>
      </li>
      <li class="header-divider"></li>
      <li><Link to="/shoppingcart"><span class="ion-ios-cart-outline"> {cart.length}</span></Link></li>
      <li class="header-divider"></li>
      <li style={{ lineHeight: "0px" }}>
        <form onSubmit={DoSearch}>
          <div class="subscribe-form-input">
            <input type="text" class="footer-subscribe-input" placeholder="Buscar..." autoComplete="off"
              onChange={e => setSearch(e.target.value)} value={Search} name="search" />
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
        </ul>
      </li>
      <li class="header-divider"></li>
      <li style={{ lineHeight: "0px" }}>
        <form onSubmit={DoSearch}>
          <div class="subscribe-form-input">
            <input type="text" class="footer-subscribe-input" placeholder="Buscar..." autoComplete="off"
              onChange={e => setSearch(e.target.value)} value={Search} name="search" />
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

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navigation);