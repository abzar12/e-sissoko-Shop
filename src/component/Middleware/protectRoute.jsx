import { useAuth } from "../Context/authContext/authContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Loading from "../loading/Loading";
function ProtectUserRoute({ Customer }) {
    const { accessToken, isloading, user } = useAuth();
    if (isloading) {
        return (
            <> 
                <div className="">
                    <Loading />
                </div>
            </>
        )
    }
    if (accessToken && user.role !== "customer") {
        return <Outlet />
    }
    if (!accessToken && !Customer) {
        return <Navigate to="/e-sissoko/log-in/" replace />
    }
    // if(user.role !== "customer"){
        return <Navigate to="/login-me/" replace />
    // }
}

export default ProtectUserRoute