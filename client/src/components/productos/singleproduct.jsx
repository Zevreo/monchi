import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router";
import Loader from '../utilities/loader';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Converter from "../utilities/converter";
import Gallery from "./relatedprods";
import Swal from 'sweetalert2';

export function SingleProduct(props) {
    const { user } = props.auth;
    const navigate = useNavigate();
    let { id } = useParams();
    const [product, setProduct] = useState()

    function GetSingleProduct() {
        axios.get(`/api/product/${id}`)
            .then(prod => setProduct(prod.data));
    };

    useEffect(() => {
        GetSingleProduct();
    }, []);

    async function AddCart(e) {
        e.preventDefault();
        console.log(e);
        const optionsCount = product.Options.length;
        var ProductOptions = [];
        for (var i = 1; i <= optionsCount; i++) {
            ProductOptions.push(e.target[i].value);
        }
        const { user } = props.auth;
        const { token } = props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user) {
            const CartProduct = {
                UserId: user._id,
                ProductId: id,
                Quantity: Number(e.target[0].value),
                ProductOptions
            };
            await axios.post('/api/cart', CartProduct, config)
                .then(() => {
                    Swal.fire({
                        title: 'Agregado',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 900
                    });
                    navigate('/shoppingcart');
                });
        }
    };
    return (
        <div class="site-wrapper">
            <section class="shop-product pt10 pb40">
                <div class="container">
                    {product ?
                        <div class="row">
                            <div class="col-sm-5 mt40 mb40">
                                <div class=" navigation-thin ">
                                    <div>{product ? <img src={product.ProductImages} class="img-responsive width100" alt="#" /> : <Loader />}</div>
                                </div>
                            </div>
                            <div class="col-sm-7 mt40 mb40 product-details">
                                <ol class="breadcrumb">
                                    {product.Tags.map((d, i) => <Link to={`/results/search=${d}`}> {d} / </Link>)}

                                </ol>
                                <h3>{product ? product.ProductName : "loading..."}</h3>
                                <h4 class="price"><span class="currency">{user ? user.DefaultCoin : product.PriceCoin}</span>${user ? <Converter Current={product.PriceCoin}
                                    Value={product.ProductPrice} Target={user.DefaultCoin} /> : product.ProductPrice}</h4>
                                <p>{product ? product.ProductDescription : "loading..."}</p>
                                <form onSubmit={AddCart}>
                                    <div class="quantity mb20 mt20">
                                        <input type="number" step="1" min="1" defaultValue="1" name="quantity" title="Qty" class="input-text qty text" size="4" />
                                    </div>
                                    <p>Stock: {product.Stock}</p>
                                    {product.Options.length > 0 ?
                                        <>
                                            <h4>Opciones</h4>
                                            {product.Options.map((d, i) => (
                                                <>
                                                    <label>{d.OptionName}</label>
                                                    <select type="text" key={i} required>
                                                        <option default disabled value=''>Elija una opcion</option>
                                                        {d.OptionTypes.map((childData, childIndex) => (
                                                            <option key={childIndex} value={childData}>{childData}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            ))}
                                        </>
                                        : ''}
                                    {product.Status == "Active" ?
                                        <button className="btn btn-lg" type="submit">Agregar al carrito</button>
                                        :
                                        `Publication is ${product.Status}`
                                    }
                                </form>
                            </div>
                        </div>
                        : <Loader />}
                </div>
            </section>
            <section class="pb40">
                <div class="container">
                    <div class="row white-bg">
                        <div class="col-md-12 section-heading">
                            <h5>You May Also Like</h5>
                            <h3>Related Products</h3>
                        </div>
                        <div class="pt80 pb20">
                            {product ? <Gallery precio={product.ProductPrice} /> : <Loader />}
                        </div>
                    </div>
                </div>
            </section>
            <a id="back-to-top"><i class="icon ion-chevron-up"></i></a>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(SingleProduct);