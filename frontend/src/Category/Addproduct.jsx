import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../commonComponent/Navbar';

const Addproduct = () => {
    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        procategory:'',
        proname:'',
        proshortdesc:'',
        prolongdesc:'',
        pictures:null,
        proprice:'',
        prosellprice:'',
        prosaledate:'',
        prosaleend:'',
    })

    //handel inpute change 
    const handleInputChange =(e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    //hande inpute file change 
    const handleFileChange =(e)=>{
        const file = e.target.files[0];
    setFormData({ ...formData, pictures: file });
    }

    //handel form submit 

    const handleSubmit =async(e)=>{
        e.preventDefault();

        try {
            const formDataToSend =new FormData()
            formDataToSend.append('procategory', formData.procategory);

            formDataToSend.append('proname',formData.proname)
            formDataToSend.append('proshortdesc',formData.proshortdesc)
            formDataToSend.append('prolongdesc',formData.prolongdesc)
            formDataToSend.append('pictures',formData.pictures)
            formDataToSend.append('proprice',formData.proprice)
            formDataToSend.append('prosellprice',formData.prosellprice)
            formDataToSend.append('prosaledate',formData.prosaledate)
            formDataToSend.append('prosaleend',formData.prosaleend)

            const res =await axios.post('http://localhost:5000/pro/addproduct',formDataToSend)
            console.log(res);


        // Clear form after successful submission if needed
        setFormData({procategory:'',
                       proname:'',
                       proshortdesc:'',
                       prolongdesc:'',
                       pictures:null,
                       proprice:'',
                       prosellprice:'',
                       prosaledate:'',
                       prosaleend:''  })


            
            
        } catch (error) {
            console.log('frontend product add failed');
            console.log('error',error);
            
        }

    }


    
   // fetchProducts()
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cat/getcategory');
            setProducts(response.data.users);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            
        }
    };
   // fetchProducts()
    useEffect(() => {

    fetchProducts();
}, []);



  return (
    <div className='prodiv'>
        
        <Navbar/>
        
        
        <h5 className='proh5'>Add product</h5>
        <form  className='proform'  onSubmit={handleSubmit}> 
        <div className='prodiv2'>

            <label className='prolab'> Product category:</label>
            <select className='prosel' onChange={handleInputChange}  name="procategory"  value={formData.procategory}>
                <option className='proops' >Select Category</option>
                {products.map(items=>(
                    
                    <option className='proops1' key={items._id} value={items._id}>{items.producttype}</option>
                ))}

            </select>
        </div>

        <div className='prodiv2'>
            <label className='prolab'> product name:</label>
            <input className='proinput' onChange={handleInputChange} type="text" name="proname"
            value={formData.proname}
             placeholder='Enter product name' />
        </div>

        <div className='prodiv2'> 
        <label className='prolab' > sort Description:</label>
                <textarea  className='proinput' onChange={handleInputChange}
                value={formData.proshortdesc}
                 name="proshortdesc" rows="2" cols="25">
            </textarea>
        </div>


        <div className='prodiv2'>
        <label className='prolab' > sort Description:</label>
                <textarea  className='proinput' onChange={handleInputChange} 
                value={formData.prolongdesc}
                name="prolongdesc" rows="2" cols="25"> 
            </textarea> 
        </div>


        <div className='prodiv2'>
            <label className='prolab'>insert product Image</label>
            <input  className='proinput' type="file"  onChange={handleFileChange}  name="pictures"/>
        </div>

        <div className='prodiv2'>
            <label className='prolab'> product actual price:</label>
            <input  className='proinput' type="text" onChange={handleInputChange}
            value={formData.proprice}
             name="proprice" placeholder='Enter prodcut price'/>
        </div>

        <div className='prodiv2'>
            <label className='prolab'> product selling price</label>
            <input  className='proinput' type="text" onChange={handleInputChange}
            value={formData.prosellprice}
            name="prosellprice" placeholder='enter product selling price' />
        </div>

        
        <div className='prodiv2'>
            <label className='prolab'> product sele date</label>
            <input  className='proinput' type="date" onChange={handleInputChange} 
            value={formData.prosaledate}
            name="prosaledate" placeholder='enter product sale date ' />
        </div>

        
        <div className='prodiv2'>
            <label className='prolab'> product sele end date</label>
            <input  className='proinput' type="date" onChange={handleInputChange} 
            value={formData.prosaleend}
            
            name="prosaleend" placeholder='enter product sale end date ' />
        </div>


        <button className='probtn' type='submit'>Add product</button>



        </form>


    </div>
  )
}

export default Addproduct