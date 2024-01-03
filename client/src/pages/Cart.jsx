import ProductCard from "../components/ProductCard";
import {useProduct} from "../contexts/ProductContext";
import { useErrorBoundary } from "react-error-boundary";
import './Products.css'
import Loading from "../components/Loading";

export default function Products(){
    const {isLoading, isError, products,error}=useProduct();
    const { showBoundary } = useErrorBoundary();
    if(isLoading){
        return (
            <Loading/>
        );
    }
    if(isError){
        showBoundary(error);
    }
    console.log(products)
    return (
        <>
        <div className="title mb-4 mt-4"  id="page-title">
            <h1>Your Cart</h1>
        </div>
        
        <div className="prod-container row row-cols-lg-6 row-cols-xs-4 row-cols-sm-5 mb-3 ms-sm-3 ms-xs-1 me-1">
            {products.map((product)=>{
                return(
                    <ProductCard key= {product.id} product={{...product}} cardwidth="14rem" btn={{content:"cart"}}/>
                );
            })}
        </div>

        <div className="mb-5">
            <center><button className="btn btn-dark">ORDER NOW  <i class="fa-solid fa-left-long"></i></button></center>
        </div>
        </>
    );
}