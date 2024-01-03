import {Form,Link, useNavigate} from 'react-router-dom'
import { useUser } from '../contexts/UserContext.jsx';
import { useState } from 'react';

import axios from 'axios';
import {toast} from 'react-toastify';

export default function Login(){
    const navigate = useNavigate();
    const {setUser}= useUser();

    const [formData, setFormData] = useState({
        username:"",
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
            const response = await axios.post('http://localhost:8080/api/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, 
            });

            if(response.status === 200) {
                toast.success(`Login Successful, ${response.data.message} !!`);
                console.log(response.data.user)
                setUser(response.data.user);
                navigate("/");
            }
        }catch(e){
            toast.error(`Login Failed, Unauthorized user!! Check Your Credentials or Register Now`)
            console.error(e);
        }
        

        
    };
  

    return (
        <Form onSubmit={handleSubmit}>
            <h3 className="title mt-4 mb-5" id="page-title">Login to Rio Fashion</h3>
            <div className="row">
                <div className="col-sm-4 offset-sm-4 offset-2 col-8">
                    
                    <div className="mb-4">
                        <label htmlFor="username"  className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="form-control" value={formData.username} onChange={handleChange} required />
                        <div className="invalid-feedback">Username required</div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password"  className="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter a Password" className="form-control" value={formData.password} onChange={handleChange} required />
                        <div className="invalid-feedback">Password required</div>
                    </div>
                    <br/>
                    <div className="title mb-4" id="page-title">
                        New User? &nbsp; <Link to="/signup">Register Now</Link>
                    </div>

                    <div style={{textAlign: "center"}} className="mb-5">
                        <button className="button btn btn-dark">Login</button>
                    </div>
            
                </div>
            </div>
        </Form>
    );
}