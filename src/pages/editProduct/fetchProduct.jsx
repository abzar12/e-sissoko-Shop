import React, { useEffect, useState } from "react";

function FetchProduct(uuid){
    console.log("fetchproduct rendered ")
    const [is_loading, setIs_loading] = useState(false)
    const [data, setData] = useState([])
     useEffect(() => {
        const getData = async () => {
                setIs_loading(true)
            if (!uuid){
                return
            }
            try {
                const resp = await fetch(`http://localhost:7000/product/${uuid}`);
                if (!resp.ok) {
                    throw new Error(`Could not fetch data error: ${resp.status}`)
                }
                const data = await resp.json();
                console.log("response from server: ",data)
                setData(data.product)
            } catch (Err) {
                console.log("Fetching Data Failed", Err)
            }finally{
                setTimeout(() =>{
                    setIs_loading(false)
                }, 1500)
            }
        }
        getData()
    }, [uuid])
    return {data: data, loading: is_loading};
}
export default FetchProduct