import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Converter from '../utilities/converter';
import { Link } from "react-router-dom";
import Loader from '../utilities/loader';
import { useNavigate } from "react-router";

export function Allproducts(props) {
    const navigate = useNavigate();
    const [Products, setProducts] = useState([]);
    async function AddCart(e) {
        const { user } = props.auth;
        const { token } = props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user) {
            const product = {
                UserId: user._id,
                ProductId: e,
                Quantity: 1
            };
            await axios.post('/api/cart', product, config)
                .then(res => console.log(res.data));
            navigate('/shoppingcart');
        }
    };
    useEffect(() => {
        FetchProducts();
    }, []);
    function FetchProducts() {
        axios.get(`/api/product/`)
            .then(prod => setProducts(prod.data))
            .catch(err => console.log(err));

    };
    const { user } = props.auth;
    return (
        <section class="shop bg-grey-1">
            <div class="container">
                <div class="row white-bg">
                    <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                        {Products.map((d, i) => (
                            <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
                                {d ?
                                    <div>
                                        <Link to={`/product/${d._id}`}>
                                            <div class="item">
                                                <img src={d.ProductImages[0]} alt="#" class="contain" />
                                                <h4 class="price">
                                                    <span class="currency">{user ? user.DefaultCoin : d.PriceCoin}$</span>
                                                    {user ? <Converter Current={d.PriceCoin} Value={d.ProductPrice} Target={user.DefaultCoin} /> : d.ProductPrice}
                                                </h4>
                                                <div class="info hover-bottom">
                                                    <h4>{d.ProductName}</h4>
                                                    <p>Tags:{d.Tags.map((d, i) => <i> {d} </i>)}</p>
                                                    {user ?
                                                        <button className="btn btn-dark btn-md" type="button" onClick={() => AddCart(d._id)}>Agregar</button>
                                                        : ''}
                                                </div>
                                            </div>
                                        </Link>

                                    </div>
                                    :
                                    <li className="relative col-md-12 center-items"><Loader /></li>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Allproducts);