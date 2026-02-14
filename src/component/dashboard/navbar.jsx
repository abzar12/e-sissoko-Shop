import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../component/style/dashboard/dasNavbar.module.css"
import { BiMenu, BiSearch, BiBell } from "react-icons/bi";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

import { useAuth } from "../Context/authContext/authContext";
function Navbar({ onButtonClick }) {
    const { user } = useAuth()
    const [userInfo, SetUserInfo] = useState(false)
    return (
        <>
            <div className={style.ac_container}>
                <div className={style.shortNavbar}>
                    <div className={style.content}>
                        <div className={style.ac_btn_Box}>
                            <BiMenu className={style.icon} onClick={onButtonClick} />
                        </div>
                        <div>
                            <Link to="/" className={style.link}>Home</Link>
                        </div>
                    </div>
                    <div className={style.content}>
                        <form action="" className={style.searchBox}>
                            <input type="text" placeholder="Search..." />
                            <button type="submit"> <BiSearch className={style.ac_iconSearch} /> </button>
                        </form>
                        <div className={style.ac_btn_Box}>
                            <button type="button"> <BiBell className={style.ac_iconBell} /> <span className={style.notification}>0</span></button>
                        </div>
                        <div className={style.UserName} >
                            <FaRegUserCircle className={style.icon} onClick={() => SetUserInfo(prev => !prev)} />
                                    <div className={`${style.userInfoBox} ${userInfo ? style.active : null}`}>
                                        <div className={style.header}>
                                            <h1>{user?.username}</h1>
                                        </div>
                                        <div className={style.content}>
                                            <p className={style.text}> <span><FaUserCircle /></span> Profile</p>
                                            <p className={style.text}> <span><IoShieldCheckmarkOutline /></span> Settings</p>
                                            <p className={`${style.text} text-red-500`}><span><IoLogOutOutline /></span> Logout </p>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar