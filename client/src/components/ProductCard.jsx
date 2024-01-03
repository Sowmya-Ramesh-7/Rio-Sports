// import colarTshirt from "./../assets/Images/colarTshirt.jpg"
import ViewBtn from "./ViewBtn";
import CartBtns from "./CartBtns";
import "./ProductCard.css"

function ProductCard({ product, btn ,cardwidth }){
    const discountedPrice=product.price*(100-product.discount)/100;
    console.dir(product)
    let path="/products/"+product._id;
    console.dir(discountedPrice)
    return (
        <div className="card product-card col-xxs-1 col-xxl-6 "  style={{width: cardwidth?cardwidth:"18rem"}}>
            <img src={product.image} className="card-img-top" alt="Product Images" style={{height: cardwidth?"16rem":"20rem"}}/>
            <div className="card-body">
                <p className="card-text">
                    <b>{ product.name }</b><br/>
                    <small className="text-muted" >
                        <b>{discountedPrice.toLocaleString("en-IN",{ style: 'currency', currency: 'INR' })}</b> &nbsp;M.R.P:<span style={{textDecoration:'line-through'}}>{product.price.toLocaleString("en-IN",{ style: 'currency', currency: 'INR' })}</span>
                        <br/><i>Discount: {product.discount}% off</i><br/>
                    </small>
                </p>
                {btn.content==='View Details'?
                    <ViewBtn path={path} content="View Details" />
                    :btn.content==='cart'?<CartBtns/>:""
                }
                
            </div>
        </div>
    )
}

export default ProductCard