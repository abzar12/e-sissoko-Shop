import CheckOutInfo from "./checkOutInfo"
import Navbar from "../../component/Navbar"
function CheckOut() {
    return (
        <>
            <Navbar />
            <div className="flex gap-5 p-5">
                {/* this component contains the customer detail and delevery details form  */}
                <div className="w-full ">
                    <CheckOutInfo /> 
                </div>
                {/* this is the Orders Summary */}
                <div className="w-[350px] bg-white h-80 rounded-lg ">
                </div>
            </div>
        </>
    )
}
export default CheckOut