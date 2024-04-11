/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export default function Allorders() {
  const { id } = jwtDecode(localStorage.getItem("token"));
  console.log(id);
  const [orders, setorders] = useState([]);
  async function getAllorders(id) {
    let req = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + id
    );
    console.log(req.data);
    setorders(req.data);
  }
  useEffect(() => {
    getAllorders(id);
  }, []);
  return (
    <>
      <h1 className="mt-5">your all orders</h1>

      {orders.map((order)=>{
        return <div key={order.id} className="row">
        <div className="order shadow rounded p-4 my-5">
          <div className="d-flex align-items-center">
            <h5 className="fw-bold "># {order.id} </h5>
            <h6 className="fw-bold text-white bg-main mx-4  rounded-pill p-2"> processing</h6>
          </div>
          
          <p className="fw-bold" >you have order {order.cartItems.length}items.</p>
          
  
          <div className="d-flex">
            {order.cartItems.map((item)=>{
              // eslint-disable-next-line jsx-a11y/alt-text
              return <img className=" img-thumbnail mx-2" style={{width:150 }}  src={item.product?.imageCover}  key={item._id} />
            })}
          </div>
          <p className="fw-bold " > <span className="">paidAt: {order.paidAt}</span> </p>

          <hr />
  
          <p><strong> Total amount: {order.totalOrderPrice}  </strong>   </p>
  
  
        </div>
         
  
        </div>
      



      })}







    </>
  );
}
