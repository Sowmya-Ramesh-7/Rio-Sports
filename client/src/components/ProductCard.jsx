import colarTshirt from "./../assets/Images/colarTshirt.jpg"
import "./ProductCard.css"

function ProductCard(){
    let a=10;

    return (
        <div className="card product-card" style={{width: 18 +'rem'}}>
        <img src={colarTshirt} className="card-img-top product-img" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        </div>
    )
}

export default ProductCard