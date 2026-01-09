import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cartcontext } from "../../component/Context/cartContext/cartContext";
import PaymentPopup from "../../component/PopUp/paymentValidation";

function PaymentVerify() {
    const [searchParams] = useSearchParams()
    const reference = searchParams.get("reference")
    const [data, setdata] = useState({
        isShow: true,
        Reference: "",
        amount: ""
    })
    const { clearCart } = useContext(Cartcontext)
    if (!reference) {
        return
    }
    useEffect(() => {
        console.log("Payment reference: ", reference)
        const VerifyPayStack = async () => {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/payment/verify/${reference}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                const data = await resp.json()
                if (!resp.ok) {
                    console.log(`Client Verification Failed: ${data.Error}`)
                    throw new Error(`Client Verification Failed: ${data.Error}`);
                }
                console.log("Verification Successfully", data)
                clearCart()
                setdata((prev)=>{
                    return {...prev, Reference: data.Response.reference, amount: data.Response.amount}
                })
            } catch (error) {
                console.log(`Payment Verification Failed: ${error.message}`)
                throw new Error(`Payment Verification Failed: ${error.message}`);
            }
        }
        VerifyPayStack()

    }, [reference])
    return (
        <PaymentPopup
            isShow={data.isShow}
            Reference={data.Reference}
            amount={data.amount /100}
        />)
}
export default PaymentVerify
