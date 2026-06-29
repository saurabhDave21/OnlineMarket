import React from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
const Cards = ({product}) => {
    const handleAddtoCart = async(id)=>{
        try{
            const res = await axios.post(`http://localhost:7777/cart/add-items/${id}`,{}, { withCredentials: true })
            if(res.status==200){
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
            else{
                 toast.error(res.data.message, {
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
        catch(err){
            console.log(err)
        }
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
                <span className="bg-zinc-800 text-green-400 px-3 py-1 rounded-full text-xs capitalize">
                  {product.category}
                </span>

                <span className="text-2xl font-bold text-green-500">
                  ₹{product.price}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Stock: {product.quantity}
              </p>

              <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition" onClick={()=>handleAddtoCart(product._id)}>
                Add to Cart
              </button>
            </div>
          </div>
        )})}
      </div>
      </>
  )
}

export default Cards
