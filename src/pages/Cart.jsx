import React, { useContext, useEffect, useMemo, useState } from "react"
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Button from "../component/Button/button";
import { FaCartArrowDown } from "react-icons/fa6";
import { Cartcontext } from "../component/Context/cartContext/cartContext";
import toast, { Toaster } from 'react-hot-toast';

function Cart() {
    const { RemoveFromCart, IncreaseQuantity, DecreaseQuantity, cart } = useContext(Cartcontext)
    const [cartItem, setCartItem] = useState(cart)
    const sub_total = useMemo(() => {
        const sum_subtotal = cartItem.reduce((acc , item) => {
           return acc + item.sub_total
        }, 0)
        return sum_subtotal ? Number(sum_subtotal) : 0 
    }, [cart, cartItem])
    console.log("Cart Items: ", cartItem)
    useEffect(() => {
        setCartItem(cart)
    }, [cart])
    useEffect(() => {
        localStorage.setItem('ordP', JSON.stringify(cartItem));
    }, [cart])
    const images = cartItem.map(item => JSON.parse(item.image))
    const instock = cartItem.map(item => JSON.parse(item.instock))
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
        }, 700);
    }
    return (
        <>
            <div>
                <Toaster position="top-right" reverseOrder={false} className="min-h-14" />
            </div>
            <Navbar />
            <section className="cart-section px-5 py-3">
                {
                    cartItem.length !== 0
                        ?
                        (
                            cartItem.map(item => (
                                <div className="w-full bg-[var(--bg-primary)] rounded-lg py-3 mb-3 px-3 flex items-center justify-between" key={item.id}>
                                    <div className="img flex h-[80px] gap-3 items-center ">
                                        {
                                            images.map((item, index) => (
                                                <img key={index} src={`http://localhost:7000/public/upload/Product_img/${item[0]}`} alt={item.name} className="h-full w-fit" />
                                            ))
                                        }
                                        <div className="">
                                            <h1 className="text-[1.1rem] font-semibold line-clamp-1">{item.name}</h1>
                                            <p className="text-[0.9rem]"><span className="font-semibold text-[1.1rem]"> Price: </span>{item.price} GHS</p>
                                            <p className="text-[0.9rem]"> <span className="font-semibold text-[1.1rem]">SubTotal: </span>{item.sub_total}</p>
                                        </div>
                                    </div>
                                    <div className="cart-content">
                                        <Button children='+' onClick={() => instock > item.quantity ? IncreaseQuantity(item.id) : Not_Enough_Quantity()} className="px-2 mr-2 bg-[var(--bg-color)] hover:bg-[var(--bg-color-primary)] font-semibold text-white rounded-md content-center text-xl" />
                                        <span className="text-[rgb()]">{item.quantity} </span>
                                        <Button children='-' onClick={() => DecreaseQuantity(item.id)} className="px-2 ml-2 bg-[var(--bg-color)] hover:bg-[var(--bg-color-primary)] font-semibold text-white rounded-md content-center text-xl" />
                                    </div>
                                    <div className="btn">
                                        <Button children='remove' onClick={() => RemoveFromCart(item.id)} className="px-2 bg-[rgb(239,68,68)] hover:bg-[rgb(127,29,29)] text-white rounded-md content-center text-xl" />
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
                    <p className="text-white text-[1.1rem] font-thin">Subtotal: <span className="text-[1.3rem] font-bold"> {sub_total} </span>GHS </p>
                    <Button children="Check Out" className=" py-2 px-5 rounded-full bg-[var(--bg-color)] font-semibold hover:text-white" />
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Cart;