
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import z, { array } from "zod";

function ProductInfo({ data, uuid }) {
    const Schema = z.object({
        Name: z.string().min(2, "Name must be at least 2 characters"),
        Brand: z.string().min(2, "Brand must be at least 2 characters"),
        Model: z.string().min(2, "Model field must be at least 2 characters"),
        Category: z.string().min(2, "Category is required"),
        Price: z
            .preprocess(
                (val) => Number(val),
                z.number().positive("Price must be a positive number")
            ),
        Promot_Price: z.preprocess(
            (val) => (val === "" || val == null ? undefined : Number(val)),
            z.number().nonnegative("Promot Price must be positive").optional()
        ),
        Quantity: z
            .preprocess(
                (val) => Number(val),
                z.number().positive("Quantity is required")
            ),
        Color: z.string().min(2, "Color field must be at least 2 characters"),
        // Size: z.string().min(2, "Size field must be at least 2 characters").optional(),
        // Weight: z.string().min(2, "Weight field must be at least 2 characters").optional(),
        // Dimensions: z.string().min(2, "Dimension is incorrect ").optional(),
        Shipping: z.string().min(2, "Shipping is required"),
        Delivery: z.string().min(2, "Delivery Time is required "),
        Warranty: z.string().min(2, "Warranty field is incorrect "),
        Contact_Email: z.string().min(1, { message: "Please Email is required" }).email({ message: 'Invalid Email format' }),
        Description: z.string().min(100, "Description must be at least 100 characters"),
        Img_url: z.any().optional()
    })
        .refine(
            (data) =>
                !data.Promot_Price || data.Promot_Price < data.Price,
            {
                message: "Promotion price must be less than regular price",
                path: ["Promot_Price"],
            }
        );
    // useForm to handle form submit
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "value",
        resolver: zodResolver(Schema),
        defaultValues: {
            Name: data.Name,
            Brand: data.Brand,
            Category: data.Category,
            Model: data.Model,
            Color: data.Color,
            Price: data.Price,
            Promot_Price: data.Promot_Price,
            Shipping: data.Shipping,
            Quantity: data.Quantity,
            Delivery: data.Delivery,
            Warranty: data.Warranty,
            Contact_Email: data.Contact_Email,
            Description: data.Description,
            Img_url: data.Image_Name
        }

    })
    const [files, setFiles] = useState([])
    // function to handle the file 
    const handlefile = (e) => {
        const files = Array.from(e.target.files)
        console.log(e.target.files)
        setFiles(files)
        console.log(files)
    }
    // function to handle the submittion 
    const onSubmit = async (data) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (key != "Img_url") {
                formData.append(key, value)
            }
            if (key === "Img_url") {
                files.forEach(file => {
                    formData.append("Img_url", file)
                })
            }
        })
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/product/${uuid}`, {
                method: "PUT",
                body: formData
            })
            if (!resp.ok) {
                throw new Error(`Client Error, Status: ${resp.status}`);
            }
            const data = await resp.json()
            console.log(data)
            reset({
                Name: "", Brand: "", Category: "", Model: "", Color: "", Price: "", Promot_Price: "", Shipping: "", Quantity: "", Delivery: "", Warranty: "", Contact_Email: "", Description: "", Img_url: null
            })
        } catch (error) {
            console.log(`CLient Error: ${error.message}`)
        }
    }
    console.log("editproductInfo rendered ")
    const Oldimages = data.Image_Name ? JSON.parse(data.Image_Name) : []
    return (
        <>
            <div className="ac_form border max-w-[700px] mt-5 mx-5 sm:mx-auto p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">Update Product</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    {/* Product Name */}
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Product Name</label>
                            <input type="text" {...register("Name", { required: true })} name='Name' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                        {/* Product Category */}
                        <div className="mb-3">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Category</label>
                            <select name="Category" {...register("Category", { required: true })} className="input text-gray-600 border w-full py-[5px] rounded-lg">
                                <option value="">Select category</option>
                                <option value="clothes">Clothes</option>
                                <option value="electronics">Electronics</option>
                                <option value="shoes">Shoes</option>
                                <option value="books">Books</option>
                                <option value="Phone">Phone</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-red-600 text-sm">{errors.Name?.message}</p>
                    <p className="text-red-600 text-sm">{errors.Category?.message}</p>
                    {/* Product Brand and Color */}
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Brand</label>
                            <input type="text" {...register("Brand", { required: true })} name='Brand' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Model</label>
                            <input type="text" {...register("Model", { required: true })} name='Model' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                    </div>
                    <p className="text-red-600 text-sm">{errors.Brand?.message}</p>
                    <p className="text-red-600 text-sm">{errors.Model?.message}</p>
                    {/* Product Price and promot price */}
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Price (GHS)</label>
                            <input type="text" {...register("Price", { required: true })} name='Price' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Promot Price</label>
                            <input type="text" {...register("Promot_Price")} name='Promot_Price' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                    </div>
                    <p className="text-red-600 text-sm">{errors.Price?.message}</p>
                    <p className="text-red-600 text-sm">{errors.Promot_Price?.message}</p>

                    {/* Product Color */}
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="mb-3">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Color</label>
                            <select name="Color" {...register("Color", { required: true })} className="input text-gray-600 border w-full py-[5px] rounded-lg">
                                <option value="">Select Color</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                                <option value="red">Red</option>
                                <option value="blue">blue</option>
                                <option value="brown">Brown</option>
                                <option value="gray">Gray</option>
                                <option value="yellow">Yellow</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {/* Product Quantity */}
                        <div className="mb-3">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Quantity</label>
                            <input type="number" {...register("Quantity", { required: true })} name="Quantity" className="input border text-gray-600 w-full py-[5px] rounded-lg px-3" />
                        </div>
                    </div>
                    <p className="text-red-600 text-sm">{errors.Color?.message}</p>
                    <p className="text-red-600 text-sm">{errors.Quantity?.message}</p>
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Delivery</label>
                            <input type="text" {...register("Delivery", { required: true })} name='Delivery' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                        <div className="">
                            <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Warranty</label>
                            <input type="text" {...register("Warranty", { required: true })} name='Warranty' className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                        </div>
                    </div>
                    <p className="text-red-600 text-sm">{errors.Delivery?.message}</p>
                    <p className="text-red-600 text-sm">{errors.Warranty?.message}</p>
                    {/* Product Shipping */}
                    <div className="mb-3">
                        <label htmlFor="">Shipping</label>
                        <input type="text" {...register("Shipping", { require: true })} name="Shipping" className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                    </div>
                    <p className="text-red-300">{errors.Shipping?.message}</p>
                    {/* Product Description */}
                    <div className="mb-3">
                        <label htmlFor="">Description</label>
                        <textarea name="Description" {...register("Description", { required: true })} className="input text-gray-600 border w-full px-3 py-[5px] rounded-lg">
                        </textarea>
                    </div>
                    <p className="text-red-600 text-sm">{errors.Description?.message}</p>
                    {/* Product Image */}
                    <div className="mb-3">
                        <label > Select New Images</label>
                        <input type="file" multiple name="Img_url" {...register("Img_url", { onChange: ((e) => handlefile(e)) })} className="input text-gray-600 border w-full py-[5px] rounded-lg" />
                        <div className="flex flex-wrap mt-3 p-2 gap-5">
                            <label >Old image</label>
                            {
                                Oldimages.map((images, index) => (
                                    <img key={index} src={`${import.meta.env.VITE_API_URL}/public/upload/Product_img/${images}`} className="h-32" />
                                ))
                            }
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="ac-btn">Add Product</button>
                    </div>
                </form >
            </div >
        </>
    )
}
export default ProductInfo



// setItem({
//     Name: data.Name,
//     Brand: data.Brand,
//     Category: data.Category,
//     Model: data.Model,
//     Color: data.Color,
//     Price: data.Price,
//     Promot_Price: data.Promot_Price,
//     Quantity: data.Quantity,
//     Delivery: data.Delivery,
//     Warranty: data.Warranty,
//     Contact_Email: data.Contact_Email,
//     Description: data.Description,
//     Img_url: data.Image_Name
// })

//          const [item, setItem] = useState({
//     Name: "",
//     Brand: "",
//     Category: "",
//     Model: "",
//     Color: "",
//     Price: "",
//     Promot_Price: "",
//     Quantity: "",
//     Delivery: "",
//     Warranty: "",
//     Contact_Email: "",
//     Img_url: "",
//     Description: "",
// })