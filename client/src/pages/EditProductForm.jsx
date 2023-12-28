import {Form, useNavigate} from 'react-router-dom'
import { useState } from 'react';

export default function EditProductForm(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        category: '',
        price: '',
        gender: '', 
        discount: 0,
      });

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: type === 'file' ? files[0] : value,
        }));
      };

  
    const handleSubmit = async(event) => {
        event.preventDefault();

        const formDataObject = new FormData();
        for (const key in formData) {
            formDataObject.append(key, formData[key]);
        }

        console.log(formData);
        const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200) {
        console.log('Form submitted successfully');

        console.log(response.data);
      } else {
        console.error('Form submission failed');
      }
  };
  
  
    return (
        //method and action attribute is defined in the javascript code hence its not defined in form tag 
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-8 offset-2">
                    <div className="mb-4 mt-4">
                        <label htmlFor="name"  className="form-label">Product Name</label>
                        <input type="text" id="name" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Enter the Product Description</label>
                        <textarea name="description" id="description" rows="3" placeholder="About the Product" required  value={formData.description} onChange={handleChange}  className="form-control"></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="form-label">Upload an Image</label><br/> 
                        <input type="file" id="image" name="image" accept="image/jpeg, image/jpg, image/png" onChange={handleChange}  required className="form-control-file"/>  
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select id="category" name="category" className="form-select"  onChange={handleChange}  required >
                            <option value="">-- Select the Category --</option>
                            <option value="Casual">Casual</option>
                            <option value="Party Wear">Party Wear</option>
                            <option value="Formal">Formal</option>
                            <option value="Ethnic">Ethnic</option>
                            <option value="Western">Western</option>
                        </select>
                    </div> 

                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">Gender</label>
                        <select id="category" name="category" className="form-select"  onChange={handleChange} required >
                            <option value="">-- Select the Category --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Kids">Kids</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div> 
                    
                        <div className="mb-4 col-4">
                            <label htmlFor="price" className="form-label">Price </label>
                            <input type="text" id="price" name="price"  placeholder="eg- '200'"  value={formData.price} onChange={handleChange}  className="form-control" required/>
                        </div>
                    <div className='row'>
                        <div className="mb-4 col-5" >
                            <label htmlFor="discount" className="form-label">Discount</label>
                            <input type="range" id="discount" name="discount" min="0" max="100" className="form-range" title="Move the slider to set the discount %" value={formData.discount} onChange={handleChange}  required />
                        </div>
                        <div className="mb-4 col-5 offset-1">
                            <fieldset className="border p-3 m-2 "> 
                                <output>Discount = {formData.discount +" %"} &emsp; Selling Price= {formData.price*(100-formData.discount)/100}</output>
                            </fieldset>
                        </div>
                    </div>

                    <div className="mb-5">
                        <button className="btn btn-dark">ADD</button>
                    </div>

                </div>
            </div>
        </Form>
    );
}


