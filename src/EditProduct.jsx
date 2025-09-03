import { stringify } from "postcss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditProduct() {
    const [item, setItem] = useState({
        Name: "",
        Price: "",
        Color: "",
        Quantity: "",
        Category: "",
        Description: "",
        Id: 0,
        OldImage: ""
    })
    const [file, setFile] = useState("")
    const [searchParams] = useSearchParams();// use for search a word to the url sent to frontend
    const Id = searchParams.get("Id") // Id is searching onto url
    const navigate = useNavigate(); // use for navigate with different page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`http://localhost:5330/product/show-product?id=${Id}`);
                if (!resp.ok) {
                    throw new Error(`Could not fetch data error: ${resp.status}`)
                }
                const data = await resp.json();
                console.log(data);
                setItem({
                    Name: data.Nom,
                    Price: data.Price,
                    Color: data.Color,
                    Quantity: data.Quantity,
                    Category: data.Category,
                    Description: data.Description,
                    Id: data.Id_phone,
                    OldImage: data.Image
                });
                setFile(file)
            } catch (Err) {
                console.log("Fetching Data Failed", Err)
            }
        }
        fetchData();
    }, [])
    const handleItem = (e) => {
        const name = e.target.name
        const value = e.target.value
        setItem((prev) => {
            return ({ ...prev, [name]: value })
        })
    }
    const handlefile = (e) => {
        setFile(e.target.files[0])
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Name", item.Name);
        formData.append("Price", item.Price);
        formData.append("Color", item.Color);
        formData.append("Quantity", item.Quantity);
        formData.append("Category", item.Category);
        formData.append("Description", item.Description);
        formData.append("Id", item.Id);
        if (file ) {
            formData.append("Img_url", file);
            formData.append("OldImage", item.OldImage)
        } else {
            formData.append("OldImage", item.OldImage)
        }
        try {
            const resp = await fetch(`http://localhost:5330/product/edit-product?table=${item.Category}`, {
                method: "POST",
                body: formData,
            });
            if (!resp.ok) {
                throw new Error(`Client Error: the data can not be save !! ${resp.status}`);
            }
            const data = await resp.json();
            setItem({
                Name: "",
                Price: "",
                Color: "",
                Quantity: "",
                Category: "",
                Description: ""
            });
            setFile("");
            navigate("/")
        } catch (Error) {
            console.log('Client side error:', Error);
        }
    }
    return (
        <>
            <div className="ac_form border max-w-[500px] mt-5 mx-5 sm:mx-auto p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">Update Product</h2>
                <form action="" className=" " onSubmit={HandleSubmit}>
                    {/* Product Name */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Product Name</label>
                        <input type="text" placeholder="" value={item.Name} name='Name' onChange={handleItem} className="input text-gray-600 border w-full py-[5px] rounded-lg px-3" />
                    </div>

                    {/* Product Price */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Price (GHS)</label>
                        <input type="number" placeholder="" value={item.Price} name="Price" onChange={handleItem} className="input border text-gray-600 w-full py-[5px] rounded-lg px-3" />
                    </div>
                    {/* Product Color */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Color</label>
                        <select name="Color" value={item.Color} onChange={handleItem} className="input text-gray-600 border w-full py-[5px] rounded-lg">
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
                        <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Quantity</label>
                        <input type="number" placeholder="" value={item.Quantity} name="Quantity" onChange={handleItem} className="input border text-gray-600 w-full py-[5px] rounded-lg px-3" />
                    </div>

                    {/* Product Category */}
                    <div className="mb-3">
                        <label htmlFor="" className="block text-[1.2rem] font-[Roboto]">Category</label>
                        <select name="Category" value={item.Category} onChange={handleItem} className="input text-gray-600 border w-full py-[5px] rounded-lg">
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
                        <textarea name="Description" value={item.Description} onChange={handleItem} maxLength={100} className="input text-gray-600 border w-full px-3 py-[5px] rounded-lg">
                        </textarea>
                    </div>
                    {/* Product Image */}
                    <div className="mb-3">
                        <label > New Product Image</label>
                        <input type="file" name="Img_url" onChange={handlefile} className="input text-gray-600 border w-full py-[5px] rounded-lg" />
                        <div className="flex flex-wrap mt-3 p-2 gap-5">
                            <label >Old image</label>
                            <img src={` http://localhost:5330/public/img/${item.OldImage}`} alt={file} className="h-32" />
                            {/* {
                                file && (
                                    <label >New image</label>
                                )}
                            {
                                file ? (
                                    <img src={` http://localhost:5330/public/img/${file}`} alt={file.Image} className="h-32 max-w-[130px] border" />
                                ) : (
                                    <p className="max-w-[130px]">New Image not Updated Yet</p>
                                )
                            } */}

                        </div>

                    </div>
                    <div className="ac-btn">
                        <button type="submit" className="border rounded-lg bg-green-600 w-full py-2 text-white">Add Product</button>

                    </div>
                </form>
            </div>
        </>
    )
}
export default EditProduct;