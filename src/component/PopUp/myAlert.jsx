import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import ReactDOM from "react-dom";
function MyAlert({ show, children, status, onClose }) {
    if (!show) return null
    return ReactDOM.createPortal(
        <>
            <div className="ac-popup-container bg-[rgb(0,0,0,0.5)] h-[100vh] w-[100%] inset-0 z-50 fixed text-center" >
                <div className=" text-center relative mx-auto mt-40 bg-white min-w-[200px] px-3 py-3 max-w-[350px] h-[200px] rounded-lg border">
                    <div className="icon ">
                        <div className="error">
                            {
                                status ? (
                                    <FaCheckCircle className="text-5xl text-green-600 bg-white mx-auto" />
                                )
                                    :
                                    (
                                    <IoCloseCircle className="text-4xl text-red-600 bg-white mx-auto" />
                                    )
                            }
                            <p className={`text-center font-[poppin] ${status ? 'text-green-600' : 'text-red-600'} text-2xl`}> {status ? "Success" : "Error"}</p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-black">{children}</p>
                        <div className="absolute bottom-3.5 w-full left-0 text-center">
                            <button type="button" onClick={onClose} className="w-[120px] border py-2 mx-auto bg-[var(--bg-color)] hover:bg-[var(--bg-color-primary)] transition-all duration-300 ease-in rounded-lg hover:text-white ">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    )

}
export default MyAlert;