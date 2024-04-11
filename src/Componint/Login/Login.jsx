import axios from "axios";
import {useFormik} from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import Home from "../Home/Home";
import { authcontext } from "../../Context/AuthContext";



export default function Login() {





  const navigate = useNavigate()

  const {setuserislogin,userislogin} = useContext(authcontext)
 
    const [isloding , setisloding]=useState(false)

    const [ErrorMsg, setErrorMsg]=useState('')



  const valid2 = yup.object({
   
    email:yup.string().required("Email is valid").matches(/[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi,"not valid enter valid Email"),

    password:yup.string().required("Password is valid").matches(/^[A-Z]{2}[0-9]{1,6}$/gi,"not valid enter valid password"),
  })


  let form1 = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    

    onSubmit: async (values) => {
      setErrorMsg("")
      setisloding(true)
      try {
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      
        if(data.message ==="success"){
          setuserislogin(true)
          localStorage.setItem("token",data.token)

          navigate("/Home")
          
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setisloding(false)
      
    },
    validationSchema:valid2
  });

  return (
    <>
      <h1>Login........</h1>

      <form onSubmit={form1.handleSubmit}>

        
          
        <label htmlFor="email">email</label>
      <input
          onBlur={form1.handleBlur}
          onChange={form1.handleChange}
          type="email"
          id="email"
          name="email"
          className="form-control mt-2"
        />
        {form1.errors.email&& form1.touched.email?<div className="alert alert-danger fs-6   ">{form1.errors.email}</div>: ""}

        <label htmlFor="password">Password</label>
        <input
          onBlur={form1.handleBlur}
          onChange={form1.handleChange}
          type="password"
          id="password"
          name="password"
          className="form-control mt-2"
        />
        {form1.errors.password && form1.touched.password?<div className="alert alert-danger fs-6   ">{form1.errors.password}</div>: ""}

          {ErrorMsg?<div className="alert alert-danger  mt-2">{ErrorMsg}</div>:''}

        {isloding ? <button disabled  type="button" className="px-3 text-white bg-success me-auto d-block rounded-2 py-1"> <i className="fa fa-spin fa-spinner px-3"></i></button>
        // eslint-disable-next-line no-mixed-operators
        : <button disabled={!(form1.isValid || form1.isloding && form1.dirty)} type="submit" className="btn btn-success mt-2">Login</button>


}
<Link to={'/forgotPasswords'}>
  <p className="mt-2">Forget password..? </p>
  </Link>

      </form>
    </>
  );
}
