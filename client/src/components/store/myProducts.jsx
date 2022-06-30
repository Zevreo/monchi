import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";

export function MyProducts(props) {
    let { page } = useParams();
    console.log(page);
    const [Page, setPage] = useState(page)
    const [limit, setLimit] = useState(1);
    const [sort, setSort] = useState("updatedAt");
    const [order, setOrder] = useState(-1)
    const [count, setCount] = useState();
    const [store, setStore] = useState();
    const [updated, setUpdated] = useState(false);
    const [products, setProducts] = useState();
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
                    setStore(res.data);
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
    function pagination(int) {
        if (int === "plus") {
            setPage(Page + 1);
        }
        else {
            if (int === "minus") {
                setPage(Page - 1);
            }
            else {
                setPage(int);
            }
        }
    }
    useEffect(() => {
        setPage(1);
        getProducts();
    }, [limit, sort, order]);
    useEffect(() => {
        window.history.replaceState(null, null, `/myStore/page=${Page}`);
        getProducts();
    }, [Page]);
    return (
        <section class="shop pt60 pb40">
            <div class="container">
                <div class="row white-bg">
                    <p class="shop-result-count">Showing 1–12 of 23 results</p>
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
                    <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                        {products !== undefined ? products.map((d, i) => (
                            <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
                                {d ?
                                    <a href={`/product/${d._id}`}>
                                        <div class="item">
                                            <img src={d.ProductImage} alt="#" class="contain" />
                                            <h4 class="price"><span class="currency">{d.PriceCoin}$</span>{d.ProductPrice}</h4>
                                            <div class="info hover-bottom">
                                                <h4>{d.ProductName}</h4>
                                                <p>Tags:{d.Tags.map((d, i) => <i> {d} </i>)}</p>
                                            </div>
                                        </div>
                                    </a>
                                    :
                                    ""
                                }
                            </li>
                        )) : "loading"}
                    </ul>
                    <h4>Page: {Page ? Page : "loading"}</h4>

                    <div class="col-md-12 text-center">
                        <ul class="pagination">
                            <li>
                                <a type="button" onClick={(e) => pagination("minus")} aria-label="Previous">
                                    <span aria-hidden="true"><i class="ion-ios-arrow-thin-left"></i></span>
                                </a>
                            </li>
                            <li class="active">
                                <a type="button" onClick={(e) => pagination(1)}>1</a>
                            </li>
                            <li>
                                <a type="button" onClick={(e) => pagination(2)}>2</a>
                            </li>
                            <li>
                                <a type="button" onClick={(e) => pagination(3)}>3</a>
                            </li>
                            <li>
                                <a type="button" onClick={(e) => pagination(4)}>4</a>
                            </li>
                            <li>
                                <a type="button" onClick={(e) => pagination(5)}>5</a>
                            </li>
                            <li>
                                <a type="button" onClick={(e) => pagination("plus")} aria-label="Next">
                                    <span aria-hidden="true"><i class="ion-ios-arrow-thin-right"></i></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MyProducts);
