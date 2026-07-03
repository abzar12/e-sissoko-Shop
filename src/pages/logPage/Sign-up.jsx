import React, { useState } from "react";
import style from "../../component/style/Customersignup.module.css"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loading from "../../component/loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
function SignUp() {
    // the form is two if the next if false then we are in step otherwise in the step@
    const navigate = useNavigate()
    const [next, setNext] = useState(false)
    const [isloading, setIsloading] = useState(false)
    // the schema of controle the input value 
    const schema = z.object({
        username: z.string().min(2, "User Name must be more than 2 characters "),
        firstname: z.string().min(2, "First Name must be more than 2 characters "),
        lastname: z.string().min(2, "Last Name must be more than 2 characters "),
        email: z.string().email("Email field is required"),
        phone: z.string().regex(/^\+\d{7,15}$/, {
            message: "Invalid phone number format. Use +[country code][number] (e.g., +33123456789)"
        }),
        role: z.string().min(2, "Please, Area/Neighborhood is required"),
        password: z.string().min(8, "Password must more than 8 characteres "),
        confirm_password: z.string().min(8, "Confirm Password must more than 8 characteres ")

    }).refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    })
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema)
    })
    const onSubmit = (dataForm) => {
        console.log(dataForm)
        const submitData = async () => {
            try {
                setIsloading(true)
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataForm)
                })
                const data = await resp.json()
                console.log(data)
                if (!resp.ok) {
                     toast.error(data.Error, {
                        duration: 4000,
                        position: "top-right",
                        style: {
                            background: "#dc2626",
                            color: "#fff",
                            borderRadius: "12px",
                            padding: "16px",
                            fontWeight: "600",
                            border: "1px solid #ef4444",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        },
                        iconTheme: {
                            primary: "#fff",
                            secondary: "#dc2626",
                        },
                    });
                    throw new Error(`Please, Sign Up failed status: ${resp.status}`);
                }
                toast.success(data.message, {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        background: "#16a34a",
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "16px",
                        fontWeight: "600",
                        border: "1px solid #22c55e",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#16a34a",
                    },
                });
                reset()
                navigate("/e-dashboard/users")
            } catch (error) {
                console.log(`Sign-up Failed: ${error.message}`)
            } finally {
                setIsloading(false)
            }
        }
        submitData()
    }
    const ErrorExit = Object.values(errors).some(Boolean)
    console.log("Customer Sign-up loaded")
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: 500,
                    },
                }}></Toaster>
            <div className={style.container}>
                {/* side Images */}

                {/* <div className={style.sideImg}>
                    <img src="/image/login.jpeg" alt="E-commerce" loading="lazy"  className={style.img} />
                </div> */}
                {/* form submition */}
                <form action="" className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={style.formTitle}>Sign-Up</h2>
                    <div className={`${style.cards} ${!next ? "block" : "hidden"}`}>
                        <div className={style.card}>
                            <input {...register("username", { required: true })} className={style.cardInput} type="text" name="username" required />
                            <label className={style.cardText}>User Name</label>
                        </div>
                        {errors.username ? <p className={style.Error}>{errors.username?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("firstname", { required: true })} className={style.cardInput} type="text" name="firstname" required />
                            <label className={style.cardText}>First Name</label>
                        </div>
                        {errors.firstname ? <p className={style.Error}>{errors.firstname?.message}</p> : null}
                        {/* <p>{error.name}</p> */}
                        <div className={style.card}>
                            <input {...register("lastname", { required: true })} className={style.cardInput} type="text" name="lastname" required />
                            <label className={style.cardText}>Last Name</label>
                        </div>
                        {errors.lastname ? <p className={style.Error}>{errors.lastname?.message}</p> : null}

                        <div className={style.card}>
                            <input {...register("email", { required: true })} className={style.cardInput} type="email" name="email" required />
                            <label className={style.cardText}>Email</label>
                        </div>
                        {errors.email ? <p className={style.Error}>{errors.email?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("phone", { required: true })} className={style.cardInput} type="text" name="phone" required />
                            <label className={style.cardText}>Phone</label>
                        </div>
                        {errors.phone ? <p className={style.Error}>{errors.phone?.message}</p> : null}
                        <div className={style.btnBox}>
                            <button type="button" disabled={ErrorExit} className={style.btn1} onClick={() => setNext(true)}>Next</button>
                        </div>
                        <div className={`${style.cardAccount} ${style.except}`}>
                            <Link to="/login-me" className={style.Account}>Already have an account <span>Log-in</span> </Link>
                        </div>
                    </div>
                    <div className={`${style.cards} ${next ? "block mt-[20px] " : "hidden"}`}>
                        <div className={style.card}>
                            <input {...register("role", { required: true })} className={style.cardInput} type="text" name="role" required />
                            <label className={style.cardText}>Role <small>(staff/admin)</small></label>
                        </div>
                        {errors.area ? <p className={style.Error}>{errors.area?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("password", { required: true })} className={style.cardInput} type="password" name="password" required />
                            <label className={style.cardText}>Password</label>
                        </div>
                        {errors.password ? <p className={style.Error}>{errors.password?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("confirm_password", { required: true })} className={style.cardInput} type="password" name="confirm_password" required />
                            <label className={style.cardText}>Confirm Password</label>
                        </div>
                        {errors.confirm_password ? <p className={style.Error}>{errors.confirm_password?.message}</p> : null}
                        <div className={style.btnBox}>
                            {
                                isloading ? <Loading /> : (
                                    <>
                                        <button type="button" className={style.btn} onClick={() => setNext(false)}>Back</button>
                                        <button type="submit" className={style.btn}>Submit</button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default SignUp