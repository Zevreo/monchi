import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Converter from '../utilities/converter';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Pagination from "../utilities/Pagination";
import Filters from "../utilities/Filters";

export function Allproducts(props) {
    const navigate = useNavigate();
    const [Products, setProducts] = useState([]);
    const [Page, setPage] = useState(1)
    const [limit, setLimit] = useState(12);
    const [sort, setSort] = useState("updatedAt");
    const [order, setOrder] = useState(-1)
    const [count, setCount] = useState();
    const [maxPage, setMax] = useState(1);
    const [disable, setDisable] = useState(false);

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

    function getProducts() {
        const config = {
            headers: {
                "page": Page,
                "limit": limit,
                "sort": sort,
                "order": order
            }
        }
        axios.get(`/api/product`, config)
            .then(prods => {
                setProducts(prods.data);
                setPage(Number(prods.headers['x-page']));
                setLimit(Number(prods.headers['x-limit']));
                setCount(Number(prods.headers['x-count']));
                setDisable(false);
            });
    }

    useEffect(() => {
        setMax(Math.ceil(count / limit));
    }, [Products]);

    useEffect(() => {
        getProducts();
    }, [Page]);

    useEffect(() => {
        setDisable(true);
        if (Page === 1) {
            getProducts();
        }
        else {
            setPage(1);
        }
    }, [limit, sort, order]);

    let floor = ((limit * (Page - 1)) + 1);
    let ceil = (limit * Page) > count ? count : (limit * Page);
    const { user } = props.auth;

    return (
        <section class="shop bg-grey-1">
            <div class="container">
                <div class="row white-bg">
                    <p class="shop-result-count">Showing {floor} to {ceil} of {count} results</p>
                    <Filters setSort={setSort} setLimit={setLimit} setOrder={setOrder} disable={disable} />
                    <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                        {Products.map((d, i) => (
                            <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
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
                                                {d.Status == "Active" &&
                                                    (user && d.Options.length < 1 ?
                                                        <button className="btn btn-dark btn-md" type="button" onClick={() => AddCart(d._id)}>Agregar</button>
                                                        : <p>Ver para elegir opciones</p>)
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div class="col-md-12 text-center">
                        <Pagination Page={Page} maxPage={maxPage} disable={disable} setDisable={setDisable} setPage={setPage} />
                    </div>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Allproducts);