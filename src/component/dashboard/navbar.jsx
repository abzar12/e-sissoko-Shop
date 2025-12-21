import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../component/style/dashboard/dasNavbar.module.css"
import { BiMenu, BiSearch, BiBell } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
function Navbar({ onButtonClick }) {
    return (
        <>
            <div className={style.ac_container}>
                <div className={style.shortNavbar}>
                    <div className={style.content}>
                        <div className={style.ac_btn_Box}>
                            <BiMenu className={style.ac_iconMenu} onClick={onButtonClick}/>
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar