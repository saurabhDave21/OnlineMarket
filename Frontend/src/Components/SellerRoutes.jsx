import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
const SellerRoutes = ({children}) => {
  const token = JSON.parse(localStorage.getItem("token"))
  if(!token){
    return <div className='text-center text-2xl text-white mt-10'>Please Login</div>
  }

  const userType = JSON.parse(localStorage.getItem("type"))
  console.log(userType)
  if(userType !== "seller"){
    return <div className='text-center text-2xl text-white mt-10'>Please Login as Seller</div>
  }
  return (
    children
  )
}

export default SellerRoutes
