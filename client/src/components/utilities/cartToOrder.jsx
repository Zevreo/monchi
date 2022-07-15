import React, { useEffect, useState } from "react";
import axios from "axios";

export async function ConverterMultiply(props) {
    let response = null;
    const { token, user } = props.auth;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    const body = {
        SaleTotal: props.Total,
        SaleCoin: user.DefaultCoin,
        PaymentMethod: "Paypal",
        PaymentSuccess: true,
        SaleProducts: props.Cart,
        TransactionId: props.Capture.id,
        BuyerId: props.Capture.payer.payer_id
    }
    await axios.post('/api/order', body, config)
        .then(res => {
            if(res == "Orden agregada"){
                await axios.delete(`/api/cart/${user.id}`)
                    .then(() => response = "Concluido")
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
    return response;
}