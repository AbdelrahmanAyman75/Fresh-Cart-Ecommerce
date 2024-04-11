import React, { useState } from 'react'

export default function CartProducts({cartproduct ,RemovecartItem ,Updatecartproduct}) {

  const [count , setcount ] = useState(cartproduct.count)


  return (
    <>
    <div className='row align-items-center py-3 '>
            <div className="col-md-2">
            <img className='w-100' src= {cartproduct.product.imageCover} alt="" />
            </div>
            <div className="col-md-8">
            <h2>{cartproduct.product.title}</h2>

            <h5> {cartproduct.product.category.name}</h5>
            <p>
                <span className='me-2'>{cartproduct.price}</span>
                <span><i className='fas fa-star rating-color me-1'></i>{cartproduct.product.ratingsAverage} </span>
            </p>
            <p><span className='h5 fw-bold'>total price: {cartproduct.price * cartproduct.count} EGP </span></p>
            </div>
            <div className="col-md-2">
            <button onClick={()=>RemovecartItem(cartproduct.product._id)} className='btn text-danger  '>Remove</button>
            <div className='d-flex align-items-center'>
            <button onClick={() =>{Updatecartproduct(cartproduct.product._id , count -1); setcount(count -1) }}  className='btn bg-main text-white mx-2'>-</button>
            <span>{count}</span>
            <button onClick={() =>{Updatecartproduct(cartproduct.product._id , count +1); setcount(count  +1) }} className='btn bg-main text-white mx-2'>+</button>
  
            </div>
          </div>
        </div>
    </>
  )
}
