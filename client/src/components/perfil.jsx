import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import  Sinacces  from "./perfilcomponents/sinacceso";
import Informacionperfil from "./perfilcomponents/informacionperfil";

export class Perfil extends Component {
    static propTypes = {
      auth: PropTypes.object.isRequired
    };
    render(){
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
            <section class="pt90 pb100">
            <div class="container"> 
                <div class="row">			

                    <div class="col-md-7 mr-auto text-center">
                        
                        <h4 class="mb1">Dashboard</h4>
                        
                        <div class="buttons-tabs-centered">
                            
                            <ul id="buttonTabs" class="nav nav-tabs nav-tabs-center">
                                <li class="active"><a href="#tab-c1" data-toggle="tab">Mi informacion</a></li>
                                <li class=""><a href="#tab-c2" data-toggle="tab">Second</a></li>
                                <li class=""><a href="#tab-c3" data-toggle="tab">Third</a></li>
                                <li class=""><a href="#tab-c4" data-toggle="tab">Fourth</a></li>
                            </ul>
                            
                            <div id="myTabContent" class="tab-content">
                                
                                <div class="tab-pane fade active in" id="tab-c1"> 
                                    <Informacionperfil></Informacionperfil> 
                                </div>
                                
                                <div class="tab-pane fade" id="tab-c2"> 
                                    <p>Sed scelerisque urna id scelerisque tincidunt. Sed scelerisque laoreet dolor sed aliquam. Duis at eros vehicula, sollicitudin magna elementum, pretium diam. Vivamus bibendum fringilla mauris et rhoncus. Phasellus mattis egestas risus ac tempor. Nam dapibus sodales ornare. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                                </div>
                                
                                <div class="tab-pane fade" id="tab-c3"> 
                                    <p>Sed scelerisque urna id scelerisque tincidunt. Sed scelerisque laoreet dolor sed aliquam. Duis at eros vehicula, sollicitudin magna elementum, pretium diam. Vivamus bibendum fringilla mauris et rhoncus. Phasellus mattis egestas risus ac tempor. Nam dapibus sodales ornare.</p>
                                </div>
                                
                                <div class="tab-pane fade" id="tab-c4"> 
                                    <p>Sed scelerisque urna id scelerisque tincidunt. Sed scelerisque laoreet dolor sed aliquam. Duis at eros vehicula, sollicitudin magna elementum, pretium diam. Vivamus bibendum fringilla mauris et rhoncus. Sed scelerisque urna id scelerisque tincidunt. Phasellus mattis egestas risus ac tempor. Nam dapibus sodales ornare.</p>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </section>
        )
        const guestLinks = (
            <Sinacces></Sinacces>
        )
        return(
            <div>
                {isAuthenticated ? authLinks : null}
                {!isAuthenticated ? guestLinks : null}
                
            </div>
         );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Perfil);
