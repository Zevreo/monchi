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
                            <label for="exampleFormControlSelect1">FirsName</label>
                                <input type="text" class="input-text" name="billing_first_name" value={user ? user.FirstName : "loading"}/>

                            </div>

                            <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">LastName</label>
                                <input type="text"  class="input-text" name="billing_last_name" value={user ? user.LastName : "loading"} />
                            </div>
                            <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">BirtDate</label>
                                <input type="text" class="input-text" name="billing_first_name" value={user ? user.BirthDate : "loading"}/>
                            </div>
                            <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">Country</label>
                                <input type="text" class="input-text" name="billing_last_name" value={user ? user.Country : "loading"}/>
                            </div>
                            <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Phone</label>
                                <input type="text" class="input-text" name="billing_last_name" value={user ? user.PhoneNumber : "loading"}/>
                            </div>
                            <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">Coin</label>
                                <input type="text" class="input-text" name="billing_last_name" value={user ? user.DefaultCoin : "loading"}/>
                            </div>
                            
                            
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