
import React, { useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import '../navbar.css'; 
import AdminLogout from '../Admincomponents/AdminLogout';
import Selectbtn from './Selectbtn';


const Navbar = () => {
    
        

 

    const adminname=localStorage.getItem('adminname')

    return (
        <div>        
        <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/adminhome" className="navbar-logo">Supply-Chain</Link>
        </div>
        <div className="navbar-items">
            <Link to="/adminhome" className="navbar-item">Home</Link>
        
            <Selectbtn/>
     

            
        
            
             <span className='name'>Admin:{ adminname}</span>
            <Link className="navbar-item" to={'/adminpassword'}>Change password</Link>
            <AdminLogout/>
        
        
        </div>
         </nav>
        </div>
    );
}

export default Navbar;
