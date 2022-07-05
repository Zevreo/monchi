import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export class Logout extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
        return(
            <Fragment>
                <li><Link onClick={this.props.logout} to='/'>Cerrar sesion</Link></li>
            </Fragment>
        )
    }
}

export default connect(null, {logout})(Logout);