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
const handleOnDragStart = e => e.preventDefault();

export function Gallery(props) {
    const [products, setProducts] = useState(null);
    const [pusheado, setPusheado] = useState(false);
    
    

    async function getProductsByPrice() {
        const { precio } = props;
        await axios.get(`/api/product/searchbyprecio/${precio}`)
            .then(prod => setProducts(prod.data));
    }

    useEffect(() => {
        if(pusheado===false){
            getProductsByPrice();
            setPusheado(true)
        }
        
    }, [])

    return [
       <div>
         <AliceCarousel
            mouseTracking
            // disableDotsControls
            // disableButtonsControls
            // activeIndex={activeIndex}
            responsive={responsive}
        >
            {products? products.map((d,i) =>
            <div>
                
                 <img src={d.ProductImages[0]} alt="#" class="contain" onDragStart={handleOnDragStart}/>
                
            </div>):"loading"}
        </AliceCarousel>

       </div>
    ];
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Gallery);