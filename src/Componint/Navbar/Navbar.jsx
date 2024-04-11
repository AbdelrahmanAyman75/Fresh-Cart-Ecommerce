/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../../Context/AuthContext";
import logo from "../../Assets/images/freshcart-logo.svg";
import { CartContext } from "../../Context/CartContext";
import { CWashListContext } from "../../Context/CartwashContext/CartwashContext";
export default function Navbar() {
  const { setuserislogin, userislogin } = useContext(authcontext);
  const navigate = useNavigate();
  let { numOfCartItems } = useContext(CartContext);

  let {numOfItems} = useContext(CWashListContext);

  function logOut() {
    setuserislogin(false);
    localStorage.removeItem("token");
    navigate("/Login");
  }

  


  return (
    
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary position-fixed fixed-top  ">
        <Link className="navbar-brand" to="Home">
          <img src={logo} alt="freshcart-logo" />
        </Link>

        <div className="collapse navbar-collapse " id="navbarNav">
          {userislogin && (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="Home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="Cart">
                  Cart
                </Link>
              </li>
              <Link className="nav-link fw-bold" to="WashList">
                Washlist
                </Link>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="Products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="Categores">
                  Categores
                </Link>
              </li>
              <li className ="nav-item">
                <Link className ="nav-link fw-bold" to="Brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="allorders">
                orders
                </Link>
              </li>
            </ul>
          )}

          <div className="ms-auto d-flex justify-content-center align-items-center ">
            <li className="nav-item ms-auto list-unstyled ">
              <i class=""></i>

              <Link to={"/Cart"}>
              <i className="fa-solid fa-cart-shopping text-main  position-relative   ">
                <span className="position-absolute top-0 end-0 translate-middle-y cursor-pointer  text-dark fs-6 ">
                  {numOfCartItems || 0}
                  
                </span>
              
              </i>
              </Link>

              <i className="fa-brands mx-2 fa-facebook "></i>
              <i className="fa-brands mx-2 fa-instagram "></i>
              <i className="fa-brands mx-2 fa-linkedin "></i>
              <i className="fa-brands mx-2 fa-twitter "> </i>
            </li>
          </div>

          {userislogin ? (
            <li className="nav-item me-3 list-unstyled ">
              <span onClick={logOut} className="nav-link fw-bold  ">
                <Link to="#" className="list-unstyled nav-link fw-bold">
                  Logout
                </Link>
              </span>
            </li>
          ) : (
            <>
              <li className="nav-item me-3 list-unstyled ">
                <Link className="nav-link fw-bold" to="Contact">
                  Register
                </Link>
              </li>
              <li className="nav-item me-3 list-unstyled ">
                <Link className="nav-link fw-bold" to="Login">
                  Login
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
