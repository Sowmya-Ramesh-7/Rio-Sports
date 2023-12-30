import {Form,Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
export default function Signup(){
    return (
        <Form>
            <h3 className="title mt-4 mb-5" id="page-title">SignUp to Rio Fashion</h3>
            <div className="row">
                <div className="col-sm-4 offset-sm-4 offset-2 col-8">
                    
                    <div className="mb-4">
                        <label htmlFor="fullname"  className="form-label">Full Name</label>
                        <input type="text" id="fullname" name="fullname" placeholder="Enter your Name" className="form-control" required />
                        <div className="invalid-feedback">Name required</div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username"  className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="form-control" required />
                        <div className="invalid-feedback">Username required</div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email"  className="form-label">Email</label>
                        <input type="email" id="email" name="email" placeholder="abc@gmail.com" className="form-control" required />
                        <div className="invalid-feedback">Please enter a valid email address</div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"  className="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter a Password" className="form-control" required />
                        <div className="invalid-feedback">Enter a strong password</div>
                    </div>
                    

                    <div style={{textAlign: "center"}} className="mb-5">
                        <button className="button btn btn-dark">SignUp</button>
                    </div>
            
                </div>
            </div>
        </Form>
    );
}