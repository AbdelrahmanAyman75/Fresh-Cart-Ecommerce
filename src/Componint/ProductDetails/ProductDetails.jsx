import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import SliderCom from "../SliderCom/SliderCom";

import { CartContext } from "../../Context/CartContext";
import { Bounce, toast } from "react-toastify";

export default function ProductDetails() {
  let { addproducttocart, setnumOfCartItems } = useContext(CartContext);
  const { id } = useParams();

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setproductDetails] = useState({});

  const [isloding, setisloding] = useState({});
  
  async function getDetails() {
    setisloding(true);
    let res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setisloding(false);
    console.log(res.data.data);
    setproductDetails(res.data.data);
  }

  useEffect(() => {
    getDetails();
  }, []);

  async function AddCart(id) {
    const req = await addproducttocart(id);
    toast.success(req.data.message, {
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
    if (req.data.status == "success") {
      setnumOfCartItems(req.data.numOfCartItems);
    }
  }

  return (
    <>
      {isloding ? (
        <div className="d-flex justify-content-center align-items-center my-5 py-5">
          <i className="fas fa-spin fa-spinner fa-2x "></i>
        </div>
      ) : (
        <div className="row align-items-center py-2">
          <div className="col-md-3">
            {/* <img src={productDetails.imageCover} className='w-100' alt="" /> */}

            <Slider {...settings}>
              {productDetails.images?.map((img, indx) => {
                return (
                  <div>
                    <img src={img} key={indx} className="w-100" alt="" />
                  </div>
                );
              })}
            </Slider>
          </div>

          <div className="col-md-9">
            <div className="details">
              <h2>{productDetails.title} </h2>
              <h5>{productDetails?.category?.name} </h5>
              <p>{productDetails?.description} </p>
              <p className="mt-3 d-flex justify-align-content-between">
                <span> {productDetails?.price} Egp</span>
                <span>
                  <i className="fas fa-star rating-color me-1"></i>
                  <span>{productDetails?.ratingsAverage}</span>
                </span>
              </p>

              <button
                onClick={() => {
                  AddCart(productDetails?.id);
                }}
                className=" btn w-100 text-white bg-main"
              >
                + Add to Cart{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
