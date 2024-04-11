import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categores() {
  const [isloding ,setisloding] =useState({})
  const [Category ,setCategory] =useState({})
  
   async function getAllCategory(){
    setisloding(true)
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      console.log(data);
      setCategory(data)
      setisloding(false)
    }

useEffect(()=>{
  getAllCategory()
},[])




  return (
    <>
    {isloding? <div className='d-flex justify-content-center align-items-center my-5 py-5'>
    <i className='fas fa-spin fa-spinner fa-2x'></i>
  </div>:
   <div className="row">
   {Category?.data?.map((el, indx) => (
     <div className="col-md-4 g-4" key={indx}>
       <div className=' p-4 '>
         <img src={el.image} style={{height:400}} className='w-100' alt={el.name} />
         <p className='text-center fw-bold my-3 text-main '>{el.name}</p>
       </div>
     </div>
   ))}
 </div>
  }
      
    </>
  )
}
