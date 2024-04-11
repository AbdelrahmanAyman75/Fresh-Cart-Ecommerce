import axios from "axios";
import { data } from "jquery";
import { createContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

export let CartContext = createContext();
export default function CartContextprovider({ children }) {
  let [numOfCartItems, setnumOfCartItems] = useState(0);

  function addproducttocart(productId) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
    
  
  return (
    <CartContext.Provider
      value={{ addproducttocart, numOfCartItems, setnumOfCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
