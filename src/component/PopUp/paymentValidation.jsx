import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Cartcontext } from "../Context/cartContext/cartContext";
function PaymentPopup({isShow, Reference, Amount}) {
    const {clearCart} = useContext(Cartcontext)
    console.log("payment Validation: ", isShow + Reference + Amount)
    const {isshow, reference, amount} = useLocation().state || {}
    const navigate = useNavigate();
    const _show = isShow || isshow
    const _reference = Reference || reference
    const _amount = Amount || amount
    const [show, setShow] = useState(_show)
    const handleClose = () =>{
        setShow(!show)
    }
    if (!show) return null;
    useEffect(() => {
        clearCart()
    }, [])
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="p-8 text-center">
                    <div className="mx-auto w-28 h-28 rounded-full bg-green-50 flex items-center justify-center transform transition-all duration-500 animate-pulse">
                        <FaCheckCircle className="text-green-600 w-16 h-16" />
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">Order Confirmed!</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Thank you — your order has been placed successfully.
                    </p>

                    { _reference && (
                        <p className="mt-3 text-sm text-gray-600">
                            Order ID: <span className="font-medium text-gray-800">{ _reference}</span>
                        </p>
                    )}

                    {_amount && (
                        <p className="mt-1 text-sm text-gray-600">
                            Total: <span className="font-semibold text-gray-800">GHS {_amount}</span>
                        </p>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center px-6 pb-4">
                        <button
                            onClick={() => {
                                onClose?.();
                                if ( _reference) navigate(`/shop/cart`);
                                else navigate("/shop/cart");
                            }}
                            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[var(--bg-color-primary)] text-white font-medium hover:opacity-90 transition"
                        >
                            View Order
                        </button>

                        <button
                            onClick={() => {
                                navigate("/shop/cart");
                            }}
                            className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* Decorative confetti strip */}
                <div className="h-3 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500" />
            </div>
        </div>,
        document.body
    );
}

export default PaymentPopup;