import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Context/authContext/authContext";
import Loading from "../loading/Loading";
function ProtectUserRoute(){
    const {isloading, isAuth } = useContext(AuthContext) ;
    if(isloading){
        return (
            <>
            <div className="">
                <Loading />
            </div>
            </>
        )
    }

       return isAuth ? <Outlet /> : <Navigate to="/e-sissoko/log-in/" replace />  
}
export default ProtectUserRoute