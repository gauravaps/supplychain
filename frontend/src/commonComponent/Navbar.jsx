
import React from 'react'; 
import { Link } from 'react-router-dom';
import '../navbar.css'; 
import AdminLogout from '../Admincomponents/AdminLogout';





const Navbar = () => {
    
    

    const adminname=localStorage.getItem('adminname')
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">Supply-Chain</Link>
            </div>
            <div className="navbar-items">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/categoryadd" className="navbar-item"> Category </Link>
                 <span className='name'>Admin:{ adminname}</span>
                <Link className="navbar-item" to={'/adminpassword'}>Change password</Link>
                <AdminLogout/>
            
            
            </div>
        </nav>
    );
}

export default Navbar;
