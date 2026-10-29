import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MyAlert from "../component/PopUp/myAlert";
import z from "zod";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import "../component/style/addProduct.css"
import { Navigate } from "react-router-dom";

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
        // .min(1, "Discount Price is required")
        .optional(),
    Quantity: z
        .string()
        .min(1, "Quantity is required")
        .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
            message: "Quantity must be a number greater than 0",
        }),
    Color: z.string().min(2, "Color field must be at least 2 characters"),
    Size: z.string().optional(),
    Weight: z.string().optional(),
    Dimensions: z.string().optional(),
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
    console.log("AddProduct rendered ")
    const [category, setCategory] = useState(null)
    const [subcategory, setSubcategory] = useState(null)
    const [loading, setLoading] = useState(false)
    const [Alert, setAlert] = useState({
        is_show: false,
        status: false,
        children: "",
    })
    const [fileImage, SetFileImage] = useState([]); // manage image after sending 
    // react form validation schema 
    const {
        register,
        handleSubmit,
        formState: { errors, value },
        reset,
    } = useForm({
        mode: "onChange", // real-time validation
        resolver: zodResolver(ProductSchema)
    });
    // function for handling image file
    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        SetFileImage(files);
    };
    // function for handling submition 
    const onSubmit = async (data) => {
        const formData = new FormData();
        // Append form data
        Object.entries(data).forEach(([key, value]) => {
            if (key != "Img_url") {
                formData.append(key, value);
            }
        });
        // Append images
        fileImage.forEach(file => formData.append("Img_url", file));
        console.log('My image files : ', fileImage)
        setLoading(true)

        // sending data to server
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/Product?table=Phone&folder=Product_images`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            const data = await resp.json();
            console.log("***", data)
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}. `);
            }
            // reset the field after submit 
            reset();
            SetFileImage([]);
            console.log(`Status: ${resp.status} Message: ${data.message}`);
            setAlert((prev) => {
                return { ...prev, is_show: true, status: true, children: data.message }
            })
        } catch (err) {
            console.error("fetching Data failed: ", err);
        } finally {
            setLoading(false)
        }
    }
    console.log(category)
    // ---------------------------------------- return ------------------------------------------
    return (
        <>
            <div className="">
                < MyAlert show={Alert.is_show} children={Alert.children} status={Alert.status} onClose={(prev) => setAlert({ ...prev, is_show: false })} />
            </div>
            <div className="ac_form">
                <h2 className="text-2xl font-bold mb-4 text-center"> <MdOutlineAddShoppingCart className="inline text-3xl" /> Add New Product</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)} >
                    {/* ------------------Product Name */}
                    <div className="container-input">
                        {/* ------------------Product sku */}
                        <div className="Box">
                            <label htmlFor="" className="">SKU <span className="text-red-500 ">*</span></label>
                            <input
                                type="text"

                                placeholder="LAPT-HP-15-256"
                                name="sku"
                                className={`input ${errors.sku ? "border-red-600" : ""}`}
                                {...register("sku")}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Product Name <span className="text-red-500 ">*</span></label>
                            <input
                                type="text"

                                placeholder="e.g Samsung Galaxy S24 Ultra"
                                {...register("Name",)}
                                name='Name'
                                className={`input ${errors.Name ? "border-red-400" : ""}`} />
                        </div>
                    </div>
                    {errors.sku && <p className="text-red-500 text-sm">{errors.sku?.message}</p>}
                    {errors.Name && <p className="text-red-500 text-sm">{errors.Name?.message}</p>}
                    <div className="container-input">
                        {/* ------------------Product Category */}
                        <div className="">
                            <label htmlFor="category" className="">Category <span className="text-red-500 ">*</span></label>
                            <select name="Category"  {...register("Category", { onChange: (e) => setCategory(e.target.value) })} id="category" className={`input ${errors.Category ? "border-red-400" : ""}`} >
                                <option value="">Select category</option>
                                <option value="Clothing">Clothing & Fashion</option>
                                <option value="Electronics"> Electronics</option>
                                <option value="Grocery & Food">Grocery & Food</option>
                                <option value="Home & Furniture">Home & Furniture</option>
                                <option value="Sports & Outdoors">Sports & Outdoors</option>
                                <option value="Toys & Baby Products">Toys & Baby Products</option>
                                <option value="Automotive"  >Automotive</option>
                                <option value="Books, Stationery & Office Supplies">Books, Stationery & Office Supplies</option>
                                <option value="Home Improvement"  >Home Improvement</option>
                            </select>
                        </div>
                        {/* ------------------Product Quantity */}
                        <div className="">
                            <label htmlFor="" className="">Stock Quantity <span className="text-red-500 ">*</span></label>
                            <input
                                type="number"

                                placeholder="Available quantity"
                                name="Quantity"
                                className={`input ${errors.Quantity ? "border-red-600" : ""}`}
                                {...register("Quantity")}
                            />
                        </div>
                        {errors.Category && <p className="text-red-500 text-sm">{errors.Category?.message}</p>}
                        {errors.Quantity && <p className="text-red-500 text-sm">{errors.Quantity?.message}</p>}
                    </div>
                    {category === "Electronics" && (
                        <div className="row">
                            <label htmlFor="subcategory" className="">Subcategory<span className="text-red-500 ">*</span></label>
                            <select name="subCategory" {...register("Subcategory", { onChange: (e) => setSubcategory(e.target.value) })} id="subcategory" className={`input ${errors.Subcategory ? "border-red-400" : ""}`} >
                                <option value="">Select Subcategory</option>
                                <option value="Laptop">Laptops and computers</option>
                                <option value="Phone">Mobile phones</option>
                                <option value="Televisions">Televisions</option>
                                <option value="Camera">Camera</option>
                                <option value="Headphones">Headphones and accessories</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Tablets">Tablets</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Computer Accessories">Computer Accessories</option>
                                <option value="Phone Accessories">Phone Accessories</option>
                                <option value="Gaming Consoles">Gaming Consoles</option>
                                <option value="Printers & Scanners">Printers & Scanners</option>
                            </select>
                        </div>

                    )}
                    <p className="text-red-500 text-sm">{errors.Subcategory?.message}</p>
                    {/* </div> */}

                    {category === "Clothing" && (
                        <div className="row">
                            <label htmlFor="subcategory" className="">
                                Subcategory<span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subCategory"
                                {...register("Subcategory", {
                                    onChange: (e) => setSubcategory(e.target.value)
                                })}
                                id="subcategory" className={`input ${errors.Subcategory ? "border-red-400" : ""}`}
                            >
                                <option value="">Select Subcategory</option>
                                <option value="Shirts">Shirts</option>
                                <option value="T-Shirts">T-Shirts</option>
                                <option value="Trousers">Trousers</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Skirts">Skirts</option>
                                <option value="Jackets & Coats">Jackets & Coats</option>
                                <option value="Sweaters & Hoodies">Sweaters & Hoodies</option>
                                <option value="Shorts">Shorts</option>
                                <option value="Suits">Suits</option>
                                <option value="Sportswear">Sportswear</option>
                                <option value="Underwear">Underwear</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    )}
                    {/* ------------------Product Brand*/}

                    <div className="container-input">
                        <div className="">
                            <label htmlFor="">Brand <span className="text-red-500 ">*</span></label>
                            <input
                                type="text"

                                name="Brand"
                                placeholder="e.g Samsung"
                                className={`input ${errors.Brand ? "border-red-600" : "border"}`}
                                {...register("Brand")}
                            />
                        </div>
                        {category === "Clothing" && (
                            <div className="">
                                <label htmlFor="gender">Gender</label>
                                <input
                                    title="gender"
                                    type="text"
                                    id="gender"
                                    name="Gender"
                                    placeholder="Men, Women, Unisex"
                                    className={`input ${errors.Gender ? "border-red-600" : "border"}`}
                                    {...register("Gender")}
                                />
                            </div>)}
                        {category == "Grocery & Food" && (
                            <div className="row">
                                <label htmlFor="subcategory">
                                    Subcategory <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="subCategory"
                                    id="subcategory"
                                    {...register("Subcategory", {
                                        required: "Subcategory is required",
                                        onChange: (e) => setSubcategory(e.target.value)
                                    })}
                                    className={`input ${errors.Subcategory ? "border-red-400" : ""
                                        }`}
                                >
                                    <option value="">Select Subcategory</option>
                                    <option value="Grains & Cereals">Grains & Cereals</option>
                                    <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                                    <option value="Meat & Seafood">Meat & Seafood</option>
                                    <option value="Cooking Essentials">Cooking Essentials</option>
                                    <option value="Bakery & Snacks">Bakery & Snacks</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Canned & Packaged Foods">
                                        Canned & Packaged Foods
                                    </option>
                                    <option value="Frozen Foods">Frozen Foods</option>
                                    <option value="Organic Foods">Organic Foods</option>
                                    <option value="Baby Food">Baby Food</option>
                                </select>
                            </div>
                        )}
                        {category === "Electronics" && (<div className="">
                            <label htmlFor="">Model <span className="text-red-500 "></span></label>
                            <input
                                type="text"
                                name="Model"
                                placeholder="Unique product ID"
                                className={`input ${errors.Model ? "border-red-600" : "border"}`}
                                {...register("Model")}
                            />
                        </div>)}

                        {category === "Home & Furniture" && (
                            <div className="row">
                                <label htmlFor="subcategory">
                                    Subcategory <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="subCategory"
                                    id="subcategory"
                                    {...register("Subcategory", {
                                        required: "Subcategory is required",
                                        onChange: (e) => setSubcategory(e.target.value)
                                    })}
                                    className={`input ${errors.Subcategory ? "border-red-400" : ""
                                        }`}
                                >
                                    <option value="">Select Subcategory</option>
                                    <option value="Living Room Furniture">Living Room Furniture</option>
                                    <option value="Bedroom Furniture">Bedroom Furniture</option>
                                    <option value="Dining Room Furniture">Dining Room Furniture</option>
                                    <option value="Office Furniture">Office Furniture</option>
                                    <option value="Kitchen & Dining">Kitchen & Dining</option>
                                    <option value="Home Decor">Home Decor</option>
                                    <option value="Lighting">Lighting</option>
                                    <option value="Storage & Organization">Storage & Organization</option>
                                    <option value="Bathroom Accessories">Bathroom Accessories</option>
                                    <option value="Outdoor Furniture">Outdoor Furniture</option>
                                    <option value="Rugs & Carpets">Rugs & Carpets</option>
                                    <option value="Curtains & Blinds">Curtains & Blinds</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        )}

                        {errors.Brand && <p className="text-red-500 text-sm inline">{errors.Brand?.message}</p>}
                        {errors.Model && <p className="text-red-500 text-sm ">{errors.Model?.message}</p>}
                        {errors.Gender && <p className="text-red-500 text-sm ">{errors.Gender?.message}</p>}
                    </div>


                    {/* ------------------Product Price */}
                    <div className="container_3inputs">
                        <div className="">
                            <label htmlFor="cost_price" className="">Cost Price <span className="text-red-500 ">*</span></label>
                            <input type="text"
                                id="cost_price"
                                placeholder="Cost Price"
                                name="Cost Price"
                                className={`input ${errors.cost_price ? "border-red-600" : ""}`}
                                {...register("cost_price")} />
                        </div>
                        <div className="">
                            <label htmlFor="sell_price" className="">Sell Price <span className="text-red-500 ">*</span></label>
                            <input type="text"
                                id="sell_price"
                                placeholder="Sell Price"
                                name="sell_price"
                                className={`input ${errors.sell_price ? "border-red-600" : ""}`}
                                {...register("sell_price")} />
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Discount Price</label>
                            <input type="text"
                                placeholder="Discount Price"
                                name="Promot_Price"
                                className={`input ${errors.Promot_Price ? "border-red-600" : ""}`}
                                {...register("Promot_Price")}
                            />
                        </div>
                    </div>
                    <div className={`${errors.Promot_Price ? "flex justify-around" : ""}`}>
                        <p className="text-red-500 text-sm">{errors.cost_price?.message}</p>
                        <p className="text-red-500 text-sm">{errors.sell_price?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Discount_Price?.message}</p>
                    </div>
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="currency" className="">Currency Code</label>
                            <select id="currency" name="Currency" {...register("Currency")} className={`input ${errors.Currency ? "border-red-400" : ""}`} >
                                <option value="">Select Currency</option>
                                <option value="FCFA">FCFA</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="shipping" className="">Shipping Option <span className="text-red-500 ">*</span></label>
                            <select name="Shipping" defaultValue="pickup" id="shipping" className={`input ${errors.Shipping ? "border-red-600" : "border"}`}
                                {...register("Shipping")}>
                                <option value="">Select Shipping</option>
                                <option value="standars" className="select">Standars</option>
                                <option value="express">Express</option>
                                <option value="pickup">Pickup</option>
                            </select>
                        </div>
                        <p className="text-red-500 text-sm">{errors.Currency?.message}</p>
                        <p className="text-red-500 text-sm">{errors.Shipping?.message}</p>
                    </div>
                    {/* ------------------Product Color */}

                    {category === "Clothing" && (
                        <div className="container_3inputs">
                            <div className="">
                                <label htmlFor="" className="">Color <span className="text-red-500 ">*</span></label>
                                <select name="Color" {...register("Color", { required: true })} className={`input ${errors.Color ? "border-red-600" : "border"}`}>
                                    <option value="">Select Color</option>
                                    <option value="black">Black</option>
                                    <option value="white">White</option>
                                    <option value="red">Red</option>
                                    <option value="Blue">blue</option>
                                    <option value="brown">Brown</option>
                                    <option value="Gray">Gray</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="" className="">Size </label>
                                <input
                                    type="text"

                                    placeholder="e.g S, M, L, XL,"
                                    name="Size"
                                    id=""
                                    className={`input ${errors.Size ? "border-red-600" : "border"}`}
                                    {...register("Size")}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="" className="">Weight </label>
                                <input
                                    type="text"

                                    placeholder="e.g 12"
                                    name="Weight"
                                    className={`input ${errors.Weight ? "border-red-600" : "border"}`}
                                    {...register("Weight")}
                                />
                            </div>
                        </div>)}
                    <div className="flex justify-around">
                        <p className="text-red-500 text-sm inline">{errors.Color?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Size?.message}</p>
                        <p className="text-red-500 text-sm ">{errors.Weight?.message}</p>

                    </div>
                    {/* ---------------------Product Dimensions */}
                    {/* <div className="Box">
                        <label htmlFor="">Dimensions (L x W x H) </label>
                        <input
                            type="text"

                            name="Dimensions"
                            placeholder="e.g 15 x 7 x 0.8cm"
                            className={`input ${errors.Dimensions ? "border-red-600" : "border"}`}
                            {...register("Dimensions")}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Dimensions?.message}</p> */}
                    {/* ------------------Product Shipping and Delivery_time */}
                    {/* <div className="">
                            <label htmlFor="" className="">Delivery Time <span className="text-red-500 ">*</span></label>
                            <input type="text"
                                placeholder="e.g. business days"
                                name="Delivery"
                                className={`input ${errors.Delivery ? "border-red-600" : "border"}`}
                                {...register("Delivery")}
                            />
                        </div> 
            </div>*/}
                    <div className="flex justify-around">
                        {/* <p className="text-red-500 text-sm">{errors.Delivery?.message}</p> */}
                    </div>
                    {/* ----------------Product Warranty / return Policy */}
                    <div className={`${category === "Home & Furniture" ? "container-input" : "rows"}`}>
                        <div className="">
                            <label htmlFor="" className="">Warranty / return Policy <span className="text-red-500 ">*</span></label>
                            <input type="text"

                                placeholder="e.g. 1 year Warranty"
                                name="Warranty"
                                defaultValue="null"
                                className={`input ${errors.Warranty ? "border-red-600" : "border"}`}
                                {...register("Warranty")}
                            />
                        </div>
                        {category === "Home & Furniture" && (<div className="">
                            <label htmlFor="dimensions" className="">Dimensions</label>
                            <input type="text"
                                id="dimensions"
                                title="Dimensions"
                                placeholder="Length × width × height"
                                name="Dimensions"
                                className={`input ${errors.Dimensions ? "border-red-600" : ""}`}
                                {...register("Dimensions")}
                            />
                        </div>
                        )}
                    </div>

                    <p className="text-red-500 text-sm">{errors.Warranty?.message}</p>
                    {/* ----------------Seller contact Email */}
                    {/* <div className="Box">
                        <label htmlFor="" className="">Seller contact Email <span className="text-red-500 ">*</span></label>
                        <input type="text"

                            placeholder="example@.gmail.com"
                            name="Contact_Email"

                            className={`input ${errors.Contact_Email ? "border-red-600" : "border"}`}
                            {...register("Contact_Email")}
                        />
                    </div> */}
                    {/* <p className="text-red-500 text-sm">{errors.Contact_Email?.message}</p> */}
                    {/* ------------------Product Description */}
                    <div className="Box">
                        <label htmlFor="">Description  <span className="text-red-500 ">*</span></label>
                        <textarea
                            name="Description"
                            placeholder="Write a detailed description..."
                            rows={5}

                            className={`textarea ${errors.Description ? "border-red-600" : "border"}`}
                            {...register("Description")}
                        >
                        </textarea>
                    </div>
                    <p className="text-red-500 text-sm">{errors.Description?.message}</p>
                    {/* ------------------Product Image */}
                    <div className="Box">
                        <label htmlFor="">Product Image <span className="text-red-500 ">*</span></label>
                        <input
                            type="file"
                            name="Img_url"
                            multiple
                            className={`input ${errors.Img_url ? "border-red-600" : "border"}`}
                            {...register("Img_url", { onChange: ((e) => handleFile(e)) })}
                        />
                    </div>
                    <p className="text-red-500 text-sm">{errors.Img_url?.message}</p>
                    <p className="p">Upload up to 8 images</p>
                    <div className="ac-btn">
                        <button type="submit" className="">
                            {
                                !loading ?
                                    <>
                                        <MdOutlineAddShoppingCart className="inline text-3xl" /> Add Product
                                    </>
                                    :
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                                        <p className="text-gray-500">Loading...</p>
                                    </div>
                            }
                        </button>
                    </div>
                </form >
            </div >
        </>
    )
}
export default AddProduct;
