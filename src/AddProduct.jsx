import { useState } from "react";

function AddProduct() {
    const [valid, SetValid] = useState("")
    const [product, SetProduct] = useState(
        {
            Name: "",
            Price: "",
            Color: "",
            Quantity: "",
            Category: "",
            Description: ""
        }
    )
    const [fileImage, SetFileImage] = useState("")
    const handleProduct = (e) => {
        const { name, value } = e.target;
        SetProduct((prev) => {
            return ({ ...prev, [name]: value })
        })
    }
    const handleFile = (e) =>{
        SetFileImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', product.Name)
        formData.append('Price', product.Price)
        formData.append('Color', product.Color)
        formData.append('Quantity', product.Quantity)
        formData.append('Category', product.Category)
        formData.append('Description', product.Description)
        formData.append('Img_url', fileImage)
        try{
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
            Price: "",
            Color: "",
            Quantity: "",
            Category: "",
            Description: "",
        });
        }catch(err){
            console.error("fetching Data failed: ", err);
        }
    }
    return (
        <>
            <div className="ac_form border max-w-[500px] mt-5 mx-5 sm:mx-auto p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
                <form action="" className=" " onSubmit={HandleSubmit}>
                    {/* Product Name */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-[15px]">Product Name</label>
                        <input type="text" placeholder="" value={product.Name} name='Name' onChange={handleProduct} className="input border w-full py-[5px] rounded-lg px-3" />
                    </div>

                    {/* Product Price */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-sm">Price (GHS)</label>
                        <input type="number" placeholder="" value={product.Price} name="Price" onChange={handleProduct} className="input border  w-full py-[5px] rounded-lg px-3" />
                    </div>
                    {/* Product Color */}
                     <div className="mb-3">
                        <label htmlFor="" className="block text-sm">Color</label>
                        <select name="Color" value={product.Color} onChange={handleProduct} id="" className="input border w-full py-[5px] rounded-lg">
                            <option value="">Select Color</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="red">Red</option>
                            <option value="brown">Brown</option>
                            <option value="Gray">Gray</option>
                            <option value="yellow">Yellow</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {/* Product Quantity */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-sm">Quantity</label>
                        <input type="number" placeholder="" value={product.Quantity} name="Quantity" onChange={handleProduct} className="input border  w-full py-[5px] rounded-lg px-3" />
                    </div>

                    {/* Product Category */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-sm">Category</label>
                        <select name="Category" value={product.Category} onChange={handleProduct} id="" className="input border w-full py-[5px] rounded-lg">
                            <option value="">Select category</option>
                            <option value="clothes">Clothes</option>
                            <option value="electronics">Electronics</option>
                            <option value="shoes">Shoes</option>
                            <option value="books">Books</option>
                            <option value="Phone">Phone</option>
                        </select>
                    </div>
                    {/* Product Description */}
                    <div className="mb-3">
                        <label htmlFor="">Description</label>
                        <textarea name="Description" value={product.Description} onChange={handleProduct} id="" maxLength={100} className="input border w-full px-3 py-[5px] rounded-lg">
                        </textarea>
                    </div>
                    {/* Product Image */}
                    <div className="mb-3">
                        <label htmlFor="">Product Image</label>
                        <input type="file" name="Img_url" onChange={handleFile} id="" className="input border w-full py-[5px] rounded-lg" />
                    </div>
                    <div className="ac-btn">
                        <button type="submit" className="border rounded-lg bg-green-600 w-full py-2 text-white">Add Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddProduct;
