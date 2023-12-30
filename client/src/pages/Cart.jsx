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
        

        <div className="prod-container row row-cols-lg-4 row-cols-xs-2 row-cols-sm-3 mb-3 ms-sm-3 ms-xs-1 me-1">
            {products.map((product)=>{
                return(
                    <ProductCard key= {product.id} product={{...product}} btn={{content:"cart"}}/>
                );
            })}
        </div>
    );
}