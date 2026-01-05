import { Navigate } from "react-router-dom"
import CheckOutInfo from "./checkOutInfo"
import ItemInfo from "./itemInfo"
import Navbar from "../../component/Navbar"
import { useAuth } from "../../component/Context/authContext/authContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Cartcontext } from "../../component/Context/cartContext/cartContext"
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
            if(prev.deleveryMethod.length !== 0){
                console.log(deleveryFormValues.deleveryMethod)
                return  {...prev, deleveryMethod: []}
            }else{
                console.log(deleveryFormValues.deleveryMethod)

                return {...prev, deleveryMethod:[value]}
            }
        })
    }
    // this function handle confirm delevery method if is door delevery or pick up it will switch the value of editDeleveryMethod to false
    const handleClick = () => {
        setDeleveryFormValues((prev) =>{
            return {...prev, editDeleveryMethod: false}
        })
    }
    const handleEdit = () =>{
        setDeleveryFormValues((prev) =>{
            return {...prev, editDeleveryMethod: true, deleveryMethod:[]}
        })
    }
    // function to send data to back-end 
    const handleOrdered = () =>{
            const submitData = async () => {
                try {
                    const resp = await fetch(`http://localhost:7000/check-out/ordered/create`, {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(deleveryFormValues)
                    })
                    const data = await resp.json();
                    if(!resp.ok){
                        console.log(`Failed, Error: ${data.message}`)
                        throw new Error(`Failed, Status: ${data.message}`);
                    }
                    console.log("Ordered successfully !!!", data)
                    localStorage.clear()
                    navigate("/shop/cart")
                } catch (error) {
                    console.log(`CheckOut Error: ${error}`)
                    throw new Error(`CheckOut Error: ${error.message}`);
                }
            }
            submitData()
    }
    // my condition
    if (user.role !== "customer") {
        return <Navigate to="/login-me" replace />
    }
    if(!cart || cart.length === 0){
        return <Navigate to="/shop/cart" replace />
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-wrap sm:flex-nowrap gap-5 p-5">
                {/* this component contains the customer detail and delevery details form  */}
                <div className="w-full ">
                    <CheckOutInfo ProductNumbers={ProductNumbers} EditDeleveryValue={deleveryFormValues.editDeleveryMethod} Delevery_value_Change={handleChange} submitClicked = {handleClick} Edit={handleEdit}  deleveryMethod={deleveryFormValues.deleveryMethod} total={deleveryFormValues.total} cart={cart}/>
                </div>
                {/* this is the Orders Summary */}
                <div className="w-full sm:w-[350px] bg-white max-h-[250px] rounded-lg ">
                    <ItemInfo isEditing={deleveryFormValues.editDeleveryMethod} handleOrdered={handleOrdered} cart={cart} sub_Total={sub_Total} total={deleveryFormValues.total} deleveryFees={deleveryFees}/>
                </div>
            </div>
        </>
    )
}
export default CheckOut