import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../../component/Footer"
import Navbar from "../../component/Navbar"
import ProfileInfo from "./profileInfo"
import { useAuth } from "../../component/Context/authContext/authContext"

function CustomerProfile() {
    const { user } = useAuth()
    const [Err, SetErr] = useState(null)
    const [customerData, SetCustomerData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/getCustomer/${user.email}`)
                const data = await resp.json()
                if (!resp.ok && !data.success) {
                    SetErr(data.message || "Failed to fetch customer data")
                    console.log("Response failed")
                    // throw new Error(`Response failed Status: ${resp.status}`);
                    return
                }
                SetErr(null);
                SetCustomerData(data.response);
                console.log(data);
            } catch (error) {
                console.log(`Getting customer Data Failed, Error: ${error.message}`)
                throw new Error(`Getting customer Data Failed, Error: ${error.message}`);
            }
        }
        getData()
    }, [])
    return (
        <>
            <Navbar />
            <div className=" my-5 grid grid-cols-1 sm:grid-cols-[1fr,_3fr] md:grid-cols-[1fr,_5fr]  gap-5 text-white px-5">
                <div className="bg-[var(--bg-color-primary)] rounded-xl flex flex-wrap sm:block  justify-around">
                    <div className="border border-[var(--bg-color)] my-2 py-1 px-3 rounded-full sm:rounded-[10px] sm:mt-5 sm:py-2 text-center mx-3 hover:bg-[var(--bg-color)] hover:cursor-pointer transition-all duration-300  ">
                        <Link to="/customer/profile">
                            <h1>Profile</h1>
                        </Link>
                    </div>
                    <div className="border border-[var(--bg-color)] my-2 py-1 px-3 rounded-full sm:rounded-[10px] sm:mt-5 sm:py-2 text-center mx-3 hover:bg-[var(--bg-color)] hover:cursor-pointer transition-all duration-300  ">
                        <Link to="/customer/orders">
                            <h1>Orders</h1>
                        </Link>
                    </div>
                    <div className="border border-[var(--bg-color)] my-2 py-1 px-3 rounded-full sm:rounded-[10px] sm:mt-5 sm:py-2 text-center mx-3 hover:bg-[var(--bg-color)] hover:cursor-pointer transition-all duration-300  ">
                        <Link to="/customer/forgot-password">
                            <h1>Password</h1>
                        </Link>
                    </div>
                </div>
                <div className="bg-[var(--bg-color-primary)] rounded-xl">
                    <h1 className=" py-2 pl-3 border-b-2 font-bold border-white/30 mb-5 mt-1">Cutomer Profile</h1>
                    <div className=" px-5">
                        {
                            customerData && < ProfileInfo data={customerData} />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default CustomerProfile