
import React, { useContext, useState } from "react";
import style from "../../component/style/Customersignup.module.css"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../../component/loading/Loading";
import { useAuth } from "../../component/Context/authContext/authContext";
function CustomersLogin() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [errormessage, setErrormessage] = useState(null)
    // the form is two if the next if false then we are in step otherwise in the step@
    const [isloading, setIsloading] = useState(false)
    // the schema of controle the input value 
    const schema = z.object({
        email: z.string().email("Email field is required"),
        password: z.string().min(8, "Password must more than 8 characteres "),
    })
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema)
    })
    const onSubmit = (dataFom) => {
        console.log(dataFom)
        const getData = async () => {
            try {
                setIsloading(true)
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/login-me`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(dataFom)
                })
                const data = await resp.json()
                console.log(data)
                login(data.token, data.user)
                reset()
                if (!data.success) {
                    setErrormessage(data.message)
                }
                if (!resp.ok) {
                    throw new Error(`Please, Sign Up failed status: ${resp.status}`);
                }
                navigate(-1)
            } catch (error) {
                console.log(`Sign-up Failed: ${error.message}`)
            } finally {
                setIsloading(false)
            }
        }
        getData()
    }
    const ErrorExit = Object.values(errors).some(Boolean)
    return (
        <>
            <div className={style.container}>
                {/* side Images */}

                <div className={style.sideImg}>
                    <img src="/image/login.jpg" alt="E-commerce" className={style.img} />
                </div>
                {/* form submition */}
                <form action="" className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={`${style.formTitle} ${style.except}`}>Log-in</h2>
                    {errormessage && <p className="bg-red-400 text-white  text-sm w-full h-14 content-center text-center">{errormessage}</p>}
                    <div className={`${style.cards} ${style.except}`}>
                        <div className={style.card}>
                            <input {...register("email", { required: true })} className={style.cardInput} type="email" name="email" required />
                            <label className={style.cardText}>Email</label>
                        </div>
                        {errors.email ? <p className={style.Error}>{errors.email?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("password", { required: true })} className={style.cardInput} type="password" name="password" required />
                            <label className={style.cardText}>Password</label>
                        </div>
                        {errors.password ? <p className={style.Error}>{errors.password?.message}</p> : null}
                        <div className={style.cardPassword}>
                            <Link className={style.ForgotPassword}>forgot password</Link>
                        </div>
                        <div className={style.btnBox}>
                            {
                                isloading ? <Loading /> :
                                    <button type="submit" disabled={ErrorExit} className={style.btn1}>Submit</button>
                            }
                        </div>
                        <div className={style.cardAccount}>
                            <Link to="/signup-me" className={style.Account}>Don't have an account <span>Register</span> </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CustomersLogin