import { Navigate } from "react-router-dom"
import CheckOutInfo from "./checkOutInfo"
import ItemInfo from "./itemInfo"
import Navbar from "../../component/Navbar"
import { useAuth } from "../../component/Context/authContext/authContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Cartcontext } from "../../component/Context/cartContext/cartContext"
// import PaymentPopup from "../../component/PopUp/paymentValidation"
function CheckOut() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { cart, sub_Total, ProductNumbers } = useContext(Cartcontext)
    // my state
    const deleveryFees = 25;
    const [deleveryFormValues, setDeleveryFormValues] = useState({
        deleveryMethod: [],
        editDeleveryMethod: true,
        total: sub_Total + deleveryFees,
        cart: cart,
        user: user
    })
    // My function 
    // this function handle the change fo input to select the delevery methode and the input is in checkOutInfo component
    const handleChange = (e) => {
        const { value } = e.target;
        setDeleveryFormValues((prev) => {
            if (prev.deleveryMethod.length !== 0) {
                console.log(deleveryFormValues.deleveryMethod)
                return { ...prev, deleveryMethod: [] }
            } else {
                console.log(deleveryFormValues.deleveryMethod)

                return { ...prev, deleveryMethod: [value] }
            }
        })
    }
    // this function handle confirm delevery method if is door delevery or pick up it will switch the value of editDeleveryMethod to false
    const handleClick = () => {
        setDeleveryFormValues((prev) => {
            return { ...prev, editDeleveryMethod: false }
        })
    }
    const handleEdit = () => {
        setDeleveryFormValues((prev) => {
            return { ...prev, editDeleveryMethod: true, deleveryMethod: [] }
        })
    }
    // function to send data to back-end 
    const handleOrdered = async (paymentMethod) => {

        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/check-out/ordered/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    deleveryFormValues,
                    paymentMethod,
                })
            })
            const data = await resp.json();
            if (!resp.ok) {
                console.log(`Failed, Error: ${data.message}`)
                throw new Error(`Failed, Status: ${data.message}`);
            }
            if(paymentMethod === "paystack"){
                console.log("My responses: ",resp)
                window.location.href = data.data.authorization_url
                return 
            }
            console.log("Before remove:", localStorage.getItem("ordP"));
            navigate("/payment/validated", {state: {isshow: true, reference:data.response.OrderNumber, amount:data.response.ItemsTotal}  })
            
        } catch (error) {
            console.log(`CheckOut Error: ${error}`)
            throw new Error(`CheckOut Error: ${error.message}`);
        }
    }
    // my condition
    if (user.role !== "customer") {
        return <Navigate to="/login-me" replace />
    }
    if (!cart || cart.length === 0) {
        return <Navigate to="/shop/cart" replace />
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-wrap sm:flex-nowrap gap-5 p-5">
                {/* this component contains the customer detail and delevery details form  */}
                <div className="w-full ">
                    <CheckOutInfo ProductNumbers={ProductNumbers} handleOrdered={handleOrdered} deleveryValues={deleveryFormValues} Delevery_value_Change={handleChange} submitClicked={handleClick} Edit={handleEdit} deleveryMethod={deleveryFormValues.deleveryMethod} total={deleveryFormValues.total} cart={cart} />
                </div>
                {/* this is the Orders Summary */}
                <div className="w-full sm:w-[350px] bg-white max-h-[250px] rounded-lg ">
                    <ItemInfo deleveryValues={deleveryFormValues} handleOrdered={handleOrdered} cart={cart} sub_Total={sub_Total} deleveryFees={deleveryFees} />
                </div>
            </div>
        </>
    )
}
export default CheckOut