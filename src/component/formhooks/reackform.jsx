

import React from "react";
import { useForm } from "react-hook-form";



function ReactForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        mode: "onChange",
        defaultValues: {
            Name: "",
            Role: ""
        },
    });

    const onsubmit = (data) => {
        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} className="w-[400px] min-h-[200px] mx-auto">
                <input className={`w-full rounded-lg my-3 px-3 py-2 border-2 outline-none  ${errors.Name ? " border-red-700" : "border-black"}`} type="text" {...register('Name', { required: "Name field is required", minLength: {value: 2 , message:"Name field must be more than four(4)"} })} placeholder="type your Name"/>
                <p className="text-red-600"> {errors.Name?.message } </p>
                <input className="w-full rounded-lg my-3 px-3 py-2" type="text" {...register('Role', { required: "Role field is required", minLength: {value: 2, message:"Name field must be more than Two(2)"} })} placeholder="type your Role"/>
                <p className="text-red-600">{errors.Role?.message}</p>
                <button type="submit" className="w-[150px] mx-auto bg-green-600 py-3 rounded-lg block">Submit</button>
            </form>
        </>
    )
}
export default ReactForm;