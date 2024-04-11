import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../../Context/AuthContext";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
export default function ResetPasword() {
  const navigate = useNavigate();
  const { setuserislogin, userislogin } = useContext(authcontext);
  const [isloding, setisloding] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  const valid3 = yup.object({
    email: yup
      .string()
      .required("Email is valid")
      .matches(
        /[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi,
        "not valid enter valid Email"
      ),
    newPassword: yup
      .string()
      .required("Password is valid")
      .matches(/^[A-Z]{2}[0-9]{1,6}$/gi, "not valid enter valid password"),
  });

  let form1 = useFormik({
    initialValues: {
        email: "",
        newPassword: "" 
    },

    onSubmit: async (values) => {
      setErrorMsg("");
      setisloding(true);
      console.log(values);
      try {
      async  function resetPassword(){
            let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
            console.log(data);
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setisloding(false);
    },
    validationSchema: valid3,
  });

  return (
    <>
    <h1 className="mt-5 ">newPassword</h1>
    <form className=" " onSubmit={form1.handleSubmit}>
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

    
<label htmlFor="newPassword">newPassword</label>
        <input
        onBlur={form1.handleBlur}
        onChange={form1.handleChange}
        type="password"
        id="newPassword"
        name="newPassword"
        className="form-control mt-2"
        />
        {form1.errors.newPassword && form1.touched.newPassword?<div className="alert alert-danger fs-6   ">{form1.errors.newPassword}</div>: ""}




        {ErrorMsg ? (
        <div className="alert alert-danger  mt-2">{ErrorMsg}</div>
        ) : (
        ""
        )}
        {isloding ? (
            <button
            disabled
            type="button"
            className="px-3 text-white bg-success me-auto d-block rounded-2 py-1"
            >
            {" "}
            <i className="fa fa-spin fa-spinner px-3"></i>
            </button>
            ) : (
            // eslint-disable-next-line no-mixed-operators
           <Link to={'/Login'}>
            <button 
            disabled={!(form1.isValid || (form1.isloding && form1.dirty))}
            type="submit"
            className="btn btn-success mt-2"
           
            >
            Send
            </button>
           </Link>
        )}
        </form>
   
    </>
  );
}
