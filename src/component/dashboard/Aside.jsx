import React from "react";
import { Link } from "react-router-dom";
import style from "../../component/style/dashboard/dasAside.module.css"
import {SideBarIconText} from "../../../sideBarDarshboard.js"
// importing icon
import { FaCarTunnel } from "react-icons/fa6";

function Aside({ isopen }) {
    return (
        <>
            <div className={`${style.shortAside} ${isopen ? style.activeBtn : null}`}>
                <div className={style.container}>
                    <div className={style.logo}>
                        <FaCarTunnel  className={style.icon}/>
                      {isopen &&  <label className={style.textIcon} >E-sissoko</label>}
                    </div>
                    <div className={style.sidebtn}>
                        {
                            SideBarIconText.map((item, index) => (
                                <div key={index} className={`${style.iconBox} `}>
                                    <item.icon  className={style.icon}/>
                                    {isopen &&  <label className={style.textIcon} >{item.text}</label>}
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