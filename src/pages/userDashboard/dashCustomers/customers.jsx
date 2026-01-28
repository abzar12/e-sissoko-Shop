import { useState } from "react"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import style from "./customers.module.css"
import CustomersTable from "./customersData/customersTable"
function DashCustomers() {
    const [query, setQuery] = useState({
        quantity_status: "",
        category: "",
        page: 1,
        limit: 50
    })
    const { data } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/customers/getAllCustomers/?query=${JSON.stringify(query)}`)
    console.log(data)
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
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1>Customers</h1>
                    <div className={style.counter}>
                        <p className={style.p}>Count {data?.customers?.length || 0}</p>
                    </div>
                </div>
                <div className={style.tableContainer}>
                    <CustomersTable data={data?.customers} offset={data?.offset} limit={data?.limitPage} page={query.page} onIncrease={increasePage} onDecrease={decreasePage} />
                </div>
            </div>
        </>
    )
}
export default DashCustomers