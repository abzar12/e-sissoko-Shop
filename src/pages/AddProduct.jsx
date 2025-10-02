import { useState } from "react";
import "../component/style/addProduct.css"

function AddProduct() {
    const [valid, SetValid] = useState("")
    const [product, SetProduct] = useState(
        {
            Name: "",
            Category: "",
            Brand: "",
            Model: "",
            Price: "",
            Discount_Price: "",
            Quantity: "",
            Color: "",
            Size: "",
            Weight: "",
            Dimensions: "",
            Shipping: "",
            Delivery: "",
            Warranty: "",
            Contact_Email: "",
            Description: "",
        }
    )
    const [fileImage, SetFileImage] = useState("")
    const handleProduct = (e) => {
        const { name, value } = e.target;
        SetProduct((prev) => {
            return ({ ...prev, [name]: value })
        })
    }
    const handleFile = (e) => {
        SetFileImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', product.Name)
        formData.append('Category', product.Category)
        formData.append('Brand', product.Brand)
        formData.append('Model', product.Model)
        formData.append('Price', product.Price)
        formData.append('Discount_Price', product. Discount_Price)
        formData.append('Quantity', product.Quantity)
        formData.append('Color', product.Color)
        formData.append('Size', product.Size)
        formData.append('Weight', product.Weight)
        formData.append('Dimensions', product.Dimensions)
        formData.append('Shipping', product.Shipping)
        formData.append('Delivery', product.Delivery)
        formData.append('Warranty', product.Warranty)
        formData.append('Contact_Email', product.Contact_Email)
        formData.append('Description', product.Description)
        formData.append('Img_url', fileImage)
        try {
            const resp = await fetch(`http://localhost:5330/Product?table=${product.Category}`, {
                method: "POST",
                body: formData,
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();
            SetValid(data);
            // reset the field after submit 
            SetFileImage("")
            SetProduct({
                Name: "",
                Category: "",
                Brand: "",
                Model: "",
                Price: "",
                Discount_Price: "",
                Quantity: "",
                Color: "",
                Size: "",
                Weight: "",
                Dimensions: "",
                Shipping: "",
                Delivery: "",
                Warranty: "",
                Contact_Email: "",
                Description: "",
            });
        } catch (err) {
            console.error("fetching Data failed: ", err);
        }
    }
    return (
        <>
            <div className="ac_form ">
                <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
                <form action="" className=" " onSubmit={HandleSubmit}>
                    {/* ------------------Product Name */}
                    <div className="Box">
                        <label htmlFor="" className="">Product Title</label>
                        <input
                            type="text"
                            placeholder="e.g Samsung Galaxy S24 Ultra"
                            value={product.Name}
                            name='Name'
                            onChange={handleProduct}
                            className="input" />
                    </div>
                    {/* ------------------Product Category */}
                    <div className="Box">
                        <label htmlFor="" className="">Category</label>
                        <select name="Category" value={product.Category} onChange={handleProduct} id="" className="input">
                            <option value="">Select category</option>
                            <option value="clothes">Clothes</option>
                            <option value="electronics">Electronics</option>
                            <option value="shoes">Shoes</option>
                            <option value="books">Books</option>
                            <option value="Phone">Phone</option>
                        </select>
                    </div>
                    {/* ------------------Product Brand and SKU/Model */}
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="">Brand</label>
                            <input
                                type="text"
                                name="Brand"
                                placeholder="e.g Samsung"
                                value={product.Brand}
                                onChange={handleProduct}
                                className="input" />
                        </div>
                        <div className="">
                            <label htmlFor="">Model</label>
                            <input
                                type="text"
                                name="Model"
                                placeholder="Unique product ID"
                                value={product.Model}
                                onChange={handleProduct}
                                className="input" />
                        </div>
                    </div>

                    {/* ------------------Product Price */}
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="" className="">Price (GHS)</label>
                            <input type="number"
                                placeholder=""
                                value={product.Price}
                                name="Price"
                                onChange={handleProduct}
                                className="input" />
                        </div>
                        <div className="Box">
                            <label htmlFor="" className="">Discount Price (GHS)</label>
                            <input type="number"
                                placeholder=""
                                value={product.Discount_Price}
                                name="Discount_Price"
                                onChange={handleProduct}
                                className="input" />
                        </div>
                    </div>
                    {/* ------------------Product Quantity */}
                    <div className="Box">
                        <label htmlFor="" className="">Stock Quantity</label>
                        <input
                            type="number"
                            placeholder=""
                            value={product.Quantity}
                            name="Quantity"
                            onChange={handleProduct}
                            className="input" />
                    </div>
                    {/* ------------------Product Color */}
                    <div className="container_3inputs">
                        <div className="">
                            <label htmlFor="" className="">Color</label>
                            <input
                                type="text"
                                placeholder="e.g Black"
                                name="Color"
                                value={product.Color}
                                onChange={handleProduct}
                                id=""
                                className="input" />
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Size</label>
                            <input
                                type="text"
                                placeholder="e.g S, M, L, XL,"
                                name="Size"
                                value={product.Size}
                                onChange={handleProduct}
                                id=""
                                className="input" />
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Weight</label>
                            <input
                                type="text"
                                placeholder="e.g 12"
                                name="Weight"
                                value={product.Weight}
                                onChange={handleProduct}
                                className="input" />
                        </div>
                    </div>
                    {/* ---------------------Product Dimensions */}
                    <div className="Box">
                        <label htmlFor="">Dimensions (L x W x H)</label>
                        <input
                            type="text"
                            name="Dimensions"
                            placeholder="e.g 15 x 7 x 0.8cm"
                            onChange={handleProduct}
                            value={product.Dimensions}
                            className="input" />
                    </div>
                    {/* ------------------Product Shipping and Delivery_time */}
                    <div className="container-input">
                        <div className="">
                            <label htmlFor="" className="">Shipping Option</label>
                            <select name="Shipping" value={product.Shipping} onChange={handleProduct} id="" className="input">
                                <option value="">Select </option>
                                <option value="clothes" className="select">Standars</option>
                                <option value="electronics">Express</option>
                                <option value="shoes">Pickup</option>
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="" className="">Delivery Time</label>
                            <input type="text"
                                placeholder="e.g. business days"
                                value={product.Delivery}
                                name="Delivery"
                                onChange={handleProduct}
                                className="input" />
                        </div>
                    </div>
                    {/* ----------------Product Warranty / return Policy */}
                    <div className="Box">
                        <label htmlFor="" className="">Warranty / return Policy</label>
                        <input type="text"
                            placeholder="e.g. 1 year Warranty"
                            value={product.Warranty}
                            name="Warranty"
                            onChange={handleProduct}
                            className="input" />
                    </div>
                    {/* ----------------Seller contact Email */}
                    <div className="Box">
                        <label htmlFor="" className="">Seller contact Email</label>
                        <input type="text"
                            placeholder="example@.gmail.com"
                            value={product.Contact_Email}
                            name="Contact_Email"
                            onChange={handleProduct}
                            className="input" />
                    </div>
                    {/* ------------------Product Description */}
                    <div className="Box">
                        <label htmlFor="">Description </label>
                        <textarea
                            name="Description"
                            value={product.Description}
                            onChange={handleProduct}
                            placeholder="Write a detailed description..."
                            rows={5}
                            className="textarea">
                        </textarea>
                    </div>
                    {/* ------------------Product Image */}
                    <div className="Box">
                        <label htmlFor="">Product Image</label>
                        <input
                            type="file"
                            name="Img_url"
                            onChange={handleFile}
                            multiple
                            className="input" />
                    </div>
                    <p className="p">Upload up to 8 images</p>
                    <div className="ac-btn">
                        <button type="submit" className="">Add Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddProduct;
