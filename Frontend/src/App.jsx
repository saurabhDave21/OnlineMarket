import React from 'react'
import {createBrowserRouter} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import MainLayout from './Components/MainLayout'
import Dashboard from './Components/dashboard'
import PrivateRoutes from './Components/PrivateRoutes'
import Cart from './Components/Cart'
import Order from './Components/Order'
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
]);
export default App
