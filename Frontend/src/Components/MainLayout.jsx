import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { addUser } from '../Store/userSlice'
import { useDispatch } from 'react-redux'

const MainLayout = () => {
  const dispatch = useDispatch()
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:7777/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const resData = await res.json();
      dispatch(addUser(resData.data))
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout
