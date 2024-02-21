import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../commonComponent/Navbar'

const GetProducts = () => {
    const [getproduct,setgetproduct] =useState([])

    const getallproduct =async()=>{

        try {
            const res =await axios.get('http://localhost:5000/pro/getproduct')

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


  return (
    <div className='getdivfirst'>
        <Navbar/>
        <div className='getdivsec'>
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
                                getproduct.map((itmes ,index)=>(
                                    <tr className='gettr'>
                                        <td className='gettd'>{index+1}</td>
                                    <td className='gettd'><img className='getimg' src={`http://localhost:5000/prouploads/${itmes.pictures}`}
                                    width={'100px'}
                                    alt={itmes.proname}/> </td>
                                    
                                    <td className='gettd'>{itmes.proname}</td>
                                    <td className='gettd'>{itmes.procategory} </td>
                                    <td className='gettd'>{itmes.proprice}</td>
                                    <td className='gettd'>{itmes.prostatus} </td>
                                    <td className='gettd'> wait </td>
                                    

                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
  )
}

export default GetProducts