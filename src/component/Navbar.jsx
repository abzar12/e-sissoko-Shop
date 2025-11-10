import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style/Navbar.css"
import { useCallback } from "react";
export default function Navbar() {
    const Navigate = useNavigate()
    const preload = localStorage.getItem('ordP');
    const cartCount = preload ? JSON.parse(preload) : [] 
    return (
        <>
            <div className="ac-navbar ">
                <div className="ac-logo ">
                    <label htmlFor="">LOGO</label>
                </div>
                <div className="ac_search">
                    <input type="text" placeholder="Search..." id="search-items" className="outline-none  bg-transparent" />
                    <div className="search-icon">
                        <FaSearch />
                    </div>
                </div>
                <div className="side_btn flex gap-5">
                    <div className="btn-icon"><button type="button bg-transparent "><FaRegHeart className="text-[20px]" /></button></div>
                    <div className="btn-icon relative group ">
                        <button type=" button hover:text-white/50 bg-transparent " onClick={()=> Navigate('/e-sissoko/log-in')}><FaUser className="text-[20px] " /></button>
                        <span className="absolute top-full opacity-0 cursor-default group-hover:opacity-100 transition px-2 py-1 left-[-20px] text-sm rounded-lg bg-gray-300 text-black w-[59px]">Log-In</span>
                    </div>
                    <div className="group relative">
                        <div className="btn-icon"><button type="button bg-transparent" onClick={() =>{ Navigate('/shop/cart')}}><FaShoppingCart className="text-[20px]" />
                        <label htmlFor="" className=" absolute top-[-10px] text-black bg-white rounded-full px-1.5 right-[-10px] text-sm"> {cartCount.length} </label>
                        <span className="absolute top-full opacity-0 cursor-default group-hover:opacity-100 transition px-2 py-1 left-[-10px] text-sm rounded-lg bg-gray-300 text-black ">Cart</span>
                        </button></div>
                    </div>
                </div>

            </div>
        </>
    )
}