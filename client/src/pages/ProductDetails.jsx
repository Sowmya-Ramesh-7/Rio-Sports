import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { Form } from 'react-router-dom';

import './ProductDetails.css'



export default function ProductDetails() {
  let { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productData = response.data;
        console.log(productData);
        setProductData(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getSingleProduct();
  }, [id]);

  if (loading) {
    return <Loading/>;
  }

    const discountedPrice = productData.price * (100 - productData.discount) / 100;

    const handleSubmit = async(event) => {
      event.preventDefault();

      const response = await axios.post(`http://127.0.0.1:5001/api/userid/cart/${productData._id}`,{
          headers: {
              'Content-Type': 'multipart/form-data',
          }, 
      });
      if (response.status === 200) {
          console.log('Form submitted successfully');
          getProducts();
          navigate("/userid/cart");
      } else {
          console.error('Form submission failed');
      }
  };

  return (
    <div className="row product-details mt-5 mb-5" >
        <div className="col-5 p-5">
            <img src={productData.image} className="card-img-top" alt="Product Image" style={{ width:'80%' }} />
        </div>
        <div className="col-5">
          <div className="title mb-4"  id="page-title">
              <h3>{productData.name}</h3>
          </div>
          <p>
              <h4>{discountedPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}&emsp;
              <i><span style={{ fontSize:0.9+'rem' }} className='text-muted'>Discount: {productData.discount}% off </span></i> </h4> &nbsp;M.R.P:
              <span style={{ textDecoration: 'line-through' }}>
              {productData.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </span>
              <p className="card-text mt-1"><b> Description: </b>{productData.description}</p>
              <small className="text-muted"> 
                  <span className="tag">Suitable For: { productData.gender}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="tag">Category: { productData.category}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
              </small>
          </p><br/>
          <Form action={`/products/${id}/edit`}>
            <button className="btn btn-danger product-link">Edit</button>
          </Form>
          <br/>
          <Form onSubmit={handleSubmit}>
            <button className="button btn btn-dark product-link">Add to Cart</button>
          </Form>  
        </div>
    </div>
  );
}