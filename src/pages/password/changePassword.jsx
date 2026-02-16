import { useState } from "react"
import MyAlert from "../../component/PopUp/myAlert"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../../component/Context/authContext/authContext"
export function NewPassword() {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");
    console.log("EMAIL:", email, otp)
    const [status, setStatus] = useState(false)
    const [show, setShow] = useState(false)
    const [children, setChildren] = useState(null)

    const handleEmail = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const sendingForm = Object.fromEntries(formdata.entries())
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/new-password/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sendingForm)
            })
            const data = await resp.json()
            console.log("My data:", data)
            if (!resp.ok || !data.success) {
                setShow(true)
                setChildren(data.message)
                throw new Error(`Request Failed Status:${resp.status}`);
            }
            setShow(true)
            setStatus(true)
            setChildren(data.message)
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
    }
    const handleClose = () => {
        setShow(false)
        logout()
        if (status) return navigate('/')
    }
    if (!otp && !email) return null
    return (
        <>
            <MyAlert onClose={handleClose} show={show} status={status} children={children} />
            <div className="w-full">
                <div className="sm:mx-auto mx-3 mt-[35vh]  bg-[var(--bg-color-primary)] min-w-[100px] max-w-[400px] shadow-[1px_1px_15px_var(--card-shadow)] p-3 text-center rounded-md text-[var(--text-color-secondary)]">
                    <h1>New Password</h1>
                    <p className="opacity-50 mt-3" >please type a new password </p>
                    <form action="" onSubmit={handleEmail} className="px-5">
                        <div className="w-full border px-3 py-1 sm:py-2 rounded-md my-3">
                            <input type="password" placeholder="New password"
                                className=" outline-none focus:outline-none bg-transparent w-full " name="password1" required />
                        </div>
                        <div className="w-full border px-3 py-1 sm:py-2 rounded-md my-3">
                            <input type="password" placeholder="Confirm password"
                                className=" outline-none focus:outline-none bg-transparent w-full " name="password2" required />
                        </div>
                        <div className=" hover:text-[var(--text-color)] border-2 border-[var(--bg-color)] py-1 rounded-full mt-5 hover:bg-[var(--bg-color)] transition-all duration-300 ease-in">
                            <button type="submit" className="w-full">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}