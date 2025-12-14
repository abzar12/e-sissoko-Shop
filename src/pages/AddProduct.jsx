import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MyAlert from "../component/PopUp/myAlert";
import z from "zod";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import "../component/style/addProduct.css"

const ProductSchema = z.object({
    Name: z.string().min(2, "Product name must be at least 2 characters"),
    Category: z.string().min(2, "Category is required"),
    Brand: z.string().min(2, "Brand field must be at least 2 characters"),
    Model: z.string().min(2, "Model field must be at least 2 characters"),
    Price: z
        .string()
        .min(1, "Price is required")
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: "Price must be a positive number",
        }),
    Promot_Price: z
        .string()
        .min(1, "Discount Price is required")
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: "Discount Price must be a positive number",
        }).optional(),
    Quantity: z
        .string()
        .min(1, "Quantity is required")
        .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
            message: "Quantity must be a number greater than 0",
        }),
    Color: z.string().min(2, "Color field must be at least 2 characters"),
    Size: z.string().min(2, "Size field must be at least 2 characters").optional(),
    Weight: z.string().min(2, "Weight field must be at least 2 characters").optional(),
    Dimensions: z.string().min(2, "Dimension is incorrect ").optional(),
    Shipping: z.string().min(2, "Shipping is required"),
    Delivery: z.string().min(2, "Delivery Time is required "),
    Warranty: z.string().min(2, "Warranty field is incorrect "),
    Contact_Email: z.string().min(1, { message: "Please Email is required" }).email({ message: 'Invalid Email format' }),
    Description: z.string().min(100, "Description must be at least 100 characters"),
    Img_url: z
        .any()
        .refine(
            (files) => files && files.length > 0,
            { message: "File must be at least 1 image" }
        ),

})
function AddProduct() {
    const [Alert, setAlert]=useState({
        is_show: false,
        status: false,
        children: "",
    })
    const [fileImage, SetFileImage] = useState([]); // manage image after sending 
    // react form validation schema 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange", // real-time validation
        resolver: zodResolver(ProductSchema),
    });
    // function for handling image file
    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        SetFileImage(files);
        console.log('Abzar this is making you tired', files)
    };
    // function for handling submition 
    const onSubmit = async (data) => {
        const formData = new FormData();
        // Append form data
        Object.entries(data).forEach(([key, value]) => {
            if(key != "Img_url"){
                formData.append(key, value);
            }
        });
        // Append images
        fileImage.forEach(file => formData.append("Img_url", file));
        console.log('My image files : ', fileImage)

        // sending data to server
        try {
            const resp = await fetch(`http://localhost:5330/Product?table=Phone&folder=Product_images`, {
                method: "POST",
                body: formData,
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}. `);
            }
            const data = await resp.json();
            // reset the field after submit 
            reset();
            SetFileImage([]);
            console.log(`Status: ${resp.status} Message: ${data.message}`);
            setAlert((prev) => {
                return {...prev, is_show: true, status: true, children: data.message}
            })
        } catch (err) {
            console.error("fetching Data failed: ", err);
        }
    }

    // ---------------------------------------- return ------------------------------------------
    return (
        <>
        <div className="">
            < MyAlert show={Alert.is_show} children={Alert.children} status={Alert.status} onClose={(prev) => setAlert({...prev, is_show:false} )}/>
        </div>
            <div className="ac_form ">
                <h2 className="text-2xl font-bold mb-4 text-center"> <MdOutlineAddShoppingCart className="inline text-3xl" /> Add New Product</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)} >
                    {/* ------------------Product Name */}
                    <div className="Box">
                        <label htmlFor="" className="">Product Title</label>
                        <input
                            type="text"
                            defaultValue="Abzar_Camara"
                            placeholder="e.g Samsung Galaxy S24 Ultra"
                            {...register("Name",)}
                            name='Name'
                            className={`input ${errors.Name ? "border-red-400" : ""}`} />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Name?.message}</p>
                    {/* ------------------Product Category */}
                    <div className="Box">
                        <label htmlFor="" className="">Category</label>
                        <select name="Category" {...register("Category")} id="" className={`input ${errors.Category ? "border-red-400" : ""}`} >
                            <option value="">Select category</option>
                            <option value="clothes">Clothes</option>
                            <option value="electronics">Electronics</option>
                            <option value="shoes">Shoes</option>
                            <option value="books">Books</option>
                            <option value="Phone" defaultValue={"Phone"} >Phone</option>
                        </select>
                        <p className="text-red-500 text-sm">{errors.Category?.message}</p>
                    </div>
                    {/* ------------------Product Brand and SKU/Model */}
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="">Brand</label>
                            <input
                                type="text"
                                defaultValue="Abzar_Camara"
                                name="Brand"
                                placeholder="e.g Samsung"
                                className={`input ${errors.Brand ? "border-red-600" : "border"}`}
                                {...register("Brand")}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Model</label>
                            <input
                                type="text"
                                defaultValue="Abzar_Camara"
                                name="Model"
                                placeholder="Unique product ID"
                                className={`input ${errors.Model ? "border-red-600" : "border"}`}
                                {...register("Model")}
                            />
                        </div>

                    </div>
                    <div className="flex justify-around">
                        <p className="text-red-500 text-sm inline">{errors.Brand?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Model?.message}</p>
                    </div>


                    {/* ------------------Product Price */}
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="" className="">Price (GHS)</label>
                            <input type="number"
                                defaultValue="123"
                                placeholder=""
                                name="Price"
                                className={`input ${errors.Price ? "border-red-600" : ""}`}
                                {...register("Price")} />
                        </div>
                        <div className="Box">
                            <label htmlFor="" className="">Discount Price (GHS)</label>
                            <input type="number"
                                defaultValue="123"
                                placeholder=""
                                name="Promot_Price"
                                className={`input ${errors.Promot_Price ? "border-red-600" : ""}`}
                                {...register("Promot_Price")}
                            />
                        </div>
                    </div>
                    <div className={`${errors.Promot_Price ? "flex justify-around" : ""}`}>
                        <p className="text-red-500 text-sm">{errors.Price?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Discount_Price?.message}</p>
                    </div>
                    {/* ------------------Product Quantity */}
                    <div className="Box">
                        <label htmlFor="" className="">Stock Quantity</label>
                        <input
                            type="number"
                            defaultValue="123"
                            placeholder=""
                            name="Quantity"
                            className={`input ${errors.Quantity ? "border-red-600" : ""}`}
                            {...register("Quantity")}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Quantity?.message}</p>
                    {/* ------------------Product Color */}
                    <div className="container_3inputs">
                        <div className="">
                            <label htmlFor="" className="">Color</label>
                            <input
                                type="text"
                                defaultValue="Abzar_Camara"
                                placeholder="e.g Black"
                                name="Color"
                                id=""
                                className={`input ${errors.Color ? "border-red-600" : "border"}`}
                                {...register("Color")}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Size</label>
                            <input
                                type="text"
                                defaultValue="Abzar_Camara"
                                placeholder="e.g S, M, L, XL,"
                                name="Size"
                                id=""
                                className={`input ${errors.Size ? "border-red-600" : "border"}`}
                                {...register("Size")}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Weight</label>
                            <input
                                type="text"
                                defaultValue="Abzar_Camara"
                                placeholder="e.g 12"
                                name="Weight"
                                className={`input ${errors.Weight ? "border-red-600" : "border"}`}
                                {...register("Weight")}
                            />
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <p className="text-red-500 text-sm inline">{errors.Color?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Size?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Weight?.message}</p>

                    </div>
                    {/* ---------------------Product Dimensions */}
                    <div className="Box">
                        <label htmlFor="">Dimensions (L x W x H)</label>
                        <input
                            type="text"
                            defaultValue="Abzar_Camara"
                            name="Dimensions"
                            placeholder="e.g 15 x 7 x 0.8cm"
                            className={`input ${errors.Dimensions ? "border-red-600" : "border"}`}
                            {...register("Dimensions")}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Dimensions?.message}</p>
                    {/* ------------------Product Shipping and Delivery_time */}
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="" className="">Shipping Option</label>
                            <select name="Shipping" id="" className={`input ${errors.Shipping ? "border-red-600" : "border"}`}
                                {...register("Shipping")}>
                                <option value="">Select </option>
                                <option value="clothes" className="select">Standars</option>
                                <option value="electronics">Express</option>
                                <option value="shoes">Pickup</option>
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Delivery Time</label>
                            <input type="text"
                                defaultValue="Abzar_Camara"
                                placeholder="e.g. business days"

                                name="Delivery"

                                className={`input ${errors.Delivery ? "border-red-600" : "border"}`}
                                {...register("Delivery")}
                            />
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <p className="text-red-500 text-sm">{errors.Shipping?.message}</p>
                        <p className="text-red-500 text-sm">{errors.Delivery?.message}</p>
                    </div>
                    {/* ----------------Product Warranty / return Policy */}
                    <div className="Box">
                        <label htmlFor="" className="">Warranty / return Policy</label>
                        <input type="text"
                            defaultValue="Abzar_Camara"
                            placeholder="e.g. 1 year Warranty"
                            name="Warranty"

                            className={`input ${errors.Warranty ? "border-red-600" : "border"}`}
                            {...register("Warranty")}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Warranty?.message}</p>
                    {/* ----------------Seller contact Email */}
                    <div className="Box">
                        <label htmlFor="" className="">Seller contact Email</label>
                        <input type="text"
                            defaultValue="Abzar@gmail.coma"
                            placeholder="example@.gmail.com"
                            name="Contact_Email"

                            className={`input ${errors.Contact_Email ? "border-red-600" : "border"}`}
                            {...register("Contact_Email")}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Contact_Email?.message}</p>
                    {/* ------------------Product Description */}
                    <div className="Box">
                        <label htmlFor="">Description </label>
                        <textarea
                            name="Description"
                            placeholder="Write a detailed description..."
                            rows={5}
                            defaultValue="lsdjsdnfnjkdsnfjkdbnhjkfbnjkdnjkfndsjklsdjsdnfnjkdsnfjkdbnhjkfbnjkdnjkfndsjklsdjsdnfnjkdsnfjkdbnhjkfbnjkdnjkfndsjklsdjsdnfnjkdsnfjkdbnhjkfbnjkdnjkfndsjk"
                            className={`textarea ${errors.Description ? "border-red-600" : "border"}`}
                            {...register("Description")}
                        >
                        </textarea>
                    </div>
                    <p className="text-red-500 text-sm">{errors.Description?.message}</p>
                    {/* ------------------Product Image */}
                    <div className="Box">
                        <label htmlFor="">Product Image</label>
                        <input
                            type="file"
                            name="Img_url"
                            multiple
                            className={`input ${errors.Img_url ? "border-red-600" : "border"}`}
                            {...register("Img_url", { onChange:((e) => handleFile(e))})}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Img_url?.message}</p>
                    <p className="p">Upload up to 8 images</p>
                    <div className="ac-btn">
                        <button type="submit" className=""><MdOutlineAddShoppingCart className="inline text-3xl" /> Add Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddProduct;
