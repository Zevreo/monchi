import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../utilities/loader';
import { Link } from "react-router-dom";
import Converter from "../utilities/converter";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';



const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 }
};

const items = [
    <img src="https://img.fotocommunity.com/atardecer-d96880eb-c839-482f-a209-70fe2cc8ff4d.jpg?height=1080"/>,
    <img src="https://img.fotocommunity.com/atardecer-d96880eb-c839-482f-a209-70fe2cc8ff4d.jpg?height=1080"/>,
    <img src="https://img.fotocommunity.com/atardecer-d96880eb-c839-482f-a209-70fe2cc8ff4d.jpg?height=1080"/>,
    <img src="https://img.fotocommunity.com/atardecer-d96880eb-c839-482f-a209-70fe2cc8ff4d.jpg?height=1080"/>
];
const createItems = (length, [handleClick]) => {
    let deltaX = 0;
    let difference = 0;
    const swipeDelta = 20;

    return Array.from({ length }).map((item, i) => (
        <div
            className="item"
            onMouseDown={(e) => (deltaX = e.pageX)}
            onMouseUp={(e) => (difference = Math.abs(e.pageX - deltaX))}
            onClick={() => (difference < swipeDelta) && handleClick(i)}
        >
             <img src="https://img.fotocommunity.com/atardecer-d96880eb-c839-482f-a209-70fe2cc8ff4d.jpg?height=1080" class="carouselimage"/>
        </div>
    ));
};
export function Gallery (props) {
    const [products, setProducts] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const [items] = useState(createItems(5, [setActiveIndex]));

    function getProductsByPrice(){
        const{precio}=props;
        axios.get(`/api/searchbyprecio/${precio}`)
         .then(prod=>setProducts(prod.data));
         console.log(products);
    }

    return [
        <AliceCarousel
            mouseTracking
            disableDotsControls
            disableButtonsControls
            items={items}
            activeIndex={activeIndex}
            responsive={responsive}
        />,

    ];
}

export default Gallery;