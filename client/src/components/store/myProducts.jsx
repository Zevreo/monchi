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
                        })
                });
            setUpdated(true);
        }
    }
    function Paginate(int) {
        if (int === "plus") {
            if (Page >= maxPage) {
                setMsg("No puedes exceder el limite de paginas");
            }
            else {
                setPage(Page + 1);
            }
        }
        if (int === "minus") {
            if (Page <= 1) {
                setMsg("No puedes tener paginas negativas");
            }
            else {
                setPage(Page - 1);
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
    }, [msg]);
    useEffect(() => {
        setMax(Math.ceil(count / limit));
    }, [products])
    useEffect(() => {
        hide()
        if (Page === 1) {
            getProducts();
        }
        else {
            setPage(1);
        }
    }, [limit, sort, order]);
    useEffect(() => {
        hide()
        getProducts();
    }, [Page]);
    return (
        <div class="container">
            <div class="row white-bg">
                <p class="shop-result-count">Showing {limit ? ((limit * (Page - 1)) + 1) : "?"} to {limit ? ((limit * Page) > count ? count : (limit * Page)) : "?"} of {count ? count : "?"} results</p>
                <select class="shop-sorting" onChange={(e) => setSort(e.target.value)}>
                    <option value="updatedAt">Date</option>
                    <option value="ProductPrice">Price</option>
                </select>
                <select class="shop-sorting" onChange={(e) => setOrder(e.target.value)}>
                    <option value={-1}>Descending</option>
                    <option value={1}>Ascending</option>
                </select>
                <select class="shop-sorting" onChange={(e) => setLimit(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                </select>
                <div class="row" id="errorMessage" style={{display:'none'}}>
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
                    )) : <Loader />}
                </ul>
                <div class="col-md-12 text-center">
                    <ul class="pagination">
                        <li>
                            <a type="button" onClick={(e) => Paginate("minus")} aria-label="Previous">
                                <span aria-hidden="true"><i class="ion-ios-arrow-thin-left"></i></span>
                            </a>
                        </li>
                        <li class="active">
                            <a type="button">{Page ? Page : "loading"}</a>
                        </li>
                        <li>
                            <a type="button" onClick={(e) => Paginate("plus")} aria-label="Next">
                                <span aria-hidden="true"><i class="ion-ios-arrow-thin-right"></i></span>
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
