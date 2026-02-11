import { useEffect, useState } from "react"
import { useAuth } from "../../component/Context/authContext/authContext"

function ProfileInfo({data}) {
    const { user } = useAuth()
    const [is_editing, SetIs_editing] = useState(false)
    const [err, setErr] = useState(null)
    const [message, setMessage] = useState(null)
    const handleForm = (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target)
        const convertFormdata = Object.fromEntries(formdata.entries())
        const submitData = async () => {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/profile/customer/edite-profile/${user.email}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(convertFormdata)
                })
                const data = await resp.json()
                if (!data.success) {
                    setErr(data.message)
                } else {
                    setMessage(data.message)
                    console.log(data.message)
                }
                if (!resp.ok) {
                    throw new Error("User Profile failed");
                }
                window.location.reload()
            } catch (error) {
                console.log(`User Profile Updating Failed: ${error.message}`)
            }
        }
        submitData()
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="shadow-[0px_0px_5px_rgb(255,255,255)] rounded-md p-3 my-3">
                    <div className="border-b-2 mb-5 py-1 border-white/30 flex justify-between">
                        <h1>Account Details</h1>
                    </div>
                    <div className="">
                        <p>Full Name: <span className="text-gray-400 text-md ">{data.FirstName} {data.LastName}</span></p>
                        <p>Email: <span className="text-gray-400 text-md ">{data.Email}</span></p>
                    </div>
                </div>

                <div className="shadow-[0px_0px_5px_rgb(255,255,255)] rounded-md p-3 my-3">

                    <div className="border-b-2 mb-5 py-1 border-white/30 flex justify-between">
                        <h1>Shipping Details</h1>
                        {!is_editing && <button type="button" onClick={() => SetIs_editing(true)} className="hover:opacity-20 transition-all duration-300 ">Edite</button>}
                        {is_editing && <button type="button" onClick={() => SetIs_editing(false)} className="hover:opacity-20 text-red-500 transition-all duration-300 ">Cancelled</button>}
                    </div>
                    {!is_editing ?
                        <div className="">
                            <p>Full Name: <span className="text-gray-400 text-md ">{data.FirstName} {data.LastName}</span></p>
                            <p>Location: <span className="text-gray-400 text-md ">{data.City}, {data.Area}</span></p>
                            <p>Phone Number: <span className="text-gray-400 text-md ">{data.Phone}</span></p>
                        </div>
                        :
                        //  form validation 
                        <form action="" onSubmit={handleForm}>
                            <div className="flex gap-2 flex-wrap mb-2">
                                <label htmlFor="firstname" className="text-[1rem]">First Name: </label>
                                <input id="firstname" name="firstname" type="text" defaultValue={data.FirstName} placeholder="First Name" className="bg-transparent text-[0.9rem] border-b-2 outline-none focus:outline-none text-white/70 px-3" />
                            </div>
                            <div className="flex gap-2 flex-wrap mb-2">
                                <label htmlFor="lastname" className="text-[1rem]">Last Name: </label>
                                <input id="lastname" name="lastname" type="text" defaultValue={data.LastName} placeholder="Last Name" className="bg-transparent text-[0.9rem] border-b-2 outline-none focus:outline-none text-white/70 px-3" />
                            </div>
                            <div className="flex gap-2 flex-wrap mb-2">
                                <label htmlFor="number" className="text-[1rem]">Phone Number: </label>
                                <input id="number" name='number' type="text" defaultValue={data.Phone} placeholder="+233 xxxxxxxx" className="bg-transparent text-[0.9rem] border-b-2 outline-none focus:outline-none text-white/70 px-3 " />
                            </div>
                            <div className="flex gap-2 flex-wrap mb-2">
                                <label htmlFor="city" className="text-[1rem]">Region: </label>
                                <input id="city" name="region" type="text" defaultValue={data.City} placeholder="e.g..region" className="bg-transparent text-[0.9rem] border-b-2 outline-none focus:outline-none text-white/70 px-3 " />
                            </div>
                            <div className="flex gap-2 flex-wrap mb-2">
                                <label htmlFor="area" className="text-[1rem]">city: </label>
                                <input id="area" type="text" name="city" defaultValue={data.Area} placeholder="e.g..city" className="bg-transparent text-[0.9rem] border-b-2 outline-none focus:outline-none text-white/70 px-3 " />
                            </div>
                            <div className="w-full  text-center mt-5">
                                <button type="submit" className="bg-[var(--bg-color)] px-10 py-2 rounded-lg hover:bg-transparent border border-[var(--bg-color)] transition duration-400 ">Save</button>
                            </div>
                        </form>
                    }

                </div>
            </div>
        </>
    )
}
export default ProfileInfo