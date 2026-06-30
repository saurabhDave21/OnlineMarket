import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import AddStore from './AddStore';
const SellerDashboard = () => {
  const [data, setdata] = useState(null)
  const [CreateStore, setCreateStore] = useState(false)
   const topProducts = [
    {
      id: 1,
      name: "Nike Air Max",
      sold: 25,
      revenue: 3200,
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      sold: 21,
      revenue: 2800,
    },
    {
      id: 3,
      name: "Puma RS-X",
      sold: 18,
      revenue: 2400,
    },
    {
      id: 4,
      name: "New Balance 574",
      sold: 15,
      revenue: 1900,
    },
    {
      id: 5,
      name: "Converse Chuck 70",
      sold: 12,
      revenue: 1500,
    },
  ];
  const mostSellProducts = []
  const fetchSellerDash = async ()=>{
    try{
      const res = await axios.get("http://localhost:7777/dashboard",{withCredentials:true})
      setdata(res.data.data)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchSellerDash()
  },[])
  data?.result?.map((e)=>{
   if(e.length == 0) return 
   e.map((elm)=>{
    mostSellProducts.push(elm)
   })
  })
  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
  <h1 className="mb-8 text-3xl font-bold">Seller Dashboard</h1>

  {/* Stats */}
  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <p className="text-slate-400">Total Orders</p>
      <h2 className="mt-2 text-3xl font-bold text-blue-400">
        {data?.NumberOfOrder}
      </h2>
    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <p className="text-slate-400">Average Rating</p>
      <h2 className="mt-2 text-3xl font-bold text-yellow-400">
        {data?.averageRating} ⭐
      </h2>
    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <p className="text-slate-400">Total Revenue</p>
      <h2 className="mt-2 text-3xl font-bold text-green-400">
        ₹{data?.totalRevenue}
      </h2>
    </div>
  </div>

  {/* Top 5 Products */}
  <div className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
    <div className="border-b border-slate-800 p-5">
      <h2 className="text-xl font-semibold text-white">
        Top 5 Most Selling Products
      </h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4 text-left text-slate-300">#</th>
            <th className="p-4 text-left text-slate-300">Product</th>
            <th className="p-4 text-center text-slate-300">Category</th>
            <th className="p-4 text-right text-slate-300">Price</th>
          </tr>
        </thead>

        <tbody>
          {mostSellProducts.map((product, index) => (
            <tr
              key={product.id}
              className="border-t border-slate-800 transition hover:bg-slate-800/50"
            >
              <td className="p-4">{index + 1}</td>

              <td className="p-4 font-medium">{product.name}</td>

              <td className="p-4 text-center">{product.category}</td>

              <td className="p-4 text-right font-semibold text-green-400">
                ₹{product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {CreateStore && <AddStore setCreateStore={setCreateStore}/>}
    <div className='absolute right-0 p-5'>
      <button className='py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center'onClick={()=>setCreateStore((prev)=>!prev)}><IoMdAdd/>Add Store</button>
    </div>
  </div>
</div>
  )
}

export default SellerDashboard
