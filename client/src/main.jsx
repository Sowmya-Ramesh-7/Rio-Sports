import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import CreateProductForm from './pages/CreateProductForm.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import axios from 'axios'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />}/>
      <Route path="products" >
        <Route 
        path="" 
        element={<Products/>}
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