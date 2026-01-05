import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import style from "./style/Navbar.module.css"
import { useContext, useState } from "react";
import { Cartcontext } from "./Context/cartContext/cartContext";
import { useAuth } from "./Context/authContext/authContext";
export default function Navbar() {
    const navigate = useNavigate()
    const [showLogin, setShowLogin] = useState(false)
    const buttonRef = useRef(null)
    const { cart } = useContext(Cartcontext)
    const { user } = useAuth()
    const cartCount = cart.length || [];
    useEffect(() => {
        const handleExpandout = (e) => {
            if (
                buttonRef.current && !buttonRef.current.contains(e.target)
            ) {
                setShowLogin(false)
            }
        }
        document.addEventListener("mousedown", handleExpandout);
        return () => {
            document.removeEventListener("click", handleExpandout)
        }
    }, [])
    const handleExpandIn = () => {
        setShowLogin(prev => !prev)
    }

    return (
        <>
            <div className={style.ac_navbar} >
                <div className={style.ac_logo}>
                    <label >LOGO</label>
                </div>
                <div className={style.ac_search}>
                    <input type="text" placeholder="Search..." id="search-items" className={`outlinenone  bg-transparent`} />
                    <div className={style.search_icon}>
                        <FaSearch />
                    </div>
                </div>
                <div className={style.btnBox} >
                    <div className={style.btn_icon} onClick={handleExpandIn} >
                        {
                            user && user.length !== 0 ? (
                                <button type=" button hover:text-white/50 bg-transparent " ref={buttonRef}>
                                    <div className={style.iconBox} >
                                        <FaUser className={`${style.icon} mt-0.5`} />
                                        <span>{user.firstname}</span>
                                        {
                                            (showLogin) ?
                                                <MdKeyboardArrowUp className={`${style.icon} ${style.except}`} />
                                                :
                                                <MdKeyboardArrowDown className={`${style.icon} ${style.except}`} />
                                        }
                                    </div>
                                </button>
                            )
                                :
                                (
                                    <button type=" button hover:text-white/50 bg-transparent" onClick={() =>  navigate("/login-me")} ref={buttonRef}>
                                        <div className={style.iconBox} >
                                            <FaUser className={`${style.icon} mt-0.5`} />
                                            <span>Login</span>
                                        </div>
                                    </button>
                                )
                        }

                        <div className={`${style.loginContent} ${showLogin && user ? style.expand : null}`}>
                            <ul className={style.list}>
                                <li className={style.text}>
                                    <Link>My Account</Link>
                                </li>
                                <li className={style.text}>
                                    <Link>Orders</Link>
                                </li>
                                <li className={style.text}>
                                    <Link>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.btn_icon}>
                        <button type="button bg-transparent ">
                            <FaRegHeart className="text-[20px]" />
                        </button>
                    </div>
                    <div className="">
                        <div className={style.btn_icon}><Link to="/shop/cart"><FaShoppingCart className="text-[20px]" />
                            <label htmlFor="" className=" absolute top-[-10px] text-black bg-white rounded-full px-1.5 right-[-10px] text-sm"> {cartCount} </label>
                            <span className={style.span}>Cart</span>
                        </Link></div>
                    </div>
                </div>

            </div >
        </>
    )
}