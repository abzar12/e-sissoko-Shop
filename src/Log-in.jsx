import React, { useEffect } from "react"
import "./style/login.css"

function Login() {
    // useEffect(() => {
    //     const Handlesubmit = (e) => {
    //         e.preventDefault  // to stop loading page

    //     }
    //     Handlesubmit()
    // },[])

    return (
        <>
            <div className="Login">
                <form action="">
                    <div className="">
                        <label htmlFor="" className="text-black">Email</label>
                        <input type="email" placeholder="" />
                    </div>
                    <div className="">
                        <label htmlFor="" className="text-black">Password</label>
                        <input type="password" placeholder="" />
                    </div>
                    <div className="btn-submit">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;