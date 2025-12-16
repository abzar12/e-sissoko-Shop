
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useFetch = () => {
    const [data, setData] = useState([])
    const [searchParam] = useSearchParams()
    const Id = searchParam.get("Id")

    useEffect(() => {
        async function GetData() {
            try {

                const resp = await fetch(`${import.meta.env.VITE_API_URL}/product/slug/${Id}`);
                if (resp.status != 201) {
                    throw new Error("Product Could not fetch in API: ", resp.status)
                }
                const Data = await resp.json()
                console.log("Curent product from database: ",Data)
                setData(Data.product)
            } catch(error) {
                console.error(`Fetching Product Error : ${error}`)
            }
        }
        GetData()
    }, [])
    return [data];
}
export default useFetch;