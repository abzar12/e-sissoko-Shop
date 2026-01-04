import style from "../../component/style/dashboard/dasContent.module.css"
import Navbar from "./navbar"
import { Outlet } from "react-router-dom"
import Footer from "./footer"
function Content({onButtonClick}) {
    return (
        <>
            <div className={style.container}>
                <Navbar onButtonClick={onButtonClick}/>
                <div className={style.main}>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Content