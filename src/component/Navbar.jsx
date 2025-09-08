import { FaSearch } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
export default function Navbar() {
   
    return (
        <>
            <div className="ac-navbar bg-[#2B2B2B] text-white max-w-[95%] rounded-xl mx-auto">
                <div className="ac-logo content-center">
                    <label htmlFor="">LOGO</label>
                </div>
                <div className="ac_search">
                    <input type="text" placeholder="Search..." id="search-items" className="  bg-transparent" />
                    <div className="search-icon">
                        <FaSearch />
                    </div>
                </div>
                <div className="side_btn">
                    <div className="btn-icon"><button type="button bg-transparent "><FaRegHeart className="text-[20px]"/></button></div>
                    <div className="btn-icon"><button type="button bg-transparent"><FaUser className="text-[20px]"/></button></div>
                    <div className="btn-icon"><button type="button bg-transparent"><FaShoppingCart className="text-[20px]"/></button></div>
                </div>
            </div>
        </>
    )
}