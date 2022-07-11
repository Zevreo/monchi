import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../utilities/loader';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';



const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 }
};

const createItems = (length, [handleClick]) => {


    return Array.from({ length }).map((item, i) => (
        <div
            className="item"
          
        >
             <img src="https://img.fotocommunity.com/atardecer-d96880eb-c839-482f-a209-70fe2cc8ff4d.jpg?height=1080" class="carouselimage" alt="a"/>
        </div>
    ));
};
export function Gallery (props) {
    const [products, setProducts] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [items] = useState(createItems(products, [setActiveIndex]));
    console.log(products)
    async function getProductsByPrice() {
        const{precio}=props;
        await axios.get(`/api/product/searchbyprecio/${precio}`)
         .then(prod=>setProducts(prod.data));
    }
    
    useEffect(()=>{
        getProductsByPrice();
    },[]) 

    return [
        <AliceCarousel
            mouseTracking
            // disableDotsControls
            // disableButtonsControls
            items={items}
            // activeIndex={activeIndex}
            responsive={responsive}
        />,

    ];
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Gallery);