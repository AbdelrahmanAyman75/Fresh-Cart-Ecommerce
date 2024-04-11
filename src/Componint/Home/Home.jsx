import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ChaildP from '../chaildProducts/ChaildP';
import SliderCom from '../SliderCom/SliderCom';
import SliderCategores from '../sliderCategores/SliderCategores';
import { useQuery } from 'react-query';



export default function Home() {

function Featuredproducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}
let {isLoading,isError,isFetched,data}= new useQuery('Featuredproducts',Featuredproducts)

console.log(data?.data.data);
  return (
    <>

<SliderCom></SliderCom>
<SliderCategores></SliderCategores>
    
     
      {isLoading?
    <div className='w-100 h-100 bg-dark position-absolute top-0 bottom-0 end-0 start-0 '>
      <span className="loader d-flex justify-content-center align-items-center w-100 mt-5 m-auto  "></span>
      </div>
    
  :
  <div className="row g-3 w-100">
    {data?.data.data.map((Products)=>{
    return <>
    <div className="col-md-3" key={Products.id}>
      <ChaildP product ={Products}/>
    
    </div>
      </>
    }
    )}
      </div>
  }


    
  

    
    </>
  )
}
