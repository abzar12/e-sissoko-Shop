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