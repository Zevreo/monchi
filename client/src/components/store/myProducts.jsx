import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../loader';
import { Link } from "react-router-dom";

export function MyProducts(props) {
    const [Page, setPage] = useState(1)
    const [limit, setLimit] = useState(1);
    const [sort, setSort] = useState("updatedAt");
    const [order, setOrder] = useState(-1)
    const [count, setCount] = useState();
    const [updated, setUpdated] = useState(false);
    const [products, setProducts] = useState();
    const [maxPage, setMax] = useState(1);
    const [msg, setMsg] = useState();
    const [disable, setDisable] = useState(false);
    const [more, setMore] = useState(1);

    let { page } = useParams();
    if (page > 0) {
        setPage(page);
    }

    function getProducts() {
        const { user } = props.auth;
        if (user) {
            const config = {
                headers: {
                    "page": Page,
                    "limit": limit,
                    "sort": sort,
                    "order": order
                }
            }
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => {
                    axios.get(`/api/product/store/${res.data._id}`, config)
                        .then(prods => {
                            setProducts(prods.data);
                            setPage(Number(prods.headers['x-page']));
                            setLimit(Number(prods.headers['x-limit']));
                            setCount(Number(prods.headers['x-count']));
                            setDisable(false);
                        })
                });
            setUpdated(true);
        }
    }

    function Paginate(int) {
        setDisable(true);
        if (int === "plus") {
            if (Page >= maxPage) {
                setMsg(`No puedes exceder el limite de paginas (x${more})`);
                setMore(more + 1);
            }
            else {
                setPage(Page + 1);
            }
        }
        else {
            if (int === "minus") {
                if (Page <= 1) {
                    setMsg(`No puedes tener paginas negativas (x${more})`);
                    setMore(more + 1);
                }
                else {
                    setPage(Page - 1);
                }
            }
            else {
                setPage(int);
            }
        }
    }

    function show() {
        var x = document.getElementById("errorMessage");
        x.style.display = "block";
    }

    function hide() {
        var x = document.getElementById("errorMessage");
        x.style.display = "none";
    }

    useEffect(() => {
        show();
        setDisable(false);
    }, [msg]);

    useEffect(() => {
        setMax(Math.ceil(count / limit));
    }, [products])

    useEffect(() => {
        hide()
        setDisable(true);
        if (Page === 1) {
            getProducts();
        }
        else {
            setPage(1);
        }
    }, [limit, sort, order]);

    useEffect(() => {
        hide();
        getProducts();
    }, [Page]);
    return (
        <div class="container">
            <div class="row white-bg">
                <p class="shop-result-count">Showing {limit ? ((limit * (Page - 1)) + 1) : "?"} to {limit ? ((limit * Page) > count ? count : (limit * Page)) : "?"} of {count ? count : "?"} results</p>
                <select class="shop-sorting" onChange={(e) => setSort(e.target.value)} disabled={disable}>
                    <option value="updatedAt">Date</option>
                    <option value="ProductPrice">Price</option>
                </select>
                <select class="shop-sorting" onChange={(e) => setOrder(e.target.value)} disabled={disable}>
                    <option value={-1}>Descending</option>
                    <option value={1}>Ascending</option>
                </select>
                <select class="shop-sorting" onChange={(e) => setLimit(e.target.value)} disabled={disable}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                </select>
                <div class="row" id="errorMessage" style={{ display: 'none' }}>
                    <div class="col-md-4 col-md-offset-4">
                        <div class="alert alert-warning fade in">
                            <button type="button" class="close" onClick={(e) => hide()}><i class="ion-ios-close"></i></button>
                            <i class="ion-android-alert"></i><strong>{msg ? msg : "loading..."}</strong>
                        </div>
                    </div>
                </div>
                <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                    {products !== undefined ? products.map((d, i) => (
                        <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
                            {d ?
                                <Link to={`/product/${d._id}`}>
                                    <div class="item">
                                        <img src={d.ProductImage} alt="#" class="contain" />
                                        <h4 class="price"><span class="currency">{d.PriceCoin}$</span>{d.ProductPrice}</h4>
                                        <div class="info hover-bottom">
                                            <h4>{d.ProductName}</h4>
                                            <p>Tags:{d.Tags.map((d, i) => <i> {d} </i>)}</p>
                                        </div>
                                    </div>
                                </Link>
                                :
                                ""
                            }
                        </li>
                    )) : <li className="relative col-sm-2 col-sm-offset-5"><Loader /></li>}
                </ul>
                <div class="col-md-12 text-center">
                    <ul class="pagination">
                        <li>
                            <a type="button" onClick={(e) => Paginate(1)} hidden={disable}>
                                <span aria-hidden="true"><i class="ion-chevron-left"></i></span>
                            </a>
                        </li>
                        <li>
                            <a type="button" onClick={(e) => Paginate("minus")} aria-label="Previous" hidden={disable}>
                                <span aria-hidden="true"><i class="ion-ios-arrow-back"></i></span>
                            </a>
                        </li>
                        {Page > 2 ?
                            <li>
                                <a type="button" onClick={(e) => Paginate(Page - 2)} hidden={disable}>{Page ? Page - 2 : "loading"}</a>
                            </li> : ''}
                        {Page > 1 ?
                            <li>
                                <a type="button" onClick={(e) => Paginate(Page - 1)} hidden={disable}>{Page ? Page - 1 : "loading"}</a>
                            </li> : ''}
                        <li class="active">
                            <a type="button" disabled>{Page ? Page : "loading"}</a>
                        </li>
                        {Page < maxPage ?
                            <li>
                                <a type="button" onClick={(e) => Paginate(Page + 1)} hidden={disable}>{Page ? Page + 1 : "loading"}</a>
                            </li> : ''}
                        {Page < (maxPage - 1) ?
                            <li>
                                <a type="button" onClick={(e) => Paginate(Page + 2)} hidden={disable}>{Page ? Page + 2 : "loading"}</a>
                            </li> : ''}
                        <li>
                            <a type="button" onClick={(e) => Paginate("plus")} aria-label="Next" hidden={disable}>
                                <span aria-hidden="true"><i class="ion-ios-arrow-forward"></i></span>
                            </a>
                        </li>
                        <li>
                            <a type="button" onClick={(e) => Paginate(maxPage)} aria-label="Next" hidden={disable}>
                                <span aria-hidden="true"><i class="ion-chevron-right"></i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyProducts);
