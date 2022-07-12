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

const createItems = (length, [handleClick],products) => {


    return Array.from({ length }).map((item, i) => (
        <div
            className="item"

        >
            <div>
            {products? products.map((d,i)=>
                        <img src={d.ProductImages[0]} class="carouselimage" alt="a"/>

            ):"loading"}

            </div>
            
        </div>
    ));
};

export function Gallery(props) {
    const [products, setProducts] = useState(null);
        const [activeIndex, setActiveIndex] = useState(0);
        const items = items = useState(createItems(products.length, [setActiveIndex],products));
   
    if (Array.isArray(products) && products.length > 0) {
       
        // items.push(

        // <div>
        //     |
        //     {products ? products.map((d, i) =>

        //         <div class="item">
        //             <img src={d.ProductImages[0]} class="contain" alt="a" />
        //         </div>


        //     ) : "Loading"}

        //     <p>
        //         {products ? products.length : 0}
        //     </p>
        // </div>
        // )
    }




    console.log(products)
    async function getProductsByPrice() {
        const { precio } = props;
        await axios.get(`/api/product/searchbyprecio/${precio}`)
            .then(prod => setProducts(prod.data));
    }

    useEffect(() => {
        getProductsByPrice();
    }, [])

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