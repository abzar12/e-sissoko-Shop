import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { AuthContext } from "../../component/Context/authContext/authContext";
import { MdEmail } from "react-icons/md";
import "../../component/style/login.css"
import BtnLoading from "../../component/loading/BtnLoading";

function Login() {
    console.log("Login rendered ")
    const [isloading, setisloading] = useState(false)
    const [error, setError] = useState(null)
    const { setUser, setAccessToken, setIsAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const schema = z.object({
        email: z.string().email("please the Email is required"),
        password: z
            .string()
            .min(8, "Please the Password should be at least 8 Characters")
            .max(32, { message: "Password cannot be more than 32 characters long" })
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema)
    })
    // handling submit 
    const onSubmit = async (inputs) => {
        setisloading(true)
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/users/login-me`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(inputs)
            });

            const data = await resp.json();
            // console.log(data);
            if (!resp.ok || resp.status === 404) {
                setError("Email or Password invalid")
                throw new Error(`Error : ${resp.status}`);
            }
            setTimeout(() => {
                setisloading(false)
                return navigate("/dashboard")
            }, 1200);
        } catch (Error) {
            console.log("Client: data failed ", Error.message);
        } finally {
        }
    }
    return (
        <>
            <div className="Login" >
                <form action="" className="ac-form " onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="title">Log-in</h1>
                    <h2 className="text-center text-red-500">{error}</h2>
                    <div className="mb-5">
                        <label htmlFor="" className="labelText">Email</label>
                        <div className="relative flex items-center ">
                            <label className="icon"><MdEmail /></label>
                            <input type="email"{...register("email", { required: true })} name="email" placeholder="example@gmail.com" className="input" />
                        </div>
                        <p className="text-red-600">{errors.name?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label className="labelText" >Password</label>
                        <div className="relative">
                            <label className="icon"><FaLock /></label>
                            <input type="password"{...register("password", { required: true })} placeholder="Password" name="password" className="input" />
                        </div>
                        <p className="text-red-600 text-lg">{errors.password?.message}</p>
                    </div>
                    <div className="btn-submit text-center text-white py-3">
                        {isloading ?
                            <BtnLoading />
                            :
                            <button type="submit" className="ac-btn"> Login</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;