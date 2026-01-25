import ProdductTable from "./productData/productsTable"
import { Link, Navigate } from "react-router-dom"
import style from "./products.module.css"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import { MdAddShoppingCart } from "react-icons/md";
import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../../component/Context/authContext/authContext";
function DashProduct() {
    const { user,accessToken } = useAuth()
    const [query, setQuery] = useState({
        quantity_status: "",
        category: "",
        page: 1,
        limit: 15
    })
    const { data } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/product/getAll/?query=${JSON.stringify(query)}`)
    const decreasePage = () => {
        setQuery((prev) => {
            if (prev.page > 0) {
                return { ...prev, page: prev.page - 1 }
            }
        })
        console.log("Page :", query.page)
    }
    const increasePage = () => {
        setQuery((prev) => {
            return { ...prev, page: prev.page + 1 }
        })
        console.log("Page :", query.page)
    }
    const QuantityFn = (value) => {
        console.log("Category:", value)
        setQuery((prev) => {
            if (prev.page > 0) {
                return { ...prev, quantity_status: value }
            }
        })
    }
    const CategoryFn = (value) => {
        console.log("Category:", value)
        setQuery((prev) => {
            if (prev.page > 0) {
                return { ...prev, category: value }
            }
        })
    } 
    // if(!accessToken || !user.username && !user.role !== "staff" && !user.role !== "admin"){
    //     return <Navigate to="/" />
    // }
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1> Products </h1>
                    <div className={style.counter}>
                        <p className={style.p}>Count {data.products?.length || 0}</p>
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
                    <div className={style.btnBox}>
                        <Link to={`/e-dashboard/add-product`} >
                            <p><MdAddShoppingCart /> <span>Add New </span> </p>
                        </Link>
                    </div>
                </div>
                <div className={style.tableContainer}>
                    <ProdductTable data={data?.products} offset={data?.offset} limit={data?.limit} page={query.page} onIncrease={increasePage} onDecrease={decreasePage} />
                </div>
            </div>
        </>
    )
}
export default DashProduct