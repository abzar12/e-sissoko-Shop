import { stringify } from "postcss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FetchProduct from "./fetchProduct";
import Loading from "../../component/loading/Loading";
import ProductInfo from "./editProductInfo";

function EditProduct() {
    const [searchParams] = useSearchParams();// use for search a word to the url sent to frontend
    const Id = searchParams.get("Id") // Id is searching onto url
    const {data, loading} = FetchProduct(Id)
    console.log("EditProduct page rendered")
    return (
        <>
        {
            loading  
            ? 
             (
                <div className="flex justify-center items-center bg-white h-[100vh]">
                    <Loading  />
                </div>
             ) : 
            (
                <ProductInfo data={data} uuid ={Id} />
            )
        }
        </>
    )
}
export default EditProduct;







// const handleItem = (e) => {
    //     console.log("current value: ", e.target)
    //     const name = e.target.name
    //     const value = e.target.value
    //     setItem((prev) => {
    //         return ({ ...prev, [name]: value })
    //     })
    // }
    // const handlefile = (e) => {
    //     setFile(e.target.files[0])
    // }
    // const HandleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("Name", data.Name);
    //     formData.append("Price", data.Price);
    //     formData.append("Color", data.Color);
    //     formData.append("Quantity", data.Quantity);
    //     formData.append("Category", data.Category);
    //     formData.append("Description", data.Description);
    //     formData.append("Id", data.Id);
    //     if (file ) {
    //         formData.append("Img_url", file);
    //         formData.append("OldImage", data.OldImage)
    //     } else {
    //         formData.append("OldImage", data.OldImage)
    //     }
    //     try {
    //         const resp = await fetch(`http://localhost:5330/product/edit-product?table=${item.Category}`, {
    //             method: "POST",
    //             body: formData,
    //         });
    //         if (!resp.ok) {
    //             throw new Error(`Client Error: the data can not be save !! ${resp.status}`);
    //         }
    //         const data = await resp.json();
    //         setItem({
    //             Name: "",
    //             Price: "",
    //             Color: "",
    //             Quantity: "",
    //             Category: "",
    //             Description: ""
    //         });
    //         setFile("");
    //         navigate("/")
    //     } catch (Error) {
    //         console.log('Client side error:', Error);
    //     }
    // }