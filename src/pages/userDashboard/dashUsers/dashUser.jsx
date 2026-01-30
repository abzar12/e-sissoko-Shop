import { useState } from "react"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import style from "../dashCustomers/customers.module.css"
import UsersTable from "./userData/userTable"
function DashUsers() {
    const [query, setQuery] = useState({
        quantity_status: "",
        category: "",
        page: 1,
        limit: 50,
        search: ""
    })
    const { data } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/users/getAllUsers?query=${JSON.stringify(query)}`)
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
    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <h1>Users</h1>
                    <div className={style.searchBox}>
                        <input type="text" className={style.search} onChange={(e) => searchFn(e.target.value)} placeholder="Search by email, name, ID " />
                    </div>
                </div>
                <div className={style.tableContainer}>
                    <UsersTable data={data?.users} offset={data?.offset} limit={data?.limitPage} page={query.page} onIncrease={increasePage} onDecrease={decreasePage} />
                </div>
            </div>
        </>
    )
}
export default DashUsers