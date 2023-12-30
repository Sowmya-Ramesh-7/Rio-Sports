const ProductReducer=(state,action)=>{
    switch(action.type){
        case "SET_LOADING": return {
            ...state,
            isLoading:true,
            error:null
        };
        case "SET_API_DATA":return{
            ...state,
            isLoading:false,
            isError:false,
            error:null,
            products:action.payload,
        } 
        case "API_ERROR": return {
            ...state,
            isLoading:false,
            isError:true,
            error:action.payload
        }
        
        default: return state;
    }
}

export default ProductReducer;