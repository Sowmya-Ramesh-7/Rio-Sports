import NavBar from "./NavBar"
import logo from './../../assets/Images/logo.jpg'
import './Header.css'

export default function Header(){
    return (
        <header>
            <div className="container-fluid header">
                <div>
                    <img className="navbar-brand logo" src={logo} alt="Rio Sports" style={{height:5+'rem'}}/>
                    <span className="navbar-brand title">Rio Sports</span>
                </div>
                <form className="d-flex" method="get">
                    <input className="form-control me-2" name="q" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-danger" type="submit">Search</button>
                </form>
            </div>
            <NavBar/>
        </header>
    );
}
