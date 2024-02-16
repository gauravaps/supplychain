import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../commonComponent/Navbar';

const GetcategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cat/getcategory');
                setProducts(response.data.users);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='div1'>
            <Navbar/>
            
            <h2 className='prohead'>Products category</h2>
            {loading ? (
                <p className='loading'>Loading products...</p>
            ) : (
                <div className='div2'>
                    {products.map((product) => (
                        <div className='div3' key={product._id}>
                            <img className='proImg' src={`http://localhost:5000/uploads/${product.pictures}`} 
                             alt={product.productname} />
                            
                            <h3 className='proname'>Name:{product.productname}</h3>
                            <p className='protype'>Type: {product.producttype}</p>
                            <button className='prodelete'>Delete</button>
                        </div>
                        
                    ))}
                </div>
            )}
        </div>
    );

}

export default GetcategoryProduct