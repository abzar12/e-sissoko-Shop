import React, { useContext, useEffect, useMemo, useState } from "react"
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Button from "../component/Button/button";
import { FaCartArrowDown } from "react-icons/fa6";
import { Cartcontext } from "../component/Context/cartContext/cartContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import style from "./../component/style/cart.module.css"

function Cart() {
    const navigate = useNavigate()
    const { RemoveFromCart, IncreaseQuantity, DecreaseQuantity, cart, sub_Total } = useContext(Cartcontext)
    console.log("Cart rendered ")
    const [cartItem, setCartItem] = useState(cart)
    console.log("Cart Items: ", cartItem)
    useEffect(() => {
        setCartItem(cart)
    }, [cart])
    useEffect(() => {
        localStorage.setItem('ordP', JSON.stringify(cartItem));
    }, [cart])
    // const images = cartItem.map(item => JSON.parse(item))
    // console.log("images abwar: ",images)
    const Not_Enough_Quantity = () => {
        setTimeout(() => {
            toast.error(("Not enough quantity available \n "), {
                style: {
                    padding: '20px',
                    color: 'orange',
                },
                iconTheme: {
                    primary: "orange",
                }
            })
        }, 500);
    }
    const CheckOut = () => {
        console.log("click !!!!")
        return navigate("/orders/checkout")
    }
    return (
        <>
            <div>
                <Toaster position="top-right" reverseOrder={false} className="min-h-14" />
            </div>
            <Navbar />
            <section className={style.cart_section}>
                {
                    cartItem.length !== 0
                        ?
                        (
                            cartItem.map(item => (
                                <div className={style.cartBox} key={item.id}>
                                    <div className={style.cartContent}>
                                        <div className={style.imageBox}>
                                            <img src={`${ item.image[0]?.url ? item.image[0].url : import.meta.env.VITE_API_URL+ "/public/upload/Product_img/"+item.image[0]}`} className={style.im} />
                                        </div>
                                        <div className={style.contenText}>
                                            <h1 className="text-[1.1rem] font-semibold line-clamp-1">{item.name}</h1>
                                            <p className="text-[0.9rem]"><span className="font-semibold text-[1.1rem]"> Price: </span>{item.price} GHS</p>
                                            <p className="text-[0.9rem]"> <span className="font-semibold text-[1.1rem]">SubTotal: </span>{item.sub_total}</p>
                                        </div>
                                    </div>
                                    <div className={style.cartButton}>
                                        <div className="flex-shrink-0">
                                            <Button children='+' onClick={() => item.instock > item.quantity ? IncreaseQuantity(item.id) : Not_Enough_Quantity()} className="px-2 mr-2 bg-[var(--bg-color)] hover:bg-[var(--bg-color-primary)] font-semibold text-white rounded-md content-center text-xl" />
                                            <span className="text-[rgb()]">{item.quantity} </span>
                                            <Button children='-' onClick={() => DecreaseQuantity(item.id)} className="px-2 ml-2 bg-[var(--bg-color)] hover:bg-[var(--bg-color-primary)] font-semibold text-white rounded-md content-center text-xl" />
                                        </div>
                                        <div className="btn">
                                            <Button children='Remove' onClick={() => RemoveFromCart(item.id)} className="px-2 bg-[rgb(239,68,68)] hover:bg-[rgb(127,29,29)] text-white rounded-md content-center text-xl" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                        :
                        (
                            <div className=" px-5 py-3 text-center">
                                <div className="mb-3 text-center w-[150px] m-auto bg-[var(--bg-color-primary)] rounded-full p-7 ">
                                    <FaCartArrowDown className="block mx-auto w-full h-full text-[var(--bg-primary)]" />
                                </div>
                                <h1 className="mb-5 font-semibold text-white">Cart is Empty</h1>
                                <div className="">
                                    <Button children='Start Shopping' onClick={() => navigate('/')} className=" bg-[var(--bg-color-secondary)] px-5 py-1 hover:bg-[var(--bg-color-primary)] text-white rounded-full content-center text-xl" />
                                </div>
                            </div>
                        )
                }
                <div className="max-w-[500px] m-auto p-5 bg-[var(--bg-color-primary)] rounded-lg flex items-center justify-around flex-wrap">
                    <p className="text-white text-[1.1rem] font-thin">Subtotal: <span className="text-[1.3rem] font-bold"> {sub_Total} </span>GHS </p>
                    <Button children="Check Out" disabled={cart.length === 0} onClick={CheckOut} className=" py-2 px-5 rounded-full bg-[var(--bg-color)] font-semibold hover:text-white" />
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Cart;