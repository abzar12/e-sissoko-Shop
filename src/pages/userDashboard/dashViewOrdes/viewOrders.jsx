import style from "./viewOrders.module.css"
import ViewTable from "./viewData/viewTable"
import useDashboardFetch from "../../../component/Context/DashboardContext/dashboardFetch"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
function ViewOrders() {
    const [searchParams] = useSearchParams() // use for search a word to the url sent to frontend
    const Id = searchParams.get("Id")
    if(!Id.length) return 
    const [query, setQuery] = useState({
        page: 1,
        limit: 15,
        status: "",
        search: "",
        viewOnOrders: Id
    })
    const { data, error, isLoading } = useDashboardFetch(`${import.meta.env.VITE_API_URL}/orders/getAll?query=${JSON.stringify(query)}`)
    const FiltterFn = (Status) => {
        setQuery((prev) => {
            return { ...prev, status: Status }
        })
    }
    const SearchFn = (values) => {
        let value = values
        if (value === "failed") {
            value = "cancelled"
        }
        setQuery((prev) => {
            return { ...prev, search: value }
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
    return (
        <>
            <div className={style.container}>
                {/* Filters view */}
                <div className={style.filterContainer}>
                    <div className={style.filterWrapper}>
                        {/* Search */}
                        <div style={{ flex: 1, width: "100%" }}>
                            <input
                                type="text"
                                placeholder="Search by order reference or amount..."
                                onChange={(e) => SearchFn(e.target.value)}
                                className={`${style.input} ${style.searchInput}`}
                            />
                        </div>
                        {/* Filter Buttons */}
                        <div className={style.filterButtons}>
                            {["all", "paid", "pending", "failed"].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => FiltterFn(filter)}
                                    className={`${style.filterButton} ${style.filterButtonInactive}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={style.tableContainer}>
                    {/* Table */}
                    <div className={style.tableContainer}>
                        <div className={style.desktopView}>
                            <ViewTable data={data?.orders} limit={data.limitPage} offset={data.offset} page={query?.page} onDecrease={decreasePage} onIncrease={increasePage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewOrders