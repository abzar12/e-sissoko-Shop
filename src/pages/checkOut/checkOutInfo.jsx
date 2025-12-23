import { GiCash } from "react-icons/gi";
import { FaCcMastercard, FaCcVisa, } from "react-icons/fa"
import style from "../../component/style/checkOut/CheckoutInfo.module.css"
import { useContext, useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { Cartcontext } from "../../component/Context/cartContext/cartContext";
function CheckOutInfo() {
    const [deleveryMethod, setDeleveryMethod] = useState([])
    const [editDeleveryMethod, setEditDeleveryMethod] = useState(true)
    const { sub_Total, ProductNumbers, cart } = useContext(Cartcontext)
    const handleChange = (e) => {
        const { value } = e.target;
        setDeleveryMethod((prev) => {
            const existing = prev.find(item => item === value)
            if (existing) {
                return prev.filter(item => item !== value)
            }
            return [...prev, value]
        })
    }
    useEffect(() => {
        console.log("the current value is :", deleveryMethod)
    }, [deleveryMethod])
    const handleClick = (e) => {
        e.preventDefault();
        setEditDeleveryMethod(false)
    }
    return (
        <>
            <div className={style.CustomContainer}>
                <div className={style.customFields}>
                    <h1 className={style.title}>Customer Information</h1>
                    <div className={style.CustomInfo}>
                        <p className={style.field}>Name: <span className={style.span}>Abzar Camara</span></p>
                        <p className={style.field}>Phone: <span className={style.span}>+233 91716839</span> | Email: <span className={style.span}> customer1@gmail.com </span></p>
                    </div>
                </div>
                <div className={style.deleveryFields}>
                    <h2 className={style.title}>Delivery Details</h2>
                    {
                        // edit Section once the click on the button to edit delevery information
                        editDeleveryMethod ? (
                            <form action="" className={style.form}>
                                <div className={style.field}>
                                    <input className={style.input} value="Door Delevery" disabled={deleveryMethod.includes("Pick up")} onChange={handleChange} type="checkbox" name="DeleveryMethod" id="" />
                                    <label className={style.label} htmlFor="">Door Delevery</label>
                                    <p className={style.info}>Delivery available <span>( 30 minutes in Accra )</span> </p>
                                </div>
                                <div className={style.field}>
                                    <input className={style.input} onChange={handleChange} value="Pick up" disabled={deleveryMethod.includes("Door Delevery")} type="checkbox" name="DeleveryMethod" id="" />
                                    <label className={style.label} htmlFor="">Pick up</label>
                                    <p className={style.info}>Pick up the product at our shop.</p>
                                </div>
                                <div className={style.btnBox}>
                                    <button type="submit" onClick={handleClick} className={style.btn}>Confirm Delivery Details</button>
                                </div>
                            </form>
                        ) :
                            (
                                // display of what user has choose 
                                <div className={style.field}>
                                    {deleveryMethod == "Door Delevery" ?
                                        <div className={style.field}>
                                            <label className={`${style.label} ${style.exception}`} htmlFor="">Door Delevery</label>
                                            <p className={style.info}>It will be delivered to the address below. </p>
                                        </div>
                                        :
                                        <div className={style.field}>
                                            <label className={`${style.label} ${style.exception}`} htmlFor="">Pick up</label>
                                            <p className={style.info}>Pick up the product at our shop.</p>
                                        </div>
                                    }
                                </div>
                            )
                    }
                    <hr />
                    {/* Delevering items  */}
                    <div className={style.ItemsContainer} >
                            <h2>Delevery within 24 hours</h2>
                        <div className={`${style.items} grid grid-cols-1 sm:grid-cols-2 gap-5`}>
                            {
                                cart.map((item, index) => (
                                    <div className="">
                                        <div className="border border-black">
                                            <p>Shipping {index + 1}/{ProductNumbers}</p>
                                            {item.name}
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: {item.price}</p>
                                            <p>Sub Total: {item.sub_total}</p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className={style.payementFields}>
                        <h3 className={style.title}>Payement Method</h3>
                        <p>We accepte only the following payement method</p>
                        <div className={style.field}>
                            <button type="button " className={`group ${style.button}`}>
                                <FaCcVisa className={style.img} />
                                <p className={style.group1}>Visa</p>
                            </button>
                            <button type="button " className={`group ${style.button}`}>
                                <FaCcMastercard className={style.img} />
                                <p className={style.group2}>Master Card</p>
                            </button>
                            <button type="button group" className={`group ${style.button}`}>
                                <img src="/image/mtn_icon.png" alt="MTN Icon" className={`${style.img} p-1`} />
                                <p className={style.group}> MTN </p>
                            </button>
                        </div>
                        <p>Please click on the following button to do your payment</p>
                        <div className="PaymentBtn bg-blue-100">
                            <PaystackButton email="user@example.com"
                                amount={5000 * 100} // amount in kobo
                                publicKey="YOUR_PUBLIC_KEY"
                                text="Pay Now"
                                onSuccess={(ref) => console.log("Paid!", ref)}
                                onClose={() => console.log("Closed")} />
                            <span>({sub_Total})</span>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default CheckOutInfo