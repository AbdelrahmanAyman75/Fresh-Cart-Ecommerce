/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { authcontext } from "../../Context/AuthContext";
import { useFormik } from "formik";
import axios from "axios";
import { data } from "jquery";

export default function ForgetPasswerd() {
    const navigate = useNavigate();
    const { setuserislogin, userislogin } = useContext(authcontext);
    const [isloding, setisloding] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [verifycode,setverifycode] =useState(true)
    console.log();
    const valid3 = yup.object({
    email:yup.string().required("Email is valid").matches(/[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi,"not valid enter valid Email"),
  });
 

  let form1 = useFormik({
    initialValues: {
        email:'',
    },
    onSubmit: async (values) => {
        setErrorMsg("");
        setisloding(true);
        
        try {
    console.log(values); 
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values )
        
        console.log(data);
        if(data.statusMsg=="success"){
            setverifycode(false)
        }

        } catch (error) {
      setErrorMsg(error.response.data.message);
        }
        
        setisloding(false)
    },
    validationSchema: valid3,
    
  });

  const valid4 =yup.object({
    resetCode:yup.string().required("resetCode is valid").matches(/^[0-9]{5,6}$/,'inter valid code')
  })

  let form2 =useFormik({
    initialValues:{
        resetCode:'',
    },
    onSubmit: async (val) => {
        setErrorMsg("");
        setisloding(true);
        
        try {
    console.log(val); 
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',val )
        
        console.log(data);
        if(data.status=="Success"){
            navigate('/ResetPasword')
        }

        } catch (error) {
      setErrorMsg(error.response.data.message);
        }
        
        setisloding(false)
    },
    validationSchema: valid4,
  });
 
  return (
    <>
    <h1 className="mt-5 "> Forget password</h1>

    <div className="">


            {verifycode? 
          
        <form className="" onSubmit={form1.handleSubmit}>
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
            <button
            disabled={!(form1.isValid || (form1.isloding && form1.dirty))}
            type="submit"
            className="btn btn-success mt-2"
            >
            Send
            </button>
        )}
        </form>

            :
            <form className="" onSubmit={form2.handleSubmit}>
            <label htmlFor="resetCode">resetCode</label>
            <input 
            onBlur={form2.handleBlur}
            onChange={form2.handleChange}
            type="text"
            id="resetCode"
            name="resetCode"
            className="form-control mt-2"
            value={form2.values.resetCode}
            />
            {form2.errors.resetCode&& form2.touched.resetCode?<div className="alert alert-danger fs-6   ">{form2.errors.resetCode   }</div>: ""}
    
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
                <button
                disabled={!(form2.isValid || (form2.isloding && form2.dirty))}
                type="submit"
                className="btn btn-success mt-2"
                >
                Verify
                </button>
            )}
            </form>

        
                }
    </div>
    </>
    );
}
