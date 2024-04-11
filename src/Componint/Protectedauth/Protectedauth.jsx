import React, { useContext } from 'react'
import { authcontext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Protectedauth({children}) {
    const {setuserislogin,userislogin} =useContext(authcontext)
  return (
    <>
    {userislogin?<Navigate to={"/Home"}/>:children}
    </>
  )
}

