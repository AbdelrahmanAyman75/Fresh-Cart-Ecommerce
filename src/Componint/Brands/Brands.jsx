/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Fade } from "react-awesome-reveal";

export default function Brands() {
  const [isloding ,setisloding] =useState({})

 const [brands , setbrands] = useState({})

 async function getAllprands(){
  setisloding(true)
  let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  console.log(data);
  setisloding(false)

  console.log();
  setbrands(data);
}

 useEffect(()=>{
  getAllprands()
 },[])
  return (
    <>
  
   {isloding ? (
  <div className='d-flex justify-content-center align-items-center my-5 py-5'>
    <i className='fas fa-spin fa-spinner fa-2x'></i>
  </div>
) : (
  <>
    <h1 className='text-main text-center fw-bold mt-5'>All prands</h1>
      <Fade> 
    <div className="row">
      {brands?.data?.map((el, indx) => (
        <div className="col-md-3" key={indx}>
          <div className='p-3 shadow'>
            <img src={el.image} className='w-100' alt={el.name} />
            <p className='text-center fw-bold text-main'>{el.name}</p>
          </div>
        </div>
      ))}
    </div>
      </Fade>
    
    
  </>
)}

      
      
        

    </>
    
  )
}
