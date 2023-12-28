import colarTshirt from "./../assets/Images/colarTshirt.jpg"
import "./ProductCard.css"
import {Link} from 'react-router-dom'
function ProductCard({ product }){
    const discountedPrice=product.price*(100-product.discount)/100;
    console.dir(product)
    console.dir(discountedPrice)
    return (
        <div className="card product-card col-xxs-1 col-xxl-6 "  style={{width: 18 +'rem'}}>
            <img src="{ product.image.url}" className="card-img-top" alt="Product Images" style={{height: 18 +'rem'}}/>
            <div className="card-body">
                <p className="card-text">
                    <b>{ product.name }</b><br/>
                    <small className="text-muted" >
                        <b>{discountedPrice.toLocaleString("en-IN",{ style: 'currency', currency: 'INR' })}</b> &nbsp;M.R.P:<span style={{textDecoration:'line-through'}}>{product.price.toLocaleString("en-IN",{ style: 'currency', currency: 'INR' })}</span>
                        <br/><i>Discount: {product.discount}% off</i><br/>
                    </small>
                </p>
                <Link to="/products/product.id" className="button btn btn-dark product-link">View Details</Link> 
            </div>
        </div>
    )
}

export default ProductCard