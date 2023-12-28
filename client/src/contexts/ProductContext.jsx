import { createContext, useContext, useEffect,useReducer} from "react";
import axios from 'axios'
import reducer from '../reducer/productReducer.js'
import Products from "../pages/Products.jsx";
import CreateProductForm from "../pages/CreateProductForm.jsx";

const ProductContext=createContext();

const initialState={
    isLoading:false,
    isError:false,
    error:null,
    products:[]
}

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
      const getProducts = async ( category) => {
        dispatch({ type: "SET_LOADING" });
        try {
          if(!category){
            
          }
          const response = await axios.get('http://localhost:5000/api/products');
          const allProducts = await response.data;
          console.log("all products"+allProducts);
          dispatch({ type: "SET_API_DATA", payload: allProducts });
        } catch (error) {
          dispatch({ type: "API_ERROR",payload:error });
        }
      };
  
      getProducts();
    }, [Products,CreateProductForm]); 
  
    return (
      <ProductContext.Provider value={{ ...state }}>
        {children}
      </ProductContext.Provider>
    );
  };

function useProduct(){
    return useContext(ProductContext);
}

export {ProductProvider,ProductContext,useProduct}


