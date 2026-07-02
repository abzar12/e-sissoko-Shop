import { useEffect, useState } from "react";

function useFetchData(url, query) {
    const [loading, setloading] = useState(true)
    const [error, setError] = useState("")
    const [data, setDate] = useState(null)
    if (!url) return null
    useEffect(() => {
        const getData = async () => {
            setloading(true)
            const params = new URLSearchParams();
            if (query) {
                Object.entries(query).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((item) => params.append(key, item));
                    } else if (value !== "" && value !== null && value !== undefined) {
                        params.set(key, value);
                    }
                });
            }
            try {
                const resp = await fetch(`${url}?${params.toString()}`, {
                    headers: { "Content-Type": "application/json" }
                });
                const data = await resp.json();
                if (!resp.ok) {
                    setError(`${data.message()}`)
                    throw new Error(`Please Check : ${resp.status}, ERROR: ${data.message()}`)
                }
                setDate(data.response);
                // console.log(data.response)
                setloading(true)
            } catch (Err) {
                console.log("Fetching Data Failed", Err)
            } finally {
                setTimeout(() => {
                    setloading(false)
                }, 500);
            }
        }
        getData()
    }, [url, query.status])
    return { data: data, error: error, loading: loading }
}
export default useFetchData