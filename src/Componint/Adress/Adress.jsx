import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { authcontext } from "../../Context/AuthContext";
import { useFormik } from "formik";
import axios from "axios";

export default function Adress() {
  const navigate = useNavigate();
let {cartid} = useParams()

  const { setuserislogin, userislogin } = useContext(authcontext);

  const [isloding, setisloding] = useState(false);

  const [ErrorMsg, setErrorMsg] = useState("");
  console.log(cartid);
  const valid3 = yup.object({
    Details:yup.string().required("Details is required").min(3,"min length must be 3 chracters").max(20,"max length must be 20 chracters"),

    City:yup.string().required("City is required").min(3,"min length must be 3 chracters").max(20,"max length must be 20 chracters"),



    phone:yup.string().required("phone is valid").matches(/^01[0125][0-9]{8}$/gi,"not valid enter valid phone"),



  });

  let form1 = useFormik({
    initialValues: {
      Details: "",
      City: "",
      phone: "",
    },

    onSubmit: async (values) => {
      setErrorMsg("");
      setisloding(true);
   
      try {
    console.log(values);
        let {data} = await axios.post( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`,{
          shippingAddress: values
        },{
          headers:{
            token: localStorage.getItem("token")
          },
          params:{
            url:"http://localhost:4200"
          }
        })
        window.open(data.session.url,'_self')
        console.log(data);
        
      // if(data.message =="success"){
      //   navigate('/Login')
        
      // }

     } catch (error) {
      // setErrorMsg(error.response.data.message);
     }
     setisloding(false)
    },
    validationSchema: valid3,
  });

  return (
    <>
      <h1 className="mt-5 "> Adrers:</h1>
      <div className="">

        <form className="" onSubmit={form1.handleSubmit}>
          <label htmlFor="Details">Details</label>
          <input
            onBlur={form1.handleBlur}
            onChange={form1.handleChange}
            type="text"
            id="Details"
            name="Details"
            className="form-control mt-2"
          />
          {form1.errors.Details && form1.touched.Details ? (
            <div className="alert alert-danger fs-6   ">
              {form1.errors.Details}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="City">City</label>
          <input
            onBlur={form1.handleBlur}
            onChange={form1.handleChange}
            type="text"
            id="City"
            name="City"
            className="form-control mt-2"
          />
          {form1.errors.City && form1.touched.City ? (
            <div className="alert alert-danger fs-6   ">
              {form1.errors.City}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone</label>
          <input
            onBlur={form1.handleBlur}
            onChange={form1.handleChange}
            type="text"
            id="phone"
            name="phone"
            className="form-control mt-2"
          />
          {form1.errors.phone && form1.touched.phone ? (
            <div className="alert alert-danger fs-6   ">
              {form1.errors.phone}
            </div>
          ) : (
            ""
          )}

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
              Checkout
            </button>
          )}
        </form>
      </div>
    </>
  );
}
