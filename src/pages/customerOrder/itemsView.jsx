import { useNavigate, useSearchParams } from "react-router-dom"
import { FaCartArrowDown } from "react-icons/fa"
import Button from "../../component/Button/button"
import { useEffect, useState } from "react"
import useFetchData from "../../component/fetchProducts/fetchData"
import { useAuth } from "../../component/Context/authContext/authContext"

function ItemsView() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const { user } = useAuth()
    const Order_ID = searchParams.get("ID")
    console.log(Order_ID)
    const [query, setQuery] = useState({
        page: 1,
        limit: 50,
        email: user?.email || "",
        status: "",
        id: Order_ID ?? Order_ID
    })
    const { data, error, loading } = useFetchData(`${import.meta.env.VITE_API_URL}/orders/getCustomer/orders?query=${JSON.stringify(query)}`)

    useEffect(() => {
        setQuery((prev) => ({
            ...prev,
            email: user?.email || "",
            id: Order_ID || ""
        }))
    }, [user, Order_ID])
    const orders = data?.orders || []
    // console.log(data)

    const formatDate = (d) => {
        try {
            return new Date(d).toLocaleString()
        } catch (e) {
            return d
        }
    }
    return (
        <>
            {
                data?.orders.length > 0 ?
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                        {

                            orders.map((item, index) => (
                                <div key={index || item.Order_Number} className="bg-[var(--bg-primary)] sm:flex gap-3 flex-wrap items-center shadow-md rounded-md">
                                    <div className=" flex ">
                                        <img src={`http://localhost:7000/public/upload/Product_img/${JSON.parse(item.Images)[0]}`} className="h-28 w-28 rounded-md" />
                                        <div className="overflow-hidden ">
                                            <h3 className="text-lg line-clamp-1 font-semibold text-gray-500 truncate">{item.Name}</h3>
                                            <p className="text-sm text-gray-500">Order: <span className="font-medium">{item.Order_Number}</span></p>
                                            <p className="text-sm text-gray-500">Qty: <span className="font-medium">{item.Quantity}</span></p>
                                            <p className="text-sm text-gray-500">Price: <span className="font-medium">{item.Price}</span></p>
                                            <p className="text-sm text-gray-500">Delivery: <span className="font-medium">{item.Delevery_Method || '—'}</span></p>
                                            <p className="text-xs text-gray-400 mt-1">Placed: {formatDate(item.Create_At)}</p>
                                        </div>
                                    </div>
                                    <div className=" py-2 flex-shrink-0 flex-1 flex flex-wrap sm:flex-nowrap justify-center items-center gap-3 border rounded-md px-1">
                                        <span className="text-black font-bold text-sm sm:text-lg">Amount: {item.Total_Amount} GHS</span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${item.Ordered_Status === 'delivered' ? 'bg-green-600' : item.Ordered_Status === 'Shipped' ? 'bg-blue-600' : 'bg-yellow-600'}`}>{item.Ordered_Status}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="py-12 text-center">
                        <div className="mb-4 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--bg-color-primary)]">
                            <FaCartArrowDown className="text-[var(--bg-primary)] text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-4">Looks like you haven't placed any orders.</p>
                        <Button children='Start Shopping' onClick={() => navigate('/')} className=" bg-[var(--bg-color-secondary)] px-6 py-2 hover:bg-[var(--bg-color-primary)] text-white rounded-full" />
                    </div>
            }
        </>
    )
}
export default ItemsView