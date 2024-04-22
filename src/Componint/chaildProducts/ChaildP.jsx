/* eslint-disable no-undef */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SliderCom from "../SliderCom/SliderCom";
import axios from "axios";
import { Bounce, Flip, toast } from "react-toastify";
import { CartContext  } from "../../Context/CartContext";
import { CWashListContext } from "../../Context/CartwashContext/CartwashContext";
import { Fade } from "react-awesome-reveal";

function ChaildP({ product }) {

  let {addtocartwashList } = useContext(CWashListContext);

  let { setnumOfCartItems } = useContext(CartContext);
  async function addproducttocart(productId) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    
    // eslint-disable-next-line eqeqeq
    if (data.status == "success") {
      setnumOfCartItems(data.numOfCartItems);
       
    }
    // console.log(data.numOfCartItems);
  }

  async function Addwishlist(id){
    let req = await addtocartwashList(id)
    console.log(req);
    toast.success(req.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    
    
  }
  return (
    <>
    <Fade >

      <div className="product overflow-hidden px-2 py-3 cursor-pointer ">
        <Link to={"/ProductDetails/" + product.id} className="a">
          <img src={product.imageCover} className="w-100" alt="" />
          <h5 className="text-main font-sm">{product.category.name}</h5>
          <h4> {product.title.split("").slice(0, 15).join("")} </h4>
          <p className="d-flex justify-content-between">
            <span>{product.price} Egp</span>
            <span>
              <i className="fas fa-star rating-color me-1"></i>
              <span>{product.ratingsAverage}</span>
            </span>
          </p>
        </Link>
      <div className=" d-flex">
      <button
          onClick={() => addproducttocart(product.id )}
          className="btn bg-main text-white w-100"
          >+Add to Cart
        </button>
            <button onClick={()=> Addwishlist(product.id) } className=" border-0 bg-white">
              <i class="fa-solid fa-heart btn fa-2x ms-auto love "></i>
              </button>
       </div>
        
      
      </div>
      </Fade >

    </>
  );
}
export default ChaildP;
