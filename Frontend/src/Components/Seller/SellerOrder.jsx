import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
const SellerOrder = () => {
    const [orders, setorders] = useState(null)
    const [status,setStatus] = useState()
    const orderStatus = [
        { value: "Placed", label: "Placed" },
        { value: "Shipped", label: "Shipped" },
        { value: "Delivered", label: "Delivered" },
        { value: "Cancelled", label: "Cancelled" }
    ]
    const fetchOrderForSeller = async () => {
        try {
            const res = await axios.get("http://localhost:7777/order", {
                withCredentials: true
            })
            setorders(res.data)
        }
        catch (err) {
            console.log(err?.message)
        }
    }
    const updateOrderStatus = async(status,itemData,order,index)=>{

        const ItemsId = itemData?._id
        const data ={
            orderId:order.orderId,
            ItemsId,
            status:status.value
        }
        try{
            const res = await axios.patch("http://localhost:7777/order",data,{withCredentials:true})
            if(res.status == 200){
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
            fetchOrderForSeller()
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        updateOrderStatus()
    },[status])
    useEffect(() => {
        fetchOrderForSeller()
    }, [])
    return (
        <div className="space-y-8">
            {orders?.data?.map((order) => {
                return order.order.length === 0 ? null : (

                    <div
                        key={order._id}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h1 className='p-5 text-md'><span className='font-bold text-lg'>Customer Name:</span> {order.name}</h1>
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {order.userId?.name}
                                </h2>

                                <p className="text-sm text-zinc-400">
                                    {order.userId?.email}
                                </p>
                            </div>

                            <span className="text-sm bg-blue-600 text-white px-4 py-2 rounded-full">
                                {order.order?.length} Item(s)
                            </span>
                        </div>

                        <div className="p-6 space-y-5">
                            {order.order?.map((item,index) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col md:flex-row justify-between gap-5 bg-zinc-800 rounded-xl p-4"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={item.images}
                                            alt={item.name}
                                            className="w-28 h-28 rounded-lg object-cover"
                                        />

                                        <div className="space-y-2">

                                            <h3 className="text-lg font-semibold text-white">
                                                {item.name}
                                            </h3>

                                            <p className="text-sm text-zinc-400 line-clamp-2">
                                                {item.description}
                                            </p>

                                            <span className="inline-block bg-zinc-700 text-green-400 text-xs px-3 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center md:items-end gap-2">
                                        
                                        <Select
                                            options={orderStatus}
                                            value={status}
                                            onChange={(selectedOption)=>updateOrderStatus(selectedOption,item.ItemsId,order,index)}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#1f2937",
                                                    borderColor: "#4b5563",
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#1f2937",
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor:
                                                        state.isFocused || state.isSelected ? "#374151" : "#1f2937",
                                                        color: "#fff",
                                                    }),
                                                    singleValue: (base) => ({
                                                        ...base,
                                                    color: "#fff",
                                                }),
                                                input: (base) => ({
                                                    ...base,
                                                    color: "#fff",
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: "#9ca3af",
                                                }),
                                            }}
                                        />
                                        <p className="text-2xl font-bold text-green-500">
                                            ₹{item.price}
                                        </p>

                                        <p className="text-zinc-300">
                                            Quantity:{" "}
                                            <span className="font-semibold">
                                                {item.Itemsquantity}
                                            </span>
                                        </p>

                                                <span
                                                    className={`px-4 py-1 rounded-full text-sm font-medium text-white ${item.orderStatus === "Delivered"
                                                        ? "bg-green-600"
                                                        : item.orderStatus === "Cancelled"
                                                            ? "bg-red-600"
                                                            : item.orderStatus === "Shipped"
                                                                ? "bg-purple-600"
                                                                : "bg-yellow-600"
                                                        }`}
                                                >
                                                    {item.orderStatus}
                                                </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default SellerOrder
