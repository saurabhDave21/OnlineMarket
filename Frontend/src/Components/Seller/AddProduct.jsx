import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addProducts, addSingleProduct, removeProducts } from '../../Store/productSlice';
const AddProduct = ({ setmodel, updatedData }) => {
  const dispatch = useDispatch()
  const Allproducts = useSelector((store) => store.products.value)
  const [name, setname] = useState()
  const [description, setdescription] = useState()
  const [price, setprice] = useState()
  const [category, setcategory] = useState()
  const [quantity, setQuantity] = useState()
  const [images, setimages] = useState()
  useEffect(() => {
    if (updatedData !== null) {
      setname(updatedData.name)
      setdescription(updatedData.description)
      setprice(updatedData.price)
      setcategory(updatedData.category)
      setQuantity(updatedData.quantity)
      setimages(updatedData.images)
    }
  }, [])
  const handleAddProduct = async () => {
    const data = {
      name,
      description,
      price,
      category,
      quantity,
      images
    }
    try {
      const res = await axios.post("http://localhost:7777/store/add-product", data, { withCredentials: true })
      if (res.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        setmodel((prev)=>!prev)
      }
      dispatch(addSingleProduct(res.data.data))
      setname("")
      setdescription("")
      setprice("")
      setcategory("")
      setQuantity("")
      setimages("")
    }
    catch (err) {
      toast.error(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
  const handleUpdated = async () => {
    try {
      const data = {
        name,
        description,
        price,
        category,
        quantity,
        images
      }
       const res = await axios.patch(`http://localhost:7777/store/update-product/${updatedData._id}`, data, { withCredentials: true })
      if (res.status == 200) {
        const updatedProducts = Allproducts.map((e)=>{
          if(e._id == updatedData._id){
            return {...data,
              isActive:updatedData.isActive,
              isDeleted:updatedData.isDeleted,
              _id:updatedData._id,
              storeId:updatedData.storeId
            }
          }
          return e
        })
        dispatch(removeProducts())
        dispatch(addProducts(updatedProducts))
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        
         setmodel((prev)=>!prev)
      }
      setname("")
      setdescription("")
      setprice("")
      setcategory("")
      setQuantity("")
      setimages("")
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl p-6 shadow-2xl">
        <h1 className='text-xl font-semibold text-center'>{updatedData == null ? "Add" : "Update"} Product</h1>
        <div className='flex flex-col mt-2 gap-4'>
          <label htmlFor="n">Product Name<span className='text-red-400'>*</span></label>
          <input type="text" placeholder='Enter Name' id='n' className='py-1 px-3' value={name} onChange={(e) => setname(e.target.value)} />

          <label htmlFor="d">Product Description<span className='text-red-400'>*</span></label>
          <input type="text" placeholder='Enter description' id='d' className='py-1 px-3' value={description} onChange={(e) => setdescription(e.target.value)} />

          <label htmlFor="price">Product Price<span className='text-red-400'>*</span></label>
          <input type="number" placeholder='Enter price' id='price' className='py-1 px-3' value={price} onChange={(e) => setprice(e.target.value)} />

          <label htmlFor="category">Product Category<span className='text-red-400'>*</span></label>
          <input type="text" placeholder='Enter category' id='category' className='py-1 px-3' value={category} onChange={(e) => setcategory(e.target.value)} />

          <label htmlFor="stock">Product Avilable Stock<span className='text-red-400'>*</span></label>
          <input type="text" placeholder='Enter Quantity' id='stock' className='py-1 px-3' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <label htmlFor="images">Product Image<span className='text-red-400'>*</span></label>
          <input type="text" placeholder='Enter Images URL' id='images' className='py-1 px-3' value={images} onChange={(e) => setimages(e.target.value)} />
        </div>
        <div className='flex items-center gap-2 justify-center mt-4'>
          <button className='px-5 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg' onClick={() => updatedData == null ? handleAddProduct() : handleUpdated()}>{updatedData == null ? "Add" : "Update"} </button>
          <button className='px-5 py-1.5 bg-red-600 rounded-lg' onClick={() => setmodel((prev) => !prev)}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
