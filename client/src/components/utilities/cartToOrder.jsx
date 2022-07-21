import React, { useEffect, useState } from "react";
import axios from "axios";

export default async function CartToOrder(auth, Total, Capture, Cart) {
    let response = null;
    const { token, user } = auth;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    const body = {
        SaleTotal: Total,
        SaleCoin: user.DefaultCoin,
        PaymentMethod: Capture.paymentSource,
        PaymentSuccess: true,
        SaleProducts: Cart,
        TransactionId: Capture.orderID,
        BuyerId: Capture.payerID
    }
    await axios.post('/api/order', body, config)
        .then(res => {
            axios.delete(`/api/cart/user/${auth.user._id}`)
                .then(() => {
                    response = "Success";
                    console.log(response);
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    return response;
}