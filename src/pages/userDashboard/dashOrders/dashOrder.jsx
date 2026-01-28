import style from "./orders.module.css"
import { Link } from "react-router-dom"
import OrdersTable from "./ordersData/ordersTable"
import { MdAddShoppingCart } from "react-icons/md"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import { useState } from "react"
function Orders() {
    const [query, setQuery] =useState({
        page: 1,
        limit: 15
    })
    const { data, error, isLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getAll?page=${query.page}&limit=${query.limit}`)
    const QuantityFn = () => {

    }
    const CategoryFn = () => {

    }
    console.log(data)
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1> Orders </h1>
                    <div className={style.counter}>
                        <p className={style.p}>Count {data?.orders?.length || 0}</p>
                    </div>
                    <div className={style.mySelect}>
                        <select onChange={(e) => QuantityFn(e.target.value)}>
                            <option value="">All Products</option>
                            <option value="available">Available</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="unavailable">Unavailable</option>
                            <option value="new">recently Added</option>
                        </select>
                    </div>

                    <div className={style.mySelect}>
                        <select onChange={(e) => CategoryFn(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="Iphone">Iphone</option>
                            <option value="watch">Watch</option>
                            <option value="charger">Charger</option>
                            <option value="airpod">Airpod</option>
                        </select>
                    </div>
                    {/* <div className={style.btnBox}>
                        <Link to={`/e-dashboard/add-product`} >
                            <p><MdAddShoppingCart /> <span>Add New </span> </p>
                        </Link>
                    </div> */}
                </div>
                <div className={style.tableContainer}>
                    <OrdersTable data={data} limit={data.limitPage} offset={data.offset}/>
                </div>
            </div>
        </>
    )
}

export default Orders