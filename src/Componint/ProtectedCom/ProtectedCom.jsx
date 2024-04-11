import React, { useContext } from 'react'
import { authcontext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedCom({children}) {
    
    const {setuserislogin,userislogin} =useContext(authcontext)
    
return<>

{userislogin ? children :<Navigate to={'/Login'}/>}




</>
}
