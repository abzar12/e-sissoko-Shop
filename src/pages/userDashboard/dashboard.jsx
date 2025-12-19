import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../component/Context/authContext/authContext";
import Navbar from "../../component/dashboard/navbar";
function Dashboard() {
    const { user } = useContext(AuthContext)
    return (
        <>
            <header className="absolute left-14 w-full">
                <Navbar />
            </header>
            <body>
                <main>
                    <aside>a
                        <div className="bg-red-200 min-w-14 relative top-0 max-w-12 h-[100vh]">

                        </div>
                    </aside>
                </main>
                <footer>

                </footer>
            </body>
        </>
    )
}
export default Dashboard;