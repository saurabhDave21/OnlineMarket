import React, { useState } from 'react'
import Select from 'react-select';
import { Link } from 'react-router-dom';
const Register = () => {
    const Options = [
        { value: "user", label: "User" },
        { value: "seller", label: "Seller" },
    ];
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user");
    const [error, setError] = useState(null)
    const handleRegister = async (e) => {
        e.preventDefault()
        setError(null);
        const data = {
            name,
            email,
            password,
            type: role.value
        }
        try {
            const res = await fetch("http://localhost:7777/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(resData.message); // or resData.error
            }

            console.log(resData);
        }
        catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center">

            {/* Illustration */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
                <img
                    src="/undraw_content-team_1p7b.svg"
                    alt="Register Illustration"
                    className="w-0 sm:w-0 md:w-0 lg:w-125"
                />
            </div>

            {/* Register Form */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
                <form
                    onSubmit={handleRegister}
                    className="w-full max-w-sm border border-gray-500 rounded-lg shadow-sm shadow-gray-700"
                >
                    <fieldset className="fieldset bg-base-200 rounded-box p-6">
                        <legend className="fieldset-legend text-center text-2xl font-semibold">
                            Register
                        </legend>

                        <label className="label">
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className="label mt-3">
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

                        <Select
                            options={Options}
                            value={role}
                            onChange={setRole}
                            className="mt-4"
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

                        {error && (
                            <div className="mt-4 rounded bg-red-500 p-2 text-center text-white">
                                {error}
                            </div>
                        )}

                        <button className="btn w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white border-none">
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="text-blue-400 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Register
