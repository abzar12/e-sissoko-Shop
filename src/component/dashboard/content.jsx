import style from "../../component/style/dashboard/dasContent.module.css"
import Navbar from "./navbar"
import Footer from "./footer"
function Content({onButtonClick}) {
    return (
        <>
            <div className={style.container}>
                <Navbar onButtonClick={onButtonClick}/>
                <div className={style.main}>
                    
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Content