

export function ProductCard(props) {
    const { Product } = props.product;
    return(
    <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
    <Link to={`/product/${Product._id}`}>
        <div class="item">
            <img src={Product.ProductImage} alt="#" class="contain" />
            <h4 class="price">
                <span class="currency">{user ? user.DefaultCoin : Product.PriceCoin}$</span>
                {user ? <Converter Current={Product.PriceCoin} Value={Product.ProductPrice} Target={user.DefaultCoin} /> : Product.ProductPrice}
            </h4>
            <div class="info hover-bottom">
                <h4>{Product.ProductName}</h4>
                <p>Tags:{Product.Tags.map((d) => <i> {d} </i>)}</p>
            </div>
        </div>
    </Link>
    <li className="relative col-md-12 center-items"><Loader /></li>
</li>
)
    
}
export default ProductCard;