import React from "react";
import { Link } from "react-router-dom";
import { FaBurger } from "react-icons/fa6";
function Navbar(){
    return (
        <>
        <div className="ac-container">
            <div className="ac-navbar">
                <ul>
                <button type="button"><FaBurger /></button>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
            <div className="">
                
            </div>
        </div>
        </>
    )
}
export default Navbar