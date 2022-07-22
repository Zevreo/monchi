import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import Loader from "../utilities/loader";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Converter from "../utilities/converter";
import { useNavigate } from "react-router";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

export function Gallery(props) {
    let navigate=useNavigate();
  const { user } = props.auth;
  const [products, setProducts] = useState([]);
  let pusheado = false;

  console.log(products);
  async function getProductsByPrice() {
    const { precio } = props;
    await axios
      .get(`/api/product/searchbyprecio/${precio}`)
      .then((prod) => {
        setProducts(prod.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (pusheado == false) {
      pusheado = true;
      getProductsByPrice();
    }
  }, []);

  return (
    <div>
      <AliceCarousel
        mouseTracking
        // disableDotsControls
        // disableButtonsControls
        // activeIndex={activeIndex}
        responsive={responsive}
      >
        {products
          ? products.map((d, i) => (
              <div
                class="shop-items portfolioContainer col-md-12 height-auto margin row"
                style={{ padding: "15px" }}
              >
                <a href={`/product/${d._id}`}>
                <img
                    src={d.ProductImages[0]}
                    className="contain"
                  />
                </a>
                  <h4 class="price">
                    <span class="currency">
                      {user ? user.DefaultCoin : d.PriceCoin}$
                    </span>
                    {user ? (
                      <Converter
                        Current={d.PriceCoin}
                        Value={d.ProductPrice}
                        Target={user.DefaultCoin}
                      />
                    ) : (
                      d.ProductPrice
                    )}
                  </h4>
                  <div class="info hover-bottom">
                    <h4>{d.ProductName}</h4>
                    <p>
                      {d.Tags.map((d, i) => <Link to={`/results/search=${d}`}> {d} / </Link> )}
                    </p>
                  </div>
                  
              </div>
            ))
          : <Loader/>}
      </AliceCarousel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Gallery);
