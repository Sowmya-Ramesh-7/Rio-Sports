import './NavBar.css'
import { NavLink , Link} from 'react-router-dom'

export default function NavBar(){
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
            </div> 
        </nav>
    )
}