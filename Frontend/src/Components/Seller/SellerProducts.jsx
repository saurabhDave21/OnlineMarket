import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addProducts,removeProducts} from "../../Store/productSlice"
import Cards from "../Cards"
const SellerProducts = () => {
  const dispatch = useDispatch()
  const SellerProducts = useSelector((store)=>store.products.value)
  const fetchProductsforSeller = async()=>{
    try{
      const res = await axios.get("http://localhost:7777/store/seller/get-products",{withCredentials:true})
       dispatch(addProducts(res.data.data))
    }
    catch(err){
      console.log(err?.message)
    }
  }
  useEffect(()=>{
    fetchProductsforSeller()
  },[])
  
  return (
    <div>
      <Cards product={SellerProducts}/>
    </div>
  )
}

export default SellerProducts
