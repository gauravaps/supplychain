import React from 'react';
import { Link } from 'react-router-dom';


const Selectbtn = () => {

    return (
    
        <ul className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
    </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item" href="/categoryadd">Add Category</a> 
        <a className="dropdown-item" href="/addproduct">Add Product</a>
    </div>
</ul>



            

        
      );
  
}

export default Selectbtn;
