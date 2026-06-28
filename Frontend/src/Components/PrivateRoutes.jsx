import React, { useEffect } from 'react'

const PrivateRoutes = ({children}) => {
  const token = JSON.parse(localStorage.getItem("token"))
  if(!token){
    return <div className='text-center text-2xl text-white mt-10'>Please Login</div>
  }
  return (
    children
  )
}

export default PrivateRoutes
