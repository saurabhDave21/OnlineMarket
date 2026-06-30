import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const Navbar = () => {
    let user = useSelector((store) => store.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:7777/logout", {
                method: "GET",
                credentials: "include",
            });
            if(await res.status == 200){
                dispatch(removeUser())
                localStorage.removeItem("token")
                navigate("/")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm border-b border-gray-500">
                <div className="flex-1">
                    <Link to={user?.type == "user" ? "/dashboard" : "/seller/dashboard"} className="btn btn-ghost text-xl">Market<span className='text-blue-400 -mx-1.5'>Place</span></Link>
                </div>
                {user && <div className="flex gap-2 items-center justify-center">
                    {user?.type == "user" && <Link to="/cart"><FaShoppingCart className='text-xl'/></Link>}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
                            <div className="w-10 rounded-full text-2xl flex items-center justify-center">
                               <FaUser/>
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                           {user?.type == "seller" && <li><Link to={user?.type == "seller" && "/seller/products"}>Products</Link></li>}
                            <li><Link to={user?.type =="user"? "/order" :"/seller/order"}>Order</Link></li>
                            <li><button onClick={handleLogout} className='text-red-500'>Logout</button></li>
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Navbar
