import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from "react-icons/io";
import AddProduct from "./Seller/AddProduct"
import { addProducts, removeProducts } from '../Store/productSlice';
const Cards = ({ product }) => {
  const isUser = useSelector((store) => store.user?.value?.type)
  const Allproducts = useSelector((store) => store.products.value)
  const [model, setmodel] = useState(false)
  const [updatedData,setUpdatedData] = useState(null)
  const dispatch = useDispatch()
  const handleAddtoCart = async (id) => {
    try {
      const res = await axios.post(`http://localhost:7777/cart/add-items/${id}`, {}, { withCredentials: true })
      if (res.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    catch (err) {
      toast.error(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:7777/store/delete-product/${id}`, { withCredentials: true })
      const filterProducts = Allproducts.filter((elm) => elm._id !== res.data.data._id)
      dispatch(addProducts(filterProducts))
      if (res.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    }
    catch (err) {
      toast.error(err?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
  const handleUpdateisActive = async (itemsid, status) => {
    try {
      let ActiveData;
      status == "Active" ? ActiveData = "Deactive" : ActiveData = "Active"
      const res = await axios.patch(`http://localhost:7777/store/update-product/${itemsid}`, { isActive: ActiveData }, { withCredentials: true })
      const data = Allproducts.map((e) => {
        if (e._id == itemsid) {
          return { ...e, isActive: ActiveData }
        }
        return e
      })
      dispatch(removeProducts())
      dispatch(addProducts(data))
    }
    catch (err) {
      toast.error(err?.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const handlEditModel = (product)=>{
    setUpdatedData(product)
    setmodel(true)
  }
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-black min-h-screen">
        {product?.map((product) => {
          return (
            <div
              key={product._id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:border-blue-500 transition-all duration-300"
            >
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold text-white">
                  {product.name}
                </h2>

                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className='gap-2 flex '>
                    <span className="bg-zinc-800 text-green-400 px-3 py-1 rounded-full text-xs capitalize">
                      {product.category}
                    </span>
                    {isUser == "seller" && <span className={`bg-zinc-800 px-3 py-1 rounded-full text-xs font-bold ${product.isActive == "Deactive" ? "text-red-500" : "text-green-500"}`}>
                      {product.isActive}
                    </span>}
                  </div>
                  <span className="text-2xl font-bold text-green-500">
                    ₹{product.price}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  Stock: {product.quantity}
                </p>

                {isUser == "user" ? <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition" onClick={() => handleAddtoCart(product._id)}>
                  Add to Cart
                </button> : <div className='flex justify-center items-center gap-4'>
                  <button className='w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg font-medium transition' onClick={()=>handlEditModel(product)}>Edit</button>
                  <button className='w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-lg font-medium transition' onClick={() => handleDelete(product._id)}>Delete</button>
                  <button onClick={() => handleUpdateisActive(product._id, product.isActive)} className={`w-full cursor-pointer mt-5 border-2 hover:bg-gray-800 py-1.5 rounded-lg font-medium transition ${product.isActive == "Active" ? "text-red-500" : "text-green-500"} hover:text-white`}>{product.isActive == "Active" ? "Deactive" : "Active"}</button>
                </div>}
              </div>
            </div>
          )
        })}
        {model && <AddProduct setmodel={setmodel} updatedData={updatedData}/>}
        {isUser == "seller" && <div className='fixed bottom-0 right-0 p-10'>
          <button className='px-3 py-1.5 font-bold bg-blend-difference border-2 border-blue-400 text-blue-400 hover:bg-blue-700 rounded-lg flex items-center text-lg' onClick={() => setmodel((prev) => !prev)}><IoMdAdd />Products</button>
        </div>}
      </div>
    </>
  )
}

export default Cards
