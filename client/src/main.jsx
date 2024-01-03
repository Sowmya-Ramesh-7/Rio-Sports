import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import CreateProductForm from './pages/CreateProductForm.jsx'
import EditProductForm from './pages/EditProductForm.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'



const ProductDetailsWrapper = () => {

  const navigate = useNavigate();
  const handlePut = (id) => {
    navigate(`/products/${id}/edit`);
  };

  return <ProductDetails onPut={handlePut} />;
};

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />}/>
      <Route path="login" element={<Login />}/>
      <Route path="signup" element={<Signup />}/>
      <Route path="products" >
        <Route 
        path="" 
        element={<Products/>}
        />
        <Route
        path=":id"
        element={<ProductDetails/>}
        />
        <Route
        path=":id/edit"
        element={<EditProductForm/>}
        />
        <Route 
        path="?category=:categoryName"
        element={<Products/>}
        />
        <Route 
        path="new" 
        element={<CreateProductForm />}
        />
      </Route>
      <Route path="userid/cart"  element={<Cart />}/>
      <Route path="app" element={<App />}/>
      <Route path="*" element={<PageNotFound />} errorElement/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
// action={async ({ request, params }) => {
        //   switch (request.method) {
        //     case "POST": {
        //       let formData = await request.formData();
        //       console.log(formData.get('name'));
        //       return;
        //     }
            // case "DELETE": {
            //   return fakeDeleteProject(params.id);
            // }
            // default: {
            //   throw new Response("", { status: 405 });
            // }
        //   }
        // }}