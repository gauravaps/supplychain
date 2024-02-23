import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../commonComponent/Navbar'

const GetProducts = () => {
    const [getproduct,setgetproduct] =useState([]);
    const [searchtext, setsearchtext] = useState('');
    const[getmultipleId,setgetmultipleId] =useState([])
    const [selectedstatus,setselectedstatus]=useState('')
    const [cartvalue,setcartvalue]=useState([])



    

    const getallproduct =async()=>{

        try {
            const res =await axios.get(`http://localhost:5000/pro/getproduct`)

            if(res.data.sts ===0){
                setgetproduct(res.data.prodata)
            }
           // console.log(res);
            console.log(getproduct);
            
        } catch (error) {
            console.log(' products found error');
            console.log('getproduc error',error);
            
        }
    }

    useEffect(()=>{
        getallproduct()
    },[])

    //filter function 
    const filterproduct =getproduct.filter((pro)=>(pro.proname.toLowerCase().includes(searchtext.toLowerCase())))

    //filter product using by status
    const againfilter = filterproduct.filter(prod => {
        if (selectedstatus) {
        
            return prod.prostatus === selectedstatus;
        

        } else {
            return true; 
        }
    });
    


    //handel status change
    const handelchangestatus =(productId) =>{
        const updatedIds =getmultipleId.includes(productId)?getmultipleId.filter((id) =>id !==productId)
        :[...getmultipleId,productId]

        setgetmultipleId(updatedIds) 
        console.log(updatedIds);
        
        
        
        
        
        

    }
    

    


//change many products status URLs..
    const changeproductStatus =async( newstatus) =>{

        try {
            const restatus =await axios.put('http://localhost:5000/pro/changemany',
            {productids:getmultipleId, newstatus:newstatus})

        

            console.log(restatus.data);

            getallproduct()
            setgetmultipleId([])
            

        
        } catch (error) {
            console.log('status change failed');
            console.log(error);
            
        }
        

        

    }

  
 // Delete many products URLs  
 
 const delmany =async () =>{

    try {

       //const delres =await axios.post('http://localhost:5000/pro/delmany',{deleteids:getmultipleId})
       const delres =await axios.delete('http://localhost:5000/pro/delmany', {data:{ deleteids: getmultipleId }})

 
   

        if(delres.data.sts===0){
            console.log('products delete successfully');
            
            getallproduct()
            setgetmultipleId([])
        }
        
    } catch (error) {
        console.log('product delete failed by frontend');
        console.log('error',error);
        
    }
 }

 //Add to cart 
 const addcart =(item) =>{
    setcartvalue([...cartvalue,item])
    console.log(cartvalue);


 }










  return (
    <div className='getdivfirst'>
        <Navbar/>
        <p>cart{cartvalue.length}</p>
        <div className='getdivsec'>

            <div className='proindiv'> 
        
        <input className='proinput' type="text" placeholder='Search products'  
        value={searchtext} onChange={(e)=>setsearchtext(e.target.value)} />

        
        
        
        </div>
            <div className='getdivthird'>
                <div className='getdivfour'>
                    
                    
                    <table className='gettab'>
                        <thead className='getthead'>
                            <tr className='gettr'>
                                
                                <th className='getth'>#</th>
                                <th className='getth'>product image</th>
                                <th className='getth'>product name</th>
                                <th className='getth'>product category</th>
                                <th className='getth'>product price</th>
                                <th className='getth'>status</th>
                                <th className='getth'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='gettbody'>
                            <tr> 
                        <td>
                                            <select onChange={(e)=>setselectedstatus(e.target.value)}>
                                                <option value="">all</option>
                                                <option value="pending">pending</option>
                                                <option value="enable">enable</option>
                                                <option value="disable">disable</option>
                                            </select>

                                         </td>
                                        </tr>
                            {
                                
                                againfilter.map((items ,index)=>(
                                    <tr className='gettr'>
                                        

                                        <td className='gettd'>
                                        <input type="checkbox" checked={getmultipleId.includes(items._id)}    
                                         onClick={()=>handelchangestatus(items._id)} />
                                         {index+1}</td>

                                    <td className='gettd'><img className='getimg' src={`http://localhost:5000/prouploads/${items.pictures}`}
                                    width={'100px'}
                                    alt={items.proname}/> </td>
                                    
                                    <td className='gettd'>{items.proname}</td>
                                    <td className='gettd'>{items.procategory} </td>
                                    <td className='gettd'>{items.proprice}</td>
                                    <td className='gettd'>{items.prostatus} </td>
                                    <td className='gettd'>
                                        <button onClick={()=>addcart(items)}>add to cart</button>
                                    </td>
                                    

                                    </tr>
                                ))
                            }

                        </tbody>
                         
                    </table>
                </div>
                
                <button onClick={() => changeproductStatus('pending')}>pending</button> 
                 <button onClick={() => changeproductStatus('enable')}>enable</button>
                <button onClick={() => changeproductStatus('disable')}>disable</button><br />
                <button onClick={()=>delmany()}>delete many</button>
            </div>
            

        </div>
    </div>
  )
}

export default GetProducts 