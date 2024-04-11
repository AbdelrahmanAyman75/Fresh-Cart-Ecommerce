import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Componint/Layout/Layout'
import Home from './Componint/Home/Home'
import Cart from './Componint/Cart/Cart'
import Contact from './Componint/Contact/Contact'
import Login from './Componint/Login/Login'
import Products from './Componint/Products/Products'
import Brands from './Componint/Brands/Brands'
import Categores from './Componint/Categores/Categores'
import AuthContextprovider, { authcontext } from './Context/AuthContext'
import ProtectedCom from './Componint/ProtectedCom/ProtectedCom'
import Notfound from './Componint/Notfound/Notfound'
import Protectedauth from './Componint/Protectedauth/Protectedauth'
import ProductDetails from './Componint/ProductDetails/ProductDetails'
import ChaildP from './Componint/chaildProducts/ChaildP'
import { ToastContainer } from 'react-toastify'
import  CartContextprovider ,{CartContext} from './Context/CartContext'
import Adress from './Componint/Adress/Adress'
import Allorders from './Componint/Allorders/Allorders'
import ForgetPasswerd from './Componint/ForgetPassword/ForgetPasswerd'
import ResetPasword from './Componint/ResetPassword/ResetPasword'
import WashList from './Componint/WashList/WashList'
import CWashListContextprovider, { CWashListContext } from './Context/CartwashContext/CartwashContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const Routers= createHashRouter([{path:'' ,element:<Layout/> ,children:[

  {path:'',element:<Navigate to={"Home"}/> },
  {path:'Home',element: <ProtectedCom><Home/></ProtectedCom>},
  {path:'Cart',element: <ProtectedCom><Cart/></ProtectedCom>},
  {path:'Products',element:<ProtectedCom> <Products/> </ProtectedCom>}, 
  {path:'Brands',element: <ProtectedCom><Brands/></ProtectedCom>},
  {path:'WashList',element: <ProtectedCom><WashList/></ProtectedCom>},

  {path:'Categores',element: <ProtectedCom><Categores/></ProtectedCom>},
  {path:'Adress/:cartid',element: <ProtectedCom><Adress/></ProtectedCom>},
  {path:'Contact',element: <Protectedauth><Contact/></Protectedauth>},
  {path:'Login',element: <Protectedauth><Login/></Protectedauth>},
  {path:'allorders',element: <ProtectedCom><Allorders/></ProtectedCom>},
  {path:'forgotPasswords',element: <Protectedauth><ForgetPasswerd/></Protectedauth>},
  {path:'ResetPasword',element: <Protectedauth><ResetPasword/></Protectedauth>},

  
  {path:'*',element: <Notfound/>},
  {path:'ProductDetails/:id',element: <ProtectedCom><ProductDetails/></ProtectedCom>},
  
  {path:'ChaildP',element: <ProtectedCom><ChaildP/></ProtectedCom>},

]}
])
let queryClient = new QueryClient()

export default function App() {
  return <>
  <QueryClientProvider client={queryClient}>
  <AuthContextprovider>
  <CartContextprovider>
  <CWashListContextprovider>
  <RouterProvider router={Routers}/>
  </CWashListContextprovider>
  </CartContextprovider>
  </AuthContextprovider>
  </QueryClientProvider>
  <ToastContainer/>
  
  </>
}
