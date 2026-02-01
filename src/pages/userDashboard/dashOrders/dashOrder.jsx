import style from "./orders.module.css"
import { Link } from "react-router-dom"
import OrdersTable from "./ordersData/ordersTable"
import { MdAddShoppingCart } from "react-icons/md"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import { useState } from "react"
function Orders() {
    const [query, setQuery] = useState({
        page: 1,
        limit: 15,
        status: "",
        category: "",
        search: ""
    })
    const { data, error, isLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getAll?query=${JSON.stringify(query)}`)
    const StatusFn = (status) => {
        setQuery((prev) => {
            return { ...prev, status: status }
        })
    }
    const searchFn = (value) => {
        setQuery((prev) => {
            return { ...prev, search: value.toLowerCase() }
        })
        console.log(value)
    }
    const CategoryFn = (category) => {
        setQuery((prev) => {
            return { ...prev, category: category }
        })
    }
    const decreasePage = () => {
        setQuery((prev) => {
            if (prev.page > 0) {
                return { ...prev, page: prev.page - 1 }
            }
        })
    }
    const increasePage = () => {
        setQuery((prev) => {
            return { ...prev, page: prev.page + 1 }
        })
    }
    const updateStatusFn = async ({ value, id }) => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/orders/updateStatus`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value,
                    id,
                }),
            })
            const data = resp.json()
            if (!resp.ok) {
                console.log(`Error: ${data.message}`)
                throw new Error(`Error: ${data.message} \n Staus: ${resp.status}`);
            }
            console.log("Status Updated Successfully")
        } catch (error) {
            throw new Error(error.message);
        }
        // }
        // submit()
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1> Orders <span>{data?.orders?.length || 0}</span></h1>
                    <div className={style.searchBox}>
                        <input type="text" className={style.search} onChange={(e) => searchFn(e.target.value)} placeholder="Search by Email, Order ID" />
                    </div>
                    <div className={style.mySelect}>
                        <select onChange={(e) => StatusFn(e.target.value)}>
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="delivered">Delivered</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className={style.mySelect}>
                        <select onChange={(e) => CategoryFn(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="iphone">Iphone</option>
                            <option value="watch">Watch</option>
                            <option value="charger">Charger</option>
                            <option value="airpod">Airpod</option>
                        </select>
                    </div>
                </div>
                <div className={style.tableContainer}>
                    <OrdersTable data={data} limit={data.limitPage} offset={data.offset} page={query?.page} onDecrease={decreasePage} onIncrease={increasePage} onUpdateStatus={updateStatusFn} />
                </div>
            </div>
        </>
    )
}

export default Orders