import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { Converter, ConverterMultiply } from '../utilities/converter';
import { Link, useNavigate } from "react-router-dom";
import Paypal from "../utilities/paypal";
import CartToOrder from "../utilities/cartToOrder";
import Swal from 'sweetalert2';

export function ShoppingCart(props) {
  let navigate = useNavigate();
  const { user } = props.auth;
  const [Products, setProducts] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Capture, setCapture] = useState();
  const [Address, setAddress] = useState();
  const [Shipment, setShipment] = useState();
  const [Carrier, setCarrier] = useState();
  const [Carriercode, setCarriercode] = useState();
  const [Tracking, setTracking] = useState();

  useEffect(() => {
    GetCart();
    GetAddress();
  }, []);

  function GetAddress() {
    axios.get(`/api/address/default/${user._id}`)
      .then(res => setAddress(res.data));
  }

  useEffect(() => {
    CartToOrder(props.auth, Total, Capture, Products, Tracking)
      .then(() => {
        GetCart();
        Swal.fire({
          title: 'Compra exitosa',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          navigate('/orders')
        }, 1600)
      });
  }, [Tracking])

  useEffect(() => {
    SendShipment();
  }, [Capture]);

  async function SendShipment() {
    const body = {
      api_key: "ab59616e1bbc0a846c08b30f2eb7fc8d",
      carrier: Carrier,
      carrier_service_code: Carriercode,
      origin_direction: {
        country_code: "MX",
        postal_code: "11550",
        company: "Guía Paquetería",
        direction_1: "Moliere 68",
        city: "Ciudad de Mexico",
        phone: "5584214124"
      },
      destination_direction: {
        full_name: user.FirstName + " " + user.LastName,
        direction_1: Address.Street,
        city: Address.City,
        phone: user.PhoneNumber,
        country_code: "MX",
        postal_code: Address.Postcode,
      },
      shipment: {
        shipment_type: "Package",
        parcels: [
          {
            quantity: "1",
            weight: "3",
            weight_unit: "kg",
            length: "10",
            height: "20",
            width: "30",
            dimension_unit: "cm",
          },
        ],
      }
    };
    await axios.post(`https://enviaya.com.mx/api/v1/shipments`, body)
      .then(ship => setTracking(ship.data.carrier_shipment_number));
  }

  function GetCart() {
    axios.get(`/api/cart/${user._id}`)
      .then(prod => setProducts(prod.data));
  }

  async function QtyChange(cart, qty) {
    let body = { Quantity: qty }
    axios.patch(`/api/cart/quantity/${cart}`, body)
      .then(() => GetCart());
    Swal.fire({
      title: 'Cantidad agregada',
      icon: 'success',
      showConfirmButton: false,
      toast: true,
      position: "bottom-right",
      timer: 1500
    });
  }

  function RemoveItem(cart) {
    axios.delete(`/api/cart/${cart}`)
      .then(() => GetCart());
    Swal.fire({
      title: 'Eliminado',
      icon: 'success',
      showConfirmButton: false,
      toast: true,
      position: "bottom-right",
      timer: 1500
    });
  }

  useEffect(() => {
    CalcTotal();
  }, [Products, Carrier]);

  async function CalcTotal() {
    let conv = 0;
    let Subtotal = 0;
    let carrierCalc = 0;
    setTotal(0);
    for (var prod of Products) {
      conv = await ConverterMultiply(prod.PriceCoin, user.DefaultCoin, prod.ProductPrice, prod.Quantity);
      Subtotal = Subtotal + conv;
    }
    switch (Carrier) {
      case "ups":
        carrierCalc = await ConverterMultiply("USD", user.DefaultCoin, Shipment.UPS[0].total_amount, 1);
        Subtotal = Subtotal + carrierCalc;
        break;
      case "redpack":
        carrierCalc = await ConverterMultiply("USD", user.DefaultCoin, Shipment.Redpack[0].total_amount, 1);
        Subtotal = Subtotal + carrierCalc;
        break;
      case "estafeta":
        carrierCalc = await ConverterMultiply("USD", user.DefaultCoin, Shipment.Estafeta[1].total_amount, 1);
        Subtotal = Subtotal + carrierCalc
        break;
      case "fedex":
        carrierCalc = await ConverterMultiply("USD", user.DefaultCoin, Shipment.FedEx[0].total_amount, 1);
        Subtotal = Subtotal + carrierCalc;
        break;
      default:
        break;
    }
    if (user.DefaultCoin == "JPY") setTotal(Subtotal.toFixed(0));
    else setTotal(Subtotal.toFixed(2));
  }

  useEffect(() => {
    getRates();
  }, [Address, Total]);

  async function getRates() {
    let body = {
      api_key: "ab59616e1bbc0a846c08b30f2eb7fc8d",
      shipment: {
        shipment_type: "Package",
        parcels: [
          {
            quantity: "1",
            weight: "3",
            weight_unit: "kg",
            length: "10",
            height: "20",
            width: "30",
            dimension_unit: "cm"
          }
        ]
      },
      origin_direction: {
        country_code: "MX",
        postal_code: "11550"
      },
      destination_direction: {
        country_code: "MX",
        postal_code: Address.Postcode
      },
      insured_value: Total,
      insured_value_currency: user.DefaultCoin,
      order_total_amount: Total,
      currency: "USD",
      intelligent_filtering: true,
      enable_cached_rates: true
    };
    await axios.post(`https://enviaya.com.mx/api/v1/rates`, body)
      .then((ship) => setShipment(ship.data));
  }

  useEffect(() => {
    switch (Carrier) {
      case "ups":
        setCarriercode("07")
        break;
      case "redpack":
        setCarriercode("2")
        break;
      case "estafeta":
        setCarriercode("60");
        break;
      case "fedex":
        setCarriercode("FEDEX_EXPRESS_SAVER");
        break;
      default:
        setCarriercode();
        break;
    }
  }, [Carrier]);

  return (
    <section class="cart pt60 pb60">
      <div class="container">
        <div class="row">
          <div class="col-sm-9 mt40 mb40">
            <h4 class="bag-summary mb20">Your Items</h4>
            <table class="shop_table cart" cellspacing="0">
              <thead>
                <tr>
                  <th class="product-thumbnail">Producto</th>
                  <th class="product-name pr10">Nombre</th>
                  <th class="product-name pr10">Opciones</th>
                  <th class="product-price pr10">Precio</th>
                  <th class="product-quantity">Cantidad</th>
                  <th class="product-subtotal">Subtotal</th>
                  <th class="product-remove">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {Products.map((d, i) => (
                  <tr class="cart_item" key={i}>
                    <td class="product-thumbnail">
                      <Link to={`/product/${d.ProductId}`}>
                        <img src={d.ProductImages[0]} alt="#" />
                      </Link>
                    </td>
                    <td class="product-name pr10">
                      <Link to={`/product/${d.ProductId}`}>{d.ProductName}</Link>
                    </td>
                    <td class="product-name pr10">
                      {d.CartOptions}
                    </td>
                    <td class="product-price pr10">
                      <span class="amount">{user.DefaultCoin}${<Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} />}</span>
                    </td>
                    <td class="product-quantity">
                      <div class="quantity">
                        <input type="number" step="1" min="1" title="Qty" class="input-text qty text" size="4" name="cart-qty" value={d.Quantity} onChange={e => QtyChange(d.CartId, e.target.value)} />
                      </div>
                    </td>
                    <td class="product-subtotal">
                      <span class="amount">{user.DefaultCoin}${<Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} Multiplier={d.Quantity} />}</span>
                    </td>
                    <td class="product-remove">
                      <button type="button" onClick={e => RemoveItem(d.CartId)} class="remove btn shadow-none" title="Remove this item">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col-sm-3 mt40 mb40">
            <h4 class="bag-totals mb20">Cart Totals</h4>
            <div class="cart_totals">
              <table cellspacing="0">
                <tbody>
                  <tr class="cart-subtotal">
                    <th>Subtotal</th>
                    <td><span class="amount">{user.DefaultCoin}${Total}</span></td>
                  </tr>
                  {Shipment && (
                    <tr class="shipping">
                      <th>Envío*</th>
                      <td>
                        <select class="bg-dark-2" type="text" placeholder="Status" onChange={e => setCarrier(e.target.value)} required>
                          <option value="null" default>Selecciona una paqueteria</option>
                          <option value="redpack">Redpack - {Shipment.Redpack[0].currency}${Shipment.Redpack[0].total_amount}</option>
                          <option value="estafeta">Estafeta - {Shipment.Estafeta[1].currency}${Shipment.Estafeta[1].total_amount}</option>
                          <option value="fedex">Fedex - {Shipment.FedEx[0].currency}${Shipment.FedEx[0].total_amount}</option>
                          <option value="ups">UPS - {Shipment.UPS[0].currency}${Shipment.UPS[0].total_amount}</option>
                        </select>
                      </td>
                    </tr>
                  )}
                  <tr class="shipping">
                    <th>Direccion*</th>
                    <td><strong>{Address ? Address.Surname : <Link to="/newAddress">Agregar direccion</Link>}</strong></td>
                  </tr>
                  <tr class="order-total">
                    <th>Total</th>
                    <td><strong><span class="amount">{user.DefaultCoin}${Total}</span></strong> </td>
                  </tr>
                </tbody>
              </table>
              {(Products.length > 0 && Address && Carriercode) && <Paypal setCapture={setCapture} user={user} Total={Total} />}
              <Link to="/" class="highlight mt20 btn btn-dark">Seguir comprando</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(ShoppingCart);