import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Converter from '../utilities/converter';
import Loader from '../utilities/loader';

const ProductCard = props => {
    const { Product, Key } = props;
    const { user } = props.auth;
    return (
        <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '25px' }} key={Key}>
            <Link to={`/product/${Product._id}`}>
                <div class="item">
                    <img src={Product.ProductImages[0]} alt="#" class="contain" />
                    <h4 class="price">
                        <span class="currency">{user ? user.DefaultCoin : Product.PriceCoin}$</span>
                        {user ? <Converter Current={Product.PriceCoin} Value={Product.ProductPrice} Target={user.DefaultCoin} /> : Product.ProductPrice}
                    </h4>
                    <div class="info hover-bottom">
                        <h4>{Product.ProductName}</h4>
                        <p>Tags:{Product.Tags.map((d, i) => <i key={i}> {d} </i>)}</p>
                    </div>
                </div>
            </Link>
            aqui
        </li>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProductCard, Loader);
