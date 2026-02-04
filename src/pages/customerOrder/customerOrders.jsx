import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../component/Navbar"
import Button from "../../component/Button/button"
import Footer from "../../component/Footer"
import { Outlet, useNavigate } from "react-router-dom"
import useFetchData from "../../component/fetchProducts/fetchData"
import { useAuth } from "../../component/Context/authContext/authContext"
import { socket } from "../../component/socket/socket"


function CustomerOrders() {
    const { user } = useAuth()
    const [query, setQuery] = useState({
        page: 1,
        limit: 50,
        email: user?.email || "",
        status: ""
    })
    const { data, error, loading } = useFetchData(`${import.meta.env.VITE_API_URL}/orders/getCustomer/orders?query=${JSON.stringify(query)}`)

    const [Data, SetData] = useState(data)
    const StatusFn = (value) => {
        console.log(value)
        setQuery((prev) => {
            return { ...prev, status: value }
        })
    }
    useEffect(() => {
        SetData(data)
    }, [data])
    useEffect(() => {
        if (!socket) return;
        const handleOrderUpdate = (updatedOrder) => {
            SetData((prev) => {
                if (!Array.isArray(prev)) return prev;
                return prev.map((o) =>
                    o._id === updatedOrder._id ? updatedOrder : o
                );
            });
        };

        socket.on("orderUpdated", handleOrderUpdate);
        socket.on("connect", () => {
            console.log("✅ socket connected", socket.id);
        });

        return () => {
            socket.off("orderUpdated", handleOrderUpdate);
        };
    }, []);
    return (
        <>
            <Navbar />

            <main className=" bg-[var(--bg-color-primary)]  rounded-lg my-5 px-6 py-8 max-w-6xl mx-auto">
                <Link to="/" className="text-gray-400 mb-5 "> Go to Shopping</Link>

                <header className="flex flex-wrap items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white">My Orders</h2>
                    <div className="flex gap-3 items-center">
                        <select onChange={(e) => StatusFn(e.target.value)} className="bg-transparent border border-gray-700 px-3 py-1 rounded text-white focus:outline-none ">
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="shipping">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="Confirmed">Confirmed</option>
                        </select>
                        <Button children="Refresh" className="px-4 py-1 text-white rounded-full bg-[var(--bg-color-primary)]" />
                    </div>
                </header>

                <section className="space-y-6">
                    < Outlet context={{ Data }} />
                </section>
            </main>

            <Footer />
        </>
    )
}

export default CustomerOrders