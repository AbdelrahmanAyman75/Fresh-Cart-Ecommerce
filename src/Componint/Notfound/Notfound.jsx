import React from 'react'
import notfound from "../../Assets/images/error.svg"

export default function Notfound() {
  return (
    <>
        <h2>Oops!... </h2>
      <img  src={notfound} alt="error" />
    </>
  )
}
