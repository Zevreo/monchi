import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../utilities/loader';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleOnDragStart = e => e.preventDefault();

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 }
};

export function Gallery(props) {
    const [products, setProducts] = useState([]);
    let pusheado=false;
    
    console.log(products)
    async function getProductsByPrice() {
        const { precio } = props;
        await axios.get(`/api/product/searchbyprecio/${precio}`)
            .then(prod => {
                setProducts(prod.data);
               })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if(pusheado==false){
            pusheado=true;
            getProductsByPrice();
        }
        
    }, [])
    
    return (
        <div>
            <AliceCarousel
                mouseTracking
                // disableDotsControls
                // disableButtonsControls
                // activeIndex={activeIndex}
                responsive={responsive}
                mouseDragEnabled
            >
                {products? products.map((d,i)=>
                <img src={d.ProductImages[0]} className="contain"  onDragStart={handleOnDragStart} ></img>
                ):"webos"}

            </AliceCarousel>
       </div>   
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Gallery);