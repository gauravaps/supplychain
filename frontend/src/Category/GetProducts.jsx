import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../commonComponent/Navbar'

const GetProducts = () => {
    const [getproduct,setgetproduct] =useState([]);
    const [searchtext, setsearchtext] = useState('');
    const[getmultipleId,setgetmultipleId] =useState([])
    const [checked,setchecked]=useState('')



    

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

    //handel status change
    const handelchangestatus =(productId) =>{
        const updatedIds =getmultipleId.includes(productId)?getmultipleId.filter((id) =>id !==productId)
        :[...getmultipleId,productId]

        setgetmultipleId(updatedIds) 
        console.log(updatedIds);
        
        
        
        
        
        

    }
    

    



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


  return (
    <div className='getdivfirst'>
        <Navbar/>
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
                            {
                                filterproduct.map((items ,index)=>(
                                    <tr className='gettr'>
                                        <td className='gettd'>{index+1}</td>
                                    <td className='gettd'><img className='getimg' src={`http://localhost:5000/prouploads/${items.pictures}`}
                                    width={'100px'}
                                    alt={items.proname}/> </td>
                                    
                                    <td className='gettd'>{items.proname}</td>
                                    <td className='gettd'>{items.procategory} </td>
                                    <td className='gettd'>{items.proprice}</td>
                                    <td className='gettd'>{items.prostatus} </td>
                                    <td className='gettd'>
                                        {/* <button onClick={()=>handelchangestatus(items._id)}>tongle select</button> */}
                  <input type="checkbox" checked={getmultipleId.includes(items._id)}    
                  onClick={()=>handelchangestatus(items._id)} />
                                    
                                     </td>
                                    

                                    </tr>
                                ))
                            }

                        </tbody>
                         
                    </table>
                </div>
                
                <button onClick={() => changeproductStatus('pending')}>pending</button> 
                 <button onClick={() => changeproductStatus('enable')}>enable</button>
                <button onClick={() => changeproductStatus('disable')}>disable</button>
            </div>

        </div>
    </div>
  )
}

export default GetProducts 