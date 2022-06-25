import React, { Component } from "react";
import axios from 'axios';
import Allproducts from './productos/Allproducts'
export class Welcome extends Component {
    render() {
        return (
            <div>
                
                
                <Allproducts></Allproducts>
            </div>
        )
    }
}

export default Welcome;