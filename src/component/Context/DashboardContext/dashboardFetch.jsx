import { useEffect, useState } from "react"

function useDashboardFetch(url) {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return
        const getData = async () => {
            try {
                setLoading(true)
                const resp = await fetch(url, {
                    headers: { "Content-Type": "application/json" }
                })
                const data = await resp.json()
                if (!resp.ok || !data.success) {
                    throw new Error(data.message || "Fetching failed");
                }
                console.log("Dashboard Fetch Loaded; Data: ", data)
                setData(data.response)
            } catch (error) {
                setError(`Dashboard Fetching Error: ${error.message}`);
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [url])
    
    return { data, isLoading, error };

}
export default useDashboardFetch