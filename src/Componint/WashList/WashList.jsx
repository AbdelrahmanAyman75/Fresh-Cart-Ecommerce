/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import SliderCom from '../SliderCom/SliderCom';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { CWashListContext } from '../../Context/CartwashContext/CartwashContext';
export default function WashList() {
  const [isloding ,setisloding] =useState({})
 const [wishlistcart , setwishlistcart] =useState({})
const {removeproductwash}=useContext(CWashListContext)
 const { id } = useParams();
 const [wishlist ,setwishlist] = useState()

 var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  
};





async function Wishlist(){
let {data} = await axios.get( 'https://ecommerce.routemisr.com/api/v1/wishlist',{
  headers:{
    token:localStorage.getItem('token')
  }
})
console.log(data.data);
setwishlistcart(data)
}
useEffect(()=>{
  Wishlist()
  },[])
  console.log(wishlistcart);

async function RemoveWish(id){
  let {data} = await removeproductwash(id)
   console.log(data);
   setwishlistcart(data)

  }
  
  return (
    <>

  
  <h2 className='mt-5 fw-bold '> My Wish List...</h2>
  
{wishlistcart?.data?.map((products ,indx)=>{
 return <div className="row  align-items-center py-3 mt-4 shadow " key={indx}>
 
 <div className="col-md-3">
{/* <img src={wishlistcart.imageCover} className='w-100' key={indx} alt="" /> */}
<Slider {...settings}>
       {wishlistcart.images?.map((img, indx) => {
         return (
           <div>
            <img src={img} key={indx} className="w-100 bg-danger" alt="jpg" />
           </div>
         );
       })}
     </Slider>
 </div>
 <div className="col-md-9" >
<div className="details">
 <h2>{products.title} </h2>
 <h5 className='fw-bold' >{products?.category?.name} </h5>
 <p>{products?.description} </p>
 <p className="mt-3 d-flex justify-align-content-between">
   <span className='fw-bold'> {products?.price} Egp</span>
   <span>
     <i className="fas fa-star rating-color me-1"></i>
     <span>{products?.ratingsAverage}</span>
   </span>
 </p>
</div>
<button onClick={()=>RemoveWish(products.id)} className=' btn btn-danger d-block justify-content-end align-items-center'>Remove</button>

</div>
</div>

})}


<hr className='mt-4' />

    </>
  )
}
