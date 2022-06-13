import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';


export class Informacionperfil extends Component{
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        const { user } = this.props.auth;
        
        if (user) {
            axios.get(`/api/users/${user._id}`)
                .then(res => this.setState({ perfil: res.data }));
                
        }
    };
    render(){
        const { user } = this.props.auth;
        return(
            <section class="checkout">
                <div class=""> 
                    <div class="row">
                        <div class="col-sm-8 col-sm-offset-2 text-center ">
     
                            <h3 class="mb20">Tu informacion</h3>
                            <div class="half-left col-sm-6">
                                <input type="text" class="input-text" name="billing_first_name" placeholder={user ? user.FirstName : "loading"}/>
                            </div>
                            <div class="half-right col-sm-6">
                                <input type="text" class="input-text" name="billing_last_name" placeholder={user ? user.LastName : "loading"}/>
                            </div>
                            <input type="text" class="input-text" name="billing_email" placeholder={user ? user.FirstName : "loading"}/> 
                            <input type="text" class="input-text" name="billing_address" placeholder="Street Address"/>
                            <input type="text" class="input-text" name="billing_apt" placeholder="Apartment, suite, unit etc."/>
                            <div class="half-left col-sm-6">
                                <input type="text" class="input-text" name="billing_city" placeholder="City"/>
                            </div>
                            <div class="half-right col-sm-6">
                                <input type="text" class="input-text" name="billing_post" placeholder="Postcode"/>
                            </div> 
                            <input type="text" class="input-text" name="billing_phone" placeholder="Phone"/>
                        </div>  
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })
  export default connect(mapStateToProps, null)(Informacionperfil);