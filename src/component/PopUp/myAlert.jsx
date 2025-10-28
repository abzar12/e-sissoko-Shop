import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
function MyAlert({ children, success }) {
    const [isopen, setIsopen] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsopen(false);
        }, 15000)
    })
    return (
        <>
            {
                isopen && (
                    <div className="ac-popup-container bg-[rgb(0,0,0,0.5)] h-[100vh]">
                        <div className="fixed top-[20%] text-center left-[50%] translate-x-[-50%] bg-white min-w-[200px] px-3 max-w-[350px] h-[200px] rounded-lg border">
                            <div className="icon ">
                                <div className="error">
                                < IoCloseCircle className="text-5xl mt-2 text-red-600 bg-white mx-auto"  />
                                <p className="text-center font-[poppin] text-red-600 text-2xl">Error</p>
                                </div>
                                {/* <div className="">
                                    <FaCheckCircle className="text-4xl mt-3 text-green-600 bg-white mx-auto" />
                                    <p className="text-center font-[poppin] text-green-600 text-2xl">success</p>
                                </div> */}
                                {/* {success ? `< ${BiSolidUserCircle} />` : `<${BiErrorCircle}/>`} */}
                            </div>
                            <div className=" mt-1">
                                <p>{/* {children} */} please you can access of this message thank you</p>
                                <div className="">
                                    <button type="button" onClick={() => setIsopen(false)} className="w-[120px] mt-2 border py-2 mx-auto bg-[var(--bg-color)] hover:bg-[var(--bg-color-primary)] transition-all duration-300 ease-in rounded-lg hover:text-white ">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default MyAlert;