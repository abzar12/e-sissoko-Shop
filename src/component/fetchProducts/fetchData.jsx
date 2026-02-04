import { useEffect, useState } from "react";


function useFetchData(url) {
    const [loading, setloading] = useState(true)
    const [error, setError] = useState("")
    const [data, setDate] = useState(null)
    if(!url) return null
    useEffect(() => {
        const getData = async () => {
            setloading(true)
            try {
                const resp = await fetch(`${url}`, {
                    headers: { "Content-Type": "application/json" }
                });
                const data = await resp.json();
                if (!resp.ok) {
                    setError(`${data.message()}`)
                    throw new Error(`Please Check : ${resp.status}, ERROR: ${data.message()}`)
                }
                setDate(data.response);
                console.log(data.response)
                setloading(true)
            } catch (Err) {
                console.log("Fetching Data Failed", Err)
            } finally {
                setTimeout(() => {
                    setloading(false)
                }, 300);
            }
        }
        getData()
    }, [url])
    return { data: data, error: error, loading: loading}
}
export default useFetchData