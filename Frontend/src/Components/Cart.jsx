import React, { useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addCartData, removeCartData, updatedItems } from '../Store/CartSlice'
import { MdDelete } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
const Cart = () => {
    const dispatch = useDispatch()
    const cartData = useSelector((store) => store.cart.value)
    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:7777/cart/get-items", { withCredentials: true })
            dispatch(addCartData(res.data.data))
        }
        catch (err) {
           toast.error(
                err.response?.data?.message || "Something went wrong",
                {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                }
            );
        }
    }
    const removeItemsfromCart = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:7777/cart/delete-items/${id}`, { withCredentials: true })
            if (res.status == 200) {
                const updatedData = cartData.items.filter((item) => item.ItemsId !== res.data.data.itemsId)
                dispatch(updatedItems(updatedData))
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
            toast.error(
                err.response?.data?.message || "Something went wrong",
                {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                }
            );
        }
    }
    const handleAddtoCart = async (id) => {
        try {
            const res = await axios.post(`http://localhost:7777/cart/add-items/${id}`, {}, { withCredentials: true })
            if (res.status == 200) {
                dispatch(removeCartData())
                dispatch(addCartData(res.data.data))
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
            else {
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
        catch (err) {
            console.log(err)
        }
    }
    const handleOrder = async ()=>{
        try{
            const res = await axios.post("http://localhost:7777/order",{},{withCredentials:true})
            if (res.status == 200) {
                dispatch(removeCartData())
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
        catch(err){
           toast.error(
                err.response?.data?.message || "Something went wrong",
                {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                }
            );
        }
    }
    useEffect(() => {
        fetchCart()
        return () => dispatch(removeCartData())
    }, [])
    const totalAmount = cartData?.items?.reduce((acc, val) => acc + val.price, 0)
    return (
       cartData?.length == 0 || cartData == null ? (<div className='flex flex-col'>
                    <h1 className='text-center mt-5 p-5'><Link to="/dashboard"><IoMdArrowBack className='h-6 w-6 mb-4' /></Link>No Cart Items Found</h1></div>) : (<div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Link to="/dashboard"><IoMdArrowBack className='h-6 w-6 mb-4' /></Link>
                    <h1 className='text-xl font-bold'>Cart Items</h1>
                    <ToastContainer />
                    {cartData?.items?.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.images}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />

                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-400 text-sm w-72 line-clamp-2">
                                        {item.description}
                                    </p>

                                    <p className="text-green-500 font-bold mt-2">
                                        ₹{item.price}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-9 h-9 bg-zinc-800 rounded-lg hover:bg-zinc-700">
                                    -
                                </button>

                                <span className="text-lg font-semibold">
                                    {item.Itemsquantity}
                                </span>

                                <button className="w-9 h-9 bg-blue-600 rounded-lg hover:bg-blue-700" onClick={() => handleAddtoCart(item.ItemsId)}>
                                    +
                                </button>
                                <button className='w-9 h-9 bg-zinc-800 rounded-lg hover:bg-zinc-700 flex items-center justify-center cursor-pointer' onClick={() => removeItemsfromCart(item.ItemsId)}>
                                    <MdDelete className='text-xl opacity-65' />
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit sticky top-6">
                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="flex justify-between text-lg mb-3">
                        <span>Total</span>
                        <span className="font-bold text-green-500">
                            ₹{totalAmount}
                        </span>
                    </div>

                    <button className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold" onClick={()=>handleOrder()}>
                        Place Order
                    </button>
                </div>

            </div>
        </div>)
    )
}

export default Cart
