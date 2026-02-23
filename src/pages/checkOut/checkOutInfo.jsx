import { GiCash } from "react-icons/gi";
import { FaCcMastercard, FaCcVisa, } from "react-icons/fa"
import style from "../../component/style/checkOut/checkoutInfo.module.css"
import { useAuth } from "../../component/Context/authContext/authContext";
import { FaArrowAltCircleRight } from "react-icons/fa";
function CheckOutInfo({ ProductNumbers, handleOrdered, deleveryValues, Delevery_value_Change, Edit, submitClicked, deleveryMethod }) {
    const { user } = useAuth()
    console.log(user)
    return (
        <>
            <div className={style.CustomContainer}>
                <div className={style.customFields}>
                    <h1 className={style.title}>Customer Information</h1>
                    <div className={style.CustomInfo}>
                        <p className={style.field}>Name: <span className={style.span}>{user.firstname} {user.lastname}</span></p>
                        <p className={style.field}>Phone: <span className={style.span}>{user.phone}</span> | Email: <span className={style.span}>{user.email}</span></p>
                    </div>
                </div>
                <div className={style.deleveryFields}>
                    <div className={style.title}>
                        <h2 >Delivery Details</h2>
                        {!deleveryValues.editDeleveryMethod && <button type="button" onClick={Edit}>Edit</button>}
                    </div>
                    {
                        // edit Section once the click on the button to edit delevery information
                        deleveryValues.editDeleveryMethod ? (
                            <form action="" className={style.form}>
                                <div className={style.field}>
                                    <input className={style.input} value="Door Delevery" disabled={deleveryMethod.includes("Pick up")} onChange={Delevery_value_Change} type="checkbox" name="DeleveryMethod" id="" />
                                    <label className={style.label} htmlFor="">Door Delevery</label>
                                    <p className={style.info}>Delivery available <span>( 30 minutes in Accra )</span> </p>
                                </div>
                                <div className={style.field}>
                                    <input className={style.input} onChange={Delevery_value_Change} value="Pick up" disabled={deleveryMethod.includes("Door Delevery")} type="checkbox" name="DeleveryMethod" id="" />
                                    <label className={style.label} htmlFor="">Pick up</label>
                                    <p className={style.info}>Pick up the product at our shop.</p>
                                </div>
                                <div className={style.btnBox}>
                                    <button type="submit" onClick={submitClicked} className={style.btn}>Confirm Delivery Details</button>
                                </div>
                            </form>
                        ) :
                            (
                                // display of what user has choose 
                                <div className={style.ShowValue}>
                                    {deleveryMethod == "Door Delevery" ?
                                        <>
                                            <div className={style.field}>
                                                <label className={`${style.label} ${style.exception}`} htmlFor="">Door Delevery</label>
                                                <p className={style.info}>It will be delivered to the address below. </p>
                                            </div>
                                            <div className={style.address}>
                                                <p className={style.info}>Address: <span className={style.span}>{user.city}, {user.area}</span></p>
                                            </div>
                                        </>

                                        :
                                        <div className={style.field}>
                                            <label className={`${style.label} ${style.exception}`} htmlFor="">Pick up</label>
                                            <p className={style.info}>Pick up the product at our shop.</p>
                                        </div>
                                    }

                                </div>
                            )
                    }
                    {/* Delevering items  */}
                    <div className={style.ItemsContainer} >
                        <h2 className={style.title}>Delevery within 24 hours</h2>
                        <div className={`${style.items} `}>
                            {
                                deleveryValues.cart.map((item, index) => (
                                    <div className="" key={index}>
                                        <div className={style.item}>
                                            <p className={style.shipping}>Shipping {index + 1}/{ProductNumbers}</p>
                                            <div className={style.imageBox}>
                                                <div className={style.img}>
                                                    {(() => {
                                                        try {
                                                            const images = JSON.parse(item.image);
                                                            return images?.length > 0 ? (
                                                                <img src={`${import.meta.env.VITE_API_URL_IMG}/${images[0]}`} alt={images[0]} />
                                                            ) : null;
                                                        } catch {
                                                            return null;
                                                        }
                                                    })()}
                                                </div>
                                                <p className={style.name}>{item.name}</p>
                                            </div>
                                            <p className={style.quantity}>
                                                Quantity: <span className={style.span}>{item.quantity}</span>
                                            </p>
                                            <p className={style.price}>
                                                Price: <span className={style.span}>{item.price}</span>
                                            </p>
                                            <p className={style.sub_total}>
                                                Sub Total: <span className={style.span}>{deleveryValues.total}</span>
                                            </p>
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
                        <div className={`${style.payment_btnBox} `}>
                            <button type="button" className={` ${deleveryValues.editDeleveryMethod ? " cursor-not-allowed " : ""}`} disabled={deleveryValues.editDeleveryMethod} onClick={() => handleOrdered("paystack")}>PayNow ({deleveryValues.total})</button>
                            <span className={style.span}> <FaArrowAltCircleRight className={style.icon} /></span>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default CheckOutInfo;