import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Converter from './utilities/converter';
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Pagination from "./utilities/Pagination";
import Filters from "./utilities/Filters";
import Swal from 'sweetalert2';

export function Results(props) {
    const { user } = props.auth;
    let { search } = useParams();
    const navigate = useNavigate();
    const [Products, setProducts] = useState([]);
    const [Page, setPage] = useState(1)
    const [limit, setLimit] = useState(12);
    const [sort, setSort] = useState("updatedAt");
    const [order, setOrder] = useState(-1)
    const [count, setCount] = useState();
    const [maxPage, setMax] = useState(1);
    const [disable, setDisable] = useState(false);
    const [Search, setSearch] = useState(search);

    function GetResults() {
        const config = {
            headers: {
                "page": Page,
                "limit": limit,
                "sort": sort,
                "order": order
            }
        }
        axios.get(`/api/product/search/${Search}`, config)
            .then(prods => {
                setProducts(prods.data);
                setPage(Number(prods.headers['x-page']));
                setLimit(Number(prods.headers['x-limit']));
                setCount(Number(prods.headers['x-count']));
                setDisable(false);
            });
    }

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
                .then(res => {
                    Swal.fire({
                        title: 'Agregado',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 900
                    });
                    navigate('/shoppingcart');
                });
        }
    };

    useEffect(() =>{
        GetResults();
    }, [Search, Page]);

    useEffect(() => {
        setMax(Math.ceil(count / limit));
    }, [Products]);

    useEffect(() => {
        setDisable(true);
        if (Page === 1) {
            GetResults();
        }
        else {
            setPage(1);
        }
    }, [limit, sort, order]);

    let floor = ((limit * (Page - 1)) + 1);
    let ceil = (limit * Page) > count ? count : (limit * Page);

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
                                                {user ?
                                                    <button className="btn btn-dark btn-md" type="button" onClick={() => AddCart(d._id)}>Agregar</button>
                                                    : ''}
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
export default connect(mapStateToProps, null)(Results);