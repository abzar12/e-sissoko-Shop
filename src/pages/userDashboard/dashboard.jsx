import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../component/Context/authContext/authContext";
import Aside from "../../component/dashboard/Aside";
import style from "../../component/style/dashboard/dashboard.module.css"
import Content from "../../component/dashboard/content";
import useDashboardFetch from "../../component/Context/DashboardContext/dashboardFetch";
function Dashboard() {
    const { user } = useAuth()
    const [isopen, setIsopen] = useState(true)
    const handleClick = () =>{
        setIsopen(!isopen)
    }
    if(!user.role || user.role === "customer"){
        console.log("User role::", user.role)
        return <Navigate to="/" replace />
    }
    return (
        <>
            <div className={style.container}>
                <aside>
                    <Aside isopen={isopen} />
                </aside>
                <main className={`${style.content} ${isopen ? style.activeBtn + " transition-all duration-300 ease-in" : null} `}>
                    <Content onButtonClick={handleClick} />
                </main>
            </div>
        </>
    )
}
export default Dashboard;