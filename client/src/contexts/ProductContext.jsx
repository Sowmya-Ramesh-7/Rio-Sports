import { createContext, useContext, useEffect,useReducer} from "react";
import axios from 'axios'
import reducer from '../reducer/productReducer.js'

const ProductContext=createContext();

const initialState={
    isLoading:false,
    isError:false,
    error:null,
    products:[]
}

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getProducts = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = await response.data;
        console.log(allProducts);
        dispatch({ type: "SET_API_DATA", payload: allProducts });
      } catch (error) {
        dispatch({ type: "API_ERROR",payload:error });
      }
    };

    
    useEffect(() => {
      getProducts();
    }, [dispatch]); 
  
    return (
      <ProductContext.Provider value={{ ...state, getProducts }}>
        {children}
      </ProductContext.Provider>
    );
  };

function useProduct(){
    return useContext(ProductContext);
}

export {ProductProvider,ProductContext,useProduct}


