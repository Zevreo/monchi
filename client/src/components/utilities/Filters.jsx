import React from "react";

export function Filters(props) {
    return (
        <>
            <select class="shop-sorting bg-dark-2" onChange={(e) => props.setSort(e.target.value)} disabled={props.disable}>
                <option value="Stock">Monchi's Choice</option>
                <option value="updatedAt">Date</option>
                <option value="ProductPrice">Price</option>
            </select>
            <select class="shop-sorting bg-dark-2" onChange={(e) => props.setOrder(e.target.value)} disabled={props.disable}>
                <option value={-1}>Descending</option>
                <option value={1}>Ascending</option>
            </select>
            <select class="shop-sorting bg-dark-2" onChange={(e) => props.setLimit(e.target.value)} disabled={props.disable}>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
            </select>
        </>
    )
}
export default Filters;
