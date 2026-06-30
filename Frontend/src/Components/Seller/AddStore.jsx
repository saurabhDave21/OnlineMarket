import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
const AddStore = ({setCreateStore}) => {
    const [StoreName, setStoreName] = useState()
    const [Description, setDescription] = useState()
    const [Contact, setContact] = useState()
    const handleAddStore = async()=>{
        const data={
            storename:StoreName,
            description:Description,
            contact:Contact
        }
       try{
        const res = await axios.post("http://localhost:7777/create-store",data,{withCredentials:true})
        if(res.status == 200){
             toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                setStoreName("")
                setDescription("")
                setContact("")
            }
       }
       catch(err){
       toast.error(
                err.response?.data?.message || "Something went wrong",
                {
                    position: "top-right",
                    closeOnClick: true,
                    autoClose: 5000,
                    theme: "dark",
                }
            );
       }
    }
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-zinc-900 rounded-xl p-6 shadow-2xl">
                <ToastContainer/>
                <h1 className='text-'>Create Store</h1>
                <div className='flex flex-col p-5'>
                    <label htmlFor="store" required>Store Name <span className='text-red-400'>*</span></label>
                    <input type="text" id='store' placeholder='Enter Store Name' className='py-1 px-3'value={StoreName} onChange={(e)=>setStoreName(e.target.value)}/>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id='desc' placeholder='Enter Description'className='py-1 px-3' value={Description} onChange={(e)=>setDescription(e.target.value)}/>
                    <label htmlFor="Contact">Contact Number <span className='text-red-400'>*</span></label>
                    <input type="tel" id='Contact' placeholder='Enter Contact Number'className='py-1 px-3'value={Contact} onChange={(e)=>setContact(e.target.value)}/>
                    <div className='flex items-center justify-center gap-5 mt-5'>
                        <button className='py-1.5 px-3 bg-blue-600 hover:bg-blue-700 rounded-lg' onClick={()=>handleAddStore()}>Submit</button>
                        <button className='py-1.5 px-5 bg-red-700 rounded-lg' onClick={()=>setCreateStore((prev)=>!prev)}>Back</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AddStore
