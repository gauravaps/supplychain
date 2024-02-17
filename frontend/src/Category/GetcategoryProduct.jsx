import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../commonComponent/Navbar';

const GetcategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

   
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
       // fetchProducts()
        useEffect(() => {

        fetchProducts();
    }, []);

    // Delete product

    const deleteproduct=async(id)=>{
        try {
            const res =await axios.delete(`http://localhost:5000/cat/deletecategory/${id}`);

            if(res.data.sts===0){
                console.log('product deleted successfully');
                fetchProducts()

                

            }

            
        } catch (error) {
            console.log('product failed to delete');
            console.log('error',error);
            
        }
    }







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
                            <button onClick={()=>deleteproduct(product._id)} className='prodelete'>Delete</button>
                        </div>
                        
                    ))}
                </div>
            )}
        </div>
    );

}

export default GetcategoryProduct