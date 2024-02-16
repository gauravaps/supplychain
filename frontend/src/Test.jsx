import axios from 'axios';
import React, { useState } from 'react';

const CategoryAdd = () => {
    const [productname, setproductname] = useState(new FormData());
    const [pictures, setPictures] = useState(null); // File state



    

    const handleFileChange =async (e) => {
        //const file = e.target.files[0];
    
        setPictures(e.target.files[0])
        
        
    };

    const handelinputchange=async(e)=>{
        const{name,value} =e.target;
        setproductname((pre)=>{
            const newformdata=new FormData()
            newformdata.append(name,value)
            return newformdata
        })

    }
    

    const handleSubmit =async (e) => {
        e.preventDefault();

        try {
            if(pictures){
                productname.append('pictures',pictures)
            const res = await axios.post('http://localhost:5000/cat/addcategory', productname);
            console.log(res);
            console.log(productname);

            }else{
                console.log('file loaded failed');
            }
    
            
             

        } catch (error) {
            console.log(error);
            console.log('product add failed..');
            
        }
    };

    return (
        <div>
            <div>
                <div className="login">
                    <h2>
                        <span>Add category product</span>
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Product name:</label>
                        <input type="text" name="productname" placeholder="Enter product name"
                         onChange={handelinputchange} />
                    </div>

                    <div>
                        <label>Select product image:</label>
                        <input type="file" name="pictures" placeholder="Select image" 
                        
                        onChange={handleFileChange} />
                    </div>

                    <button type="submit">Add product</button>
                </form>
            </div>
        </div>
    );
};

//export default CategoryAdd;
