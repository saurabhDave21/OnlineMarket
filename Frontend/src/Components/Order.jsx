import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, removeAllOrder } from '../Store/orderSlice'
import { IoMdArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Review from './Review'
const Order = () => {
    const ordersData = useSelector((store)=>store.order.value)
    const [model, setmodel] = useState(false)
    const [itemsId,setitemsId]=useState(null)
    const dispatch = useDispatch()
    const fetchOrder = async () => {
        try {
            const res = await axios.get("http://localhost:7777/order", { withCredentials: true })
            dispatch(addOrder(res.data.data))
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchOrder()
        return ()=>dispatch(removeAllOrder())
    }, [])
    return (
       <>
        <div className="min-h-screen bg-black p-6">
            <Link to="/dashboard"><IoMdArrowBack className='h-6 w-6 mb-4' /></Link>
            {model &&<Review setmodel={setmodel} itemsId={itemsId}/>}
            <div className="max-w-5xl mx-auto space-y-6">
                {ordersData?.map((order) => (
                    <div
                        key={order._id}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                    >
                        <div className="flex flex-col md:flex-row justify-between mb-5 border-b border-zinc-700 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    Order Date: {order.orderDate}
                                </h2>

                                <p className="text-gray-400">
                                    Total Items: {order.quantity}
                                </p>
                            </div>

                            <div className="mt-3 md:mt-0">
                                <p className="text-2xl font-bold text-green-500">
                                    ₹{order.totalPrice}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {order.items.map((item) =>  (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between bg-zinc-800 rounded-lg p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.images}
                                            alt={item.name}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />

                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {item.name}
                                            </h3>

                                            <p className="text-sm text-gray-400 line-clamp-2">
                                                {item.description}
                                            </p>

                                            <span className="inline-block mt-2 bg-zinc-700 px-3 py-1 rounded-full text-xs text-green-400 capitalize">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-bold text-green-500">
                                            ₹{item.price}
                                        </p>

                                        <p className="text-gray-300 mt-1">
                                            Qty: {item.Itemsquantity}
                                        </p>

                                        <span className="inline-block mt-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                            {item.orderStatus}
                                        </span>
                                        <div className='mt-5 mx-5'>
                                            <button className='py-1 px-4 bg-blue-700 rounded-lg' onClick={()=>[setmodel((prev)=>!prev),setitemsId(item.ItemsId)]}>Review</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

       </>    )
}

export default Order
