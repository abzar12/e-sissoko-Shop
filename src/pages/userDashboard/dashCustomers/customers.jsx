import { use, useState } from "react"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import style from "./customers.module.css"
import CustomersTable from "./customersData/customersTable"
function DashCustomers() {
    const [query, setQuery] = useState({
        status: "all",
        page: 1,
        limit: 50,
        search: ""
    })
    const [isactive, setIsactive] = useState(query.status)
    const { data } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/customers/getAllCustomers/?query=${JSON.stringify(query)}`)
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
    const searchFn = (value) => {
        setQuery((prev) => {
            return { ...prev, search: value.toLowerCase() }
        })
    }
    const FiltterFn = (value) => {
        setIsactive(value)
        setQuery((prev) => {
            return { ...prev, status: value }
        })

    }
    // console.log(data)
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1>Customers <span className={style.p}>{data?.customers?.length || 0}</span></h1>
                    <div className={style.searchBox}>
                        <input type="text" className={style.search} onChange={(e) => searchFn(e.target.value)} placeholder="Search by email, name, ID " />
                    </div>
                    <div className={style.filterBtnBox}>
                        <div className={style.filterButtons}>
                            {["all", "paid", "unpaid"].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => FiltterFn(filter)}
                                    className={`${style.filterButton} ${isactive === filter ? style.active : null}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
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