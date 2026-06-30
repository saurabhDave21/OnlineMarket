import React from 'react'
import {createBrowserRouter} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import MainLayout from './Components/Layout/MainLayout'
import Dashboard from './Components/dashboard'
import PrivateRoutes from './Components/PrivateRoutes'
import Cart from './Components/Cart'
import Order from './Components/Order'
import SellerDashboard from './Components/Seller/SellerDashboard'
import SellerOrder from './Components/Seller/SellerOrder'
import SellerProducts from './Components/Seller/SellerProducts'
import SellerRoutes from './Components/SellerRoutes'
const App = () => {
  return (
    <MainLayout/>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/dashboard",
        element:<PrivateRoutes><Dashboard/></PrivateRoutes>
      },
      {
        path:"/cart",
        element:<PrivateRoutes><Cart/></PrivateRoutes>
      },
      {
        path:"/order",
        element:<PrivateRoutes><Order/></PrivateRoutes>
      }
    ],
  },
  {
    path:"/seller",
    element:<MainLayout/>,
    children:[
      {
        path:"/seller/dashboard",
        element:<SellerRoutes><SellerDashboard/></SellerRoutes>
      },
      {
        path:"/seller/order",
        element:<SellerRoutes><SellerOrder/></SellerRoutes>
      },
      {
        path:"/seller/products",
        element:<SellerRoutes><SellerProducts/></SellerRoutes>
      }
    ]
    
  }
]);
export default App
