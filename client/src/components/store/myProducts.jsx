import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Pagination from "../utilities/Pagination";
import Filters from "../utilities/Filters";

export function MyProducts(props) {
    const [Page, setPage] = useState(1)
    const [limit, setLimit] = useState(12);
    const [sort, setSort] = useState("updatedAt");
    const [order, setOrder] = useState(-1)
    const [count, setCount] = useState();
    const [products, setProducts] = useState([]);
    const [maxPage, setMax] = useState(1);
    const [disable, setDisable] = useState(false);

    function getProducts() {
        const { Store } = props;
        const config = {
            headers: {
                "page": Page,
                "limit": limit,
                "sort": sort,
                "order": order
            }
        }
        axios.get(`/api/product/store/${Store._id}`, config)
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
    }, [products]);

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

    return (
        <div class="container">
            <div class="row white-bg">
                <p class="shop-result-count">Showing {floor} to {ceil} of {count} results</p>
                <Filters setSort={setSort} setLimit={setLimit} setOrder={setOrder} disable={disable} />
                <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                    {products.map((d, i) => (
                        <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
                            <Link to={`/product/${d._id}`}>
                                <div class="item">
                                    <img src={d.ProductImages[0]} alt="#" class="contain" />
                                    <h4 class="price"><span class="currency">{d.PriceCoin}$</span>{d.ProductPrice}</h4>
                                    <h3 class="price pt20"><span class="currency">Stock: </span>{d.Stock}</h3>
                                    <div class="info hover-bottom">
                                        <h4>{d.ProductName}</h4>
                                        <p>Tags:{d.Tags.map((d, i) => <i> {d} </i>)}</p>
                                        <Link to={`/editProduct/${d._id}`} class="btn btn-dark btn-sm btn-appear mt20">Editar</Link>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div class="col-md-12 text-center">
                    <Pagination Page={Page} maxPage={maxPage} disable={disable} setDisable={setDisable} setPage={setPage} />
                </div>
            </div>
        </div>
    )
}
export default MyProducts;
