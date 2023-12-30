import {Form,Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

export default function Login(){
    return (
        <Form>
            <h3 className="title mt-4 mb-5" id="page-title">Login to Rio Fashion</h3>
            <div className="row">
                <div className="col-sm-4 offset-sm-4 offset-2 col-8">
                    
                    <div className="mb-4">
                        <label htmlFor="username"  className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="form-control" required />
                        <div className="invalid-feedback">Username required</div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password"  className="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter a Password" className="form-control" required />
                        <div className="invalid-feedback">Password required</div>
                    </div>
                    <br/>
                    <div className="title mb-4" id="page-title">
                        New User? &nbsp; <Link to="/Signup">Register Now</Link>
                    </div>

                    <div style={{textAlign: "center"}} className="mb-5">
                        <button className="button btn btn-dark">Login</button>
                    </div>
            
                </div>
            </div>
        </Form>
    );
}