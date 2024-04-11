import React from 'react'
import Navbar from '../Navbar/Navbar'
import Foter from '../Foter/Foter'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  
  
  return <>
  
  <Navbar/>

<div className='container'>
  <Outlet/>
</div>
<Foter> </Foter>

 
 
 
 </>
}
