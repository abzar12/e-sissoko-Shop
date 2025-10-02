import React, { useEffect, useState } from "react"
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../component/style/login.css"

function Login() {
    const [input, setInput] = useState({
        Email: "",
        Password: ""
    })
    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name
        // handling input values
        setInput(prev => {
            return ({ ...prev, [name]: value })
        })
    }
    // handling submit 
    const HandleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("Email", input.Email),
            formdata.append("Password", input.Password)
        try {
            const resp = await fetch("http://localhost:5330/api/login-me", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    Email: input.Email,
                    Password: input.Password
                })
            });
            const data = await resp.json();
            console.log(data);

        } catch (ERR) {
            console.log("Frontend: data failed ", ERR);
        }
    }

    return (
        <>
            <div className="Login" onSubmit={HandleSubmit}>
                <form action="" className=" max-w-[400px] rounded-xl shadow-[1px_1px_5px_rgb(0,0,0,0.5)] m-auto p-5 mt-28">
                    <h1 className="text-center text-2xl font-[Merriwether] font-bold mb-3">Log-in</h1>
                    <div className=" mb-5">
                        <label htmlFor="" className="text-black text-[1.2rem] font-semibold font-[Lora]">Email</label>
                        <div className="relative flex items-center ">
                            <label htmlFor="" className="absolute top-0 bg-gray-500 p-3.5 content-center text-white  "><MdEmail /></label>
                            <input type="email" name="Email" value={input.Email} onChange={handleInput} placeholder="example@gmail.com" className=" pl-12 py-2 w-full rounded-e-lg outline-none border-2 focus:border-gray-600" />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="" className="text-black text-[1.2rem] font-semibold font-[Lora]">Password</label>
                        <div className="relative">
                            <label htmlFor="" className="absolute top-0 bg-gray-500 p-3.5 text-white  "><FaLock /></label>
                            <input type="password" value={input.Password} onChange={handleInput} placeholder="Password" name="Password" className=" pl-12 py-2 w-full rounded-e-lg border-2 focus:border-gray-600 outline-none" />
                        </div>

                    </div>
                    <div className="btn-submit text-center">
                        <button type="submit" className="border transition-all duration-300 py-1.5 w-[100px] rounded-xl my-5 font-[Lora] text-[1.2rem] font-semibold bg-gray-300 hover:bg-[#2B2B2B] hover:text-white ">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;