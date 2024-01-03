import {Form, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useUser } from '../contexts/UserContext.jsx';

export default function Signup(){
    const navigate = useNavigate();
    const {setUser}= useUser();

    const [formData, setFormData] = useState({
        fullname:"",
        username:"",
        email:"",
        password:""
    })

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: type === 'file' ? files[0] : value,
        }));
      };

      const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            console.log(formData);
            const response = await axios.post('http://localhost:8080/api/signup', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, 
            });

            if(response.status === 200) {
                toast.success(`Registered Successfully, ${response.data.message} !!`);
                setUser(response.data.user);
                navigate("/");
            }
        }catch(e){
            toast.error(`Failed, ${e.response.data.message} !!`)
            console.error(e);
        }
        

        
    };
  

    return (
        <Form onSubmit={handleSubmit}>
            <h3 className="title mt-4 mb-5" id="page-title">SignUp to Rio Fashion</h3>
            <div className="row">
                <div className="col-sm-4 offset-sm-4 offset-2 col-8">
                    
                    <div className="mb-4">
                        <label htmlFor="fullname"  className="form-label">Full Name</label>
                        <input type="text" id="fullname" name="fullname" placeholder="Enter your Name" className="form-control" required value={formData.fullname} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username"  className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="form-control" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email"  className="form-label">Email</label>
                        <input type="email" id="email" name="email" placeholder="abc@gmail.com" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"  className="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter a Password" className="form-control"  value={formData.password} onChange={handleChange}  required />
                    </div>
                    

                    <div style={{textAlign: "center"}} className="mb-5">
                        <button className="button btn btn-dark" >SignUp</button>
                    </div>
            
                </div>
            </div>
        </Form>
    );
}