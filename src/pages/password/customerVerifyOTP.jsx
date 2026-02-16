import { useState } from "react"
import MyAlert from "../../component/PopUp/myAlert"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
export function VerifyOTP() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    console.log("ENAIL:", email)
    const [OTP, setOTP] = useState(null)
    const [status, setStatus] = useState(false)
    const [show, setShow] = useState(false)
    const [children, setChildren] = useState(null)
    const [attempt, Setattempt] = useState(undefined)

    const handleEmail = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const otp = formdata.get('otp')
        setOTP(otp)
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/verifyOTP/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp })
            })
            const data = await resp.json()
            console.log("My data:", data)
            if (!resp.ok || !data.success) {
                Setattempt(data.attempt)
                console.log("try",data.attempt)

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
        if (status && OTP) navigate(`/customer/new-password?email=${email}&&otp= ${OTP}`);
    }
    if (!email) return null
    return (
        <>
            <MyAlert onClose={handleClose} show={show} status={status} children={children} />
            <div className="w-full">
                <div className="sm:mx-auto mx-3 mt-[35vh]  bg-[var(--bg-color-primary)] min-w-[100px] max-w-[400px] shadow-[1px_1px_15px_var(--card-shadow)] p-3 text-center rounded-md text-[var(--text-color-secondary)">
                    <h1>OTP</h1>
                    <p className="opacity-50 mt-3" >please type otp sent to your Email</p>
                    {attempt !== undefined && (
                        <p className="opacity-50 mt-3">
                            you've {attempt} tries
                        </p>
                    )}
                    <form action="" onSubmit={handleEmail} className="px-5">
                        <div className="w-full border px-3 py-1 sm:py-2 rounded-md my-3">
                            <input type="text" placeholder="e.g..OTP"
                                className=" outline-none focus:outline-none bg-transparent w-full " name="otp" required />
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