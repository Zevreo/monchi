import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Navigation extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
      };
      render() {
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
          <li>
            <a href="/dashboard" className="page-scroll">
              Cuenta
            </a>
          </li>
        )
        const guestLinks = (
          <>
          <li>
            <a href="/login" className="page-scroll">
              Iniciar sesion
            </a>
          </li>
          <li>
            <a href="/registro" className="page-scroll">
              Crear cuenta
            </a>
          </li>
          </>
        )
    return (
      <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <div class="container">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar top-bar"></span>
                            <span class="icon-bar middle-bar"></span>
                            <span class="icon-bar bottom-bar"></span>
                        </button>
                        <a class="navbar-brand logo-light" href="/"><img src="img/assets/logo-light.png" alt="#"/></a>
                        <a class="navbar-brand logo-dark" href="/"><img src="img/assets/logo-dark.png" alt="#"/></a>
                    </div>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <div class="container">
                        <ul class="nav navbar-nav menu-right">
                            <li><a href="/login" class="dropdown-toggle">Login<i class="fa fa-chevron-down"></i></a></li>
                            <li class="header-divider"><a><span></span></a></li> 
                            <li class="header-icon-btn">
                                <a class="popup-with-zoom-anim search" href="#search-modal"><span class="fa fa-search"></span></a>
                                <div id="search-modal" class="zoom-anim-dialog mfp-hide">
                                    <form>  
                                        <input type="text" id="search-modal-input" placeholder="Start typing to search..." autocomplete="off"/>
                                    </form>
                                </div>
                            </li> 
                            <li><a href="#"><span class="ion-social-twitter"></span></a></li> 
                        </ul>   
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