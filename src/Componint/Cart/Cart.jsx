import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CartProducts from '../CartProducts/CartProducts';
import { date } from 'yup';
import { Bounce, toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';


export default function About() {
  let { setnumOfCartItems } = useContext(CartContext);
  const [timeOutid , settimeOutid] = useState()
  const [cart , setcart]=useState({})
  const [cartid,setcartid]=useState()
  const [isloding ,setisloding] =useState({})


 function Updatecartproduct(productId,count){
// send prameter update function//
clearTimeout(timeOutid)
  let time =setTimeout(async() => {
    // eslint-disable-next-line eqeqeq
    if(count == 0){
      RemovecartItem(productId)
    }else{
      const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId, {
      count
    }, {
    headers:{  
      token: localStorage.getItem('token')
    }
    })

    console.log(data);
    setcart(data)
    // eslint-disable-next-line eqeqeq
    if (data.status == "success") {
      setnumOfCartItems(data.numOfCartItems);
    }
    console.log(data.numOfCartItems);
   
    }
  }, 500);
   settimeOutid(time)
  }


  async function RemovecartItem(productid ){
    const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productid,{
      headers:{
        token:localStorage.getItem('token')
      }
    })

// eslint-disable-next-line eqeqeq
if (data.status == "success") {
      setnumOfCartItems(data.numOfCartItems);
    }
    console.log(data.numOfCartItems);
    
  console.log(data);
  setcart(data);
    
  
  }
  

  async function Clearusercart(){
    setisloding(true)
    const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' ,{
      headers:{
        token:localStorage.getItem('token')
      }

    })
    // eslint-disable-next-line eqeqeq
    if (data.status == "success") {
      setnumOfCartItems({});
    }
    console.log(data.numOfCartItems);
    setisloding(false)
  console.log(data);
  setcart(data);
  
  }
  


 async function getLoggedtocart(){
 try {
  setisloding(true)
  const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
    
    headers:{
      token:localStorage.getItem('token')
    }
  
    
  })
  
  // eslint-disable-next-line eqeqeq
  if (data.status == "success") {
      setnumOfCartItems(data.numOfCartItems);
    }
    console.log(data.numOfCartItems);
  console.log(data);
  setcart(data);
  setisloding(false)
  setcartid(data.data._id)


 } catch (error) {
  console.log(error );
 } finally{
  setisloding(false)
 }
  }
  useEffect(()=>{
    getLoggedtocart()

  },[])
 
  return (
    <>
      {isloding ? (
        <div className='d-flex justify-content-center align-items-center my-5 py-5'>
          <i className='fas fa-spin fa-spinner fa-2x '></i>
        </div>
      ) : (
        <>
          {cart.data?.products.length > 0 ? (
            <div className='my-5'>
              <button onClick={() => Clearusercart()} className='btn btn-outline-danger d-block ms-auto'>Clear cart</button>
  
              {cart.data?.products.map((cartproduct, indx) => {
                return <CartProducts  Updatecartproduct={Updatecartproduct}   RemovecartItem={RemovecartItem} key={indx} cartproduct={cartproduct} />;
              })}
  
              <div className='d-flex justify-content-between me-auto '>
               
                <Link to={'/Adress/'+ cartid} className='btn bg-main text-white'>Check out</Link>
                
                <p className='fw-bold'>total cart price: {cart.data?.totalCartPrice}Egp </p>
              </div>
            </div>
          ) : (
            <h2 className='alert alert-warning text-center my-5'>No Products in your Cart</h2>
          )}
        </>
      )}
    </>
  )
          }