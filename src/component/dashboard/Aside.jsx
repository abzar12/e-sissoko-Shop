import React from "react";
import { Link } from "react-router-dom";
import style from "../../component/style/dashboard/dasAside.module.css"
// importing icon
import { FaCarTunnel } from "react-icons/fa6";
import { MdDashboard, MdAddShoppingCart } from "react-icons/md"
import { FaProductHunt, FaPeopleLine } from "react-icons/fa6";
import { FaShippingFast, FaMoneyCheckAlt } from "react-icons/fa";



  const  SideBarIconText = [
    {icon: MdDashboard, text:"Dashboard", url: "/e-sissoko/dashboard"},
    {icon: FaProductHunt, text:"Products", url: "/e-dashboard/product"},
    {icon: MdAddShoppingCart, text:"Orders"},
    {icon: FaPeopleLine, text:"Customers"},
    {icon: FaMoneyCheckAlt, text:"Payment"},
    {icon: FaShippingFast, text:"Shipping"}
]

function Aside({ isopen }) {
    return (
        <>
            <div className={`${style.shortAside} ${isopen ? style.activeBtn : null}`}>
                <div className={style.container}>
                    <div className={style.logo}>
                        <FaCarTunnel className={style.icon} />
                        {isopen && <label className={style.textIcon} >E-sissoko</label>}
                    </div>
                    <div className={style.sidebtn}>
                        {
                            SideBarIconText.map((item, index) => (
                                <div key={index} >
                                    <Link to={item.url} className={`${style.iconBox} `}>
                                        <item.icon className={style.icon} />
                                        {isopen && <label className={style.textIcon} >{item.text}</label>}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
export default Aside