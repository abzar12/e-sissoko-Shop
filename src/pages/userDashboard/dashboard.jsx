import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../component/Context/authContext/authContext";
import Aside from "../../component/dashboard/Aside";
import style from "../../component/style/dashboard/dashboard.module.css"
import Content from "../../component/dashboard/content";
function Dashboard() {
    const { user } = useContext(AuthContext)
    const [isopen, setIsopen] = useState(true)
    const handleClick = () =>{
        setIsopen(!isopen)
    }
    console.log("Dashboard rendered ")
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