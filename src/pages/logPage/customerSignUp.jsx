import React, { useState } from "react";
import style from "../../component/style/Customersignup.module.css"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loading from "../../component/loading/Loading";
import { Link } from "react-router-dom";
function CustomersSignUp() {
    // the form is two if the next if false then we are in step otherwise in the step@
    const [next, setNext] = useState(false)
    const [isloading, setIsloading] = useState(false)
    // the schema of controle the input value 
    const schema = z.object({
        firstname: z.string().min(2, "First Name must be more than 2 characters "),
        lastname: z.string().min(2, "Last Name must be more than 2 characters "),
        email: z.string().email("Email field is required"),
        phone: z.string().regex(/^\+\d{7,15}$/, {
            message: "Invalid phone number format. Use +[country code][number] (e.g., +33123456789)"
        }),
        city: z.string().min(2, "Please, City is required"),
        area: z.string().min(2, "Please, Area/Neighborhood is required"),
        password: z.string().min(8, "Password must more than 8 characteres "),
        confirmpassword: z.string().min(8, "Confirm Password must more than 8 characteres ")

    }).refine((data) => data.password === data.confirmpassword, {
        message: "Passwords do not match",
        path: ["confirmpassword"],
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
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/signup-me`, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(dataForm)
                })
                 const data = await resp.json()
                console.log(data)
                if (!resp.ok) {
                    throw new Error(`Please, Sign Up failed status: ${resp.status}`);
                }
               
                reset()
            } catch (error) {
                console.log(`Sign-up Failed: ${error.message}`)
            } finally {
                setIsloading(false)
            }
        }
        submitData()
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
                    <h2 className={style.formTitle}>Sign-Up</h2>
                    <div className={`${style.cards} ${!next ? "block" : "hidden"}`}>
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
                            <input {...register("city", { required: true })} className={style.cardInput} type="text" name="city" required />
                            <label className={style.cardText}>City</label>
                        </div>
                        {errors.city ? <p className={style.Error}>{errors.city?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("area", { required: true })} className={style.cardInput} type="text" name="area" required />
                            <label className={style.cardText}>Area/Neighborhood</label>
                        </div>
                        {errors.area ? <p className={style.Error}>{errors.area?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("password", { required: true })} className={style.cardInput} type="password" name="password" required />
                            <label className={style.cardText}>Password</label>
                        </div>
                        {errors.password ? <p className={style.Error}>{errors.password?.message}</p> : null}
                        <div className={style.card}>
                            <input {...register("confirmpassword", { required: true })} className={style.cardInput} type="password" name="confirmpassword" required />
                            <label className={style.cardText}>Confirm Password</label>
                        </div>
                        {errors.confirmpassword ? <p className={style.Error}>{errors.confirmpassword?.message}</p> : null}
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
export default CustomersSignUp