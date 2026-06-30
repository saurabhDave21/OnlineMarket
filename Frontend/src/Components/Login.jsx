import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../Store/userSlice'
const Login = () => {
    const [email, setEmail] = useState("Gautam@gmail.com")
    const [password, setPassword] = useState("Gautam@123")
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        try {
            const res = await fetch("http://localhost:7777/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const resData = await res.json();

            dispatch(addUser(resData.data))
            if (!res.ok) {
                throw new Error(resData.message); // or resData.error
            }
            else {
                localStorage.setItem("token",JSON.stringify(resData.data.token))
                localStorage.setItem("type",JSON.stringify(resData.data.type))
                if(resData.data.type == "user"){
                    navigate("/dashboard")
                }
                else{
                    navigate("/seller/dashboard")
                }
            }
        }
        catch (err) {
            console.log(err.message);
            setError(err?.message);
        }
    }
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
                <img
                    src="/undraw_authentication_1evl.svg"
                    alt="Login Illustration"
                    className="w-0 sm:w-0 md:w-0 lg:w-125"
                />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm border border-gray-400 shadow-sm shadow-gray-700 rounded-lg"
                >
                    <fieldset className="fieldset bg-base-200 rounded-box p-6">

                        <legend className="fieldset-legend text-center text-2xl font-semibold">
                            Login
                        </legend>

                        <label className="label">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            className="input w-full"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className="label mt-3">
                            Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && (
                            <div className="mt-3 rounded bg-red-500 p-2 text-center text-white">
                                {error}
                            </div>
                        )}

                        <button className="btn w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white border-none">
                            Login
                        </button>

                        <p className="mt-4 text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-400 hover:underline"
                            >
                                Register
                            </Link>
                        </p>

                    </fieldset>
                </form>
            </div>

        </div>
    )
}

export default Login
