import axios from "axios";
import {useFormik} from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';


export default function Contact() {
  const navigat = useNavigate()
    const [isloding , setisloding]=useState(false)

    const [ErrorMsg, setErrorMsg]=useState('')



  const valid2 = yup.object({
    name:yup.string().required("name is valid").min(3,"min length must be 3 chracters").max(20,"max length must be 20 chracters"),
    email:yup.string().required("Email is valid").matches(/[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi,"not valid enter valid Email"),
    phone:yup.string().required("phone is valid").matches(/^01[0125][0-9]{8}$/gi,"not valid enter valid phone"),
    password:yup.string().required("Password is valid").matches(/^[A-Z]{2}[0-9]{1,6}$/gi,"not valid enter valid password"),
    rePassword:yup.string().required("rePassword is valid").oneOf([yup.ref('password')],"not match password tray again")

  })

  // function validate(value) {
  //   const errors = {};
  //   if (value.name == "") {
  //     errors.name = "name is valid ";
  //   } else if (value.name.length < 3) {
  //     errors.name = "min length must be 3 chracters";
  //   } else if (value.name.length > 20) {
  //     errors.name = "max length must be 20 chracters";
  //   }
  //   if (value.email == "") {
  //     errors.email = "Email is valid";
  //   } else if (
  //     !/[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi.test(value.email)
  //   ) {
  //     errors.email = "not valid enter valid Email";
  //   }

  //   if (value.password == "") {
  //     errors.password = "Password is valid";
  //   } else if (!/^[A-Z]{2}[0-9]{1,6}$/gi.test(value.password)) {
  //     errors.password = "not valid enter valid password";
  //   }

  //   if (value.rePassword == "") {
  //     errors.rePassword = "rePassword is valid";
  //   } else if (value.password != value.rePassword) {
  //     errors.rePassword = "Password and rePassword not match";
  //   }

  //   if (value.phone == "") {
  //     errors.phone = "phone is valid";
  //   } else if (!/^01[0125][0-9]{8}$/) {
  //     errors.phone = "not valid enter valid phone";
  //   }

    

  //   console.log(errors);
  //   return errors;
  // }

  let form1 = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    

    onSubmit: async (values) => {

      
      setErrorMsg("")
      setisloding(true)
      try {
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      
        if(data.message ==="success"){
          navigat('/Login')
          
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setisloding(false)
      
    },
    validationSchema:valid2,
   
    
  });

  return (
    <>
      <h1 className="mt-5">Register........</h1>
      <form onSubmit={form1.handleSubmit}>
        <label htmlFor="name">Name</label>

        <input
          onBlur={form1.handleBlur}
          onChange={form1.handleChange}
          type="text"
          id="name"
          name="name"
          className="form-control mt-2"
        />
        {form1.errors.name && form1.touched.name?<div className="alert alert-danger fs-6   ">{form1.errors.name}</div>: ""}
          
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
        
        <label htmlFor="phone">phone</label>
        <input
          onBlur={form1.handleBlur}
          onChange={form1.handleChange}
          type="tel"
          id="phone"
          name="phone"
          className="form-control mt-2"
        />

          {form1.errors.phone && form1.touched.phone?<div className="alert alert-danger fs-6  ">{form1.errors.phone}</div>: ""}



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

        <label htmlFor="rePassword">rePassword</label>
        <input
          onBlur={form1.handleBlur}
          onChange={form1.handleChange}
          type="password"
          id="rePassword" 
          name="rePassword"
          className="form-control mt-2"
        />
        {form1.errors.rePassword && form1.touched.rePassword?<div className="alert alert-danger fs-6   ">{form1.errors.rePassword}</div>: ""}

          {ErrorMsg?<div className="alert alert-danger  mt-2">{ErrorMsg}</div>:''}

        {isloding ? <button disabled  type="button" className="px-3 text-white bg-success me-auto d-block rounded-2 py-1"> <i className="fa fa-spin fa-spinner px-3"></i></button>
        // eslint-disable-next-line no-mixed-operators
        : <button disabled={!(form1.isValid || form1.isloding && form1.dirty)} type="submit" className="btn btn-success mt-2">Register</button>
}
<Link to={'/Login'}>
  <p className="mt-2 text-blue a ">Login...! </p>
  </Link>

      </form>
    </>
  );
}
