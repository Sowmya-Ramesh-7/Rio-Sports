import './NavBar.css'
import { NavLink , Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify';
import { useUser } from '../../contexts/UserContext.jsx';

export default function NavBar(){
    const {user,setUser}= useUser();
    console.log(user)
    const logout=async()=>{
        try{
            const response=await toast.promise(axios.get("http://localhost:8080/api/logout"),
            {
                "success":"Logout Successful !!",
                "error":"Logout Unsuccessful,Try Again !!"
            });
            setUser(null)
            navigate("/")
        } catch(e){
            toast.error("Logout Unsuccessful !!")
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className={({isActive})=>
                            [
                                isActive? "active":"",
                                "nav-link"
                            ].join(" ")
                        }
                      to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive})=>[
                                isActive? "active":"",
                                "nav-link"
                            ].join(" ")} 
                        to="/products">Explore</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" 
                        id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><NavLink className={({isActive})=>[
                                isActive? "active-dropdown":"",
                                "dropdown-item"
                            ].join(" ")} 
                            to="/products?category=Casual">Casual</NavLink>
                        </li>
                        <li><NavLink className={({isActive})=>[
                                isActive? "active-dropdown":"",
                                "dropdown-item"
                            ].join(" ")}  to="/products?category=Party Wear">Party Wear</NavLink></li>
                        
                        <li><NavLink className={({isTransitioning})=>[
                                isTransitioning? "active-dropdown":"",
                                "dropdown-item"
                            ].join(" ")}  to="/products?category=Formal">Formal</NavLink></li>

                        <li><NavLink className={({isTransitioning})=>[
                                isTransitioning? "active-dropdown":"",
                                "dropdown-item"
                            ].join(" ")}  to="/products?category=Ethnic">Ethnic</NavLink></li>
                        <li><NavLink className={({isTransitioning})=>[
                                isTransitioning? "active-dropdown":"",
                                "dropdown-item"
                            ].join(" ")}  to="/products?category=Western">Western</NavLink></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive})=>[
                                isActive? "active":"",
                                "nav-link"
                            ].join(" ")} 
                         to="/products">
                       Latest
                    </NavLink>
                    </li>
                </ul>
                </div>
                <div className='right'>
                {(!user)?
                <NavLink style={{display:"flex"}} className={({isActive})=>
                            [
                                isActive? "active":"",
                                "nav-link"
                            ].join(" ")
                        }
                      to="/login">
                        <p>Login/Signup&nbsp;</p> <i className="fa-solid fa-circle-user" style={{ fontSize:"1.5rem"}}></i> 
                </NavLink>:
                <NavLink style={{display:"flex"}} className={({isActive})=>
                            [
                                isActive? "active":"",
                                "nav-link"
                            ].join(" ")
                        }
                    onClick={{logout}}>
                        <p>Logout&nbsp;</p> <i className="fa-solid fa-circle-user" style={{ fontSize:"1.5rem"}}></i> 
                </NavLink>}
                <NavLink className={({isActive})=>
                        [
                            isActive? "active":"",
                            "nav-link"
                        ].join(" ")
                    }
                    to="userid/cart">
                    <i className="fa-solid fa-cart-shopping" style={{ fontSize:"1.5rem"}}></i> 
                </NavLink>
                </div>
            </div> 
        </nav>
    )
}