import ProductCard from "../components/ProductCard";
import {useProduct} from "../contexts/ProductContext";
import { useErrorBoundary } from "react-error-boundary";
import './Products.css'

export default function Products(){
    const {isLoading, isError, products,error}=useProduct();
    const { showBoundary } = useErrorBoundary();
    if(isLoading){
        return (
            <center>
                <br/>
                <i className="fas fa-spinner fa-pulse" style={{color: "#8a0022",fontSize:3+'rem'}}></i>
            </center>
        );
    }
    if(isError){
        showBoundary(error);
    }
    console.log(products)
    return (
        <div className="prod-container row row-cols-lg-4 row-cols-xs-2 row-cols-sm-3 mb-3 ms-sm-3 ms-xs-1 me-1">
            {products.map((product)=>{
                return(
                    <ProductCard key= {product.id} product={{...product}} />
                );
            })}
        </div>
    );
}