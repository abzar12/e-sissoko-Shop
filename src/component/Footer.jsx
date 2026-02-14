import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaCcVisa, FaCcMastercard } from "react-icons/fa"
import { MdMarkEmailRead } from "react-icons/md"
import { MdEmail, MdPhone, MdLocationOn, MdWatchLater } from "react-icons/md"
import { GiCash } from "react-icons/gi";
import MyAlert from "./PopUp/myAlert"
export default function Footer() {
    const { register, handleSubmit, reset, } = useForm();
    const [is_success, Setis_success] = useState("false");
    const [show, setshow] = useState(false)
    const [children, setchildren] = useState("")
    // function to handle submit of newsletter 
    const onSubmit = async (data) => {
        const formdata = new FormData();
        formdata.append('message', data.message)
        console.log(data.message)
        try {
            const resp = await fetch(`http://localhost:5330/api/newletters`, {
                method: "POST",
                body: { formdata }
            })
            if (!resp.ok) {
                throw new Error(`HTTP error Status: ${resp.status}`)
            }
            const data = await resp.json()
            console.log(data)
            setshow(true)
            setchildren(data.message);
            Setis_success(data.success);
            reset()
        } catch (error) {
            Setis_success(data.success);
            setshow(false)
            console.log('sending data failed', error)

        }
    }
    return (
        <>
            <div className="ac-footer bg-[var(--bg-color-primary)] min-h-[50vh] text-white p-5">
                <div className="footer-container">
                    <div className=" text-2xl font-[Roboto] flex justify-between px-5 flex-wrap">
                        <div className="Logo sm:max-w-[20%]">
                            <span> E <FaShoppingCart className="inline-block text-yellow-600 text-5xl" /> Sissoko  </span>
                            <p className="text-sm w-full">
                                Your trusted shop for phones, chargers, headphones and more.
                            </p>
                        </div>
                        <div className="contactForm min-h-[200px">
                            <div className="">
                                <h1 className="text-[1.3rem] text-yellow-600 uppercase ">New on E-Sissoko ?</h1>
                                <p className="text-[.8rem]">Join the E-Sissoko newsletter and never miss our latest deals</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-y-2 items-center justify-center">
                                <div className="relative">
                                    <MdMarkEmailRead className=" text-3xl absolute top-1 text-[var(--bg-color)] left-1" />
                                    <input type="email" name="message" {...register("message", { required: true })} className="outline-none py-1 rounded-lg text-black pl-10 pr-3 text-[1rem]" />
                                </div>
                                {
                                    show && (
                                        <MyAlert show={show} success={is_success} children={children} onClose={() => setshow(false)} />
                                    )
                                }
                                <button type="submit" className="bg-[var(--bg-color)] text-[1.1rem] rounded-lg ml-3 px-2 py-1 border hover:text-white font-medium text-[var(--bg-color-primary)] transition duration-300">Subscribe</button>
                            </form>
                        </div>
                        <div className="text-[1.1rem] ">
                            <h1 className="text-[1.3rem] text-yellow-600 uppercase">Contact Ways :</h1>
                            <div className="Email pl-3 ">
                                <a href="tel:+233534894940" className="flex gap-2 items-center ">
                                    < MdPhone className=" text-[1.5rem]" />
                                    <span className="hover:text-blue-600 transition-all duration-300">+233 534894940</span>
                                </a>
                            </div>
                            <div className="Email pl-3 flex gap-2 items-center ">
                                <a href="mailto:support@e-sissoko.com" className="flex gap-2 items-center ">< MdEmail className=" text-[1.5rem]" />
                                    <span className="hover:text-blue-600  transition-all duration-300 hover:underline cursor-pointer">support@e-sissoko.com</span>
                                </a>
                            </div>
                            <div className="Email pl-3 flex gap-2 items-center ">
                                < MdLocationOn className="text-red-500 text-[1.5rem]" />
                                <span>Accra, Ghana</span>
                            </div>
                            <div className="Email pl-3 flex gap-2 items-center ">
                                < MdWatchLater className=" text-[1.5rem]" />
                                <span>Mon-Sat, 9AM-7PM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-5 sm:grid-cols-3 px-5">
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-white mb-3">Useful Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/help/buy-system" className="text-white hover:text-gray-400 transition-all duration-300">How to buy on E-Sissoko</Link> </li>
                            <li><Link to="/help/cancel-ordered" className="text-white hover:text-gray-400 transition-all duration-300">How to cancel your ordered</Link></li>
                            <li><Link to="/help/chat-me" className="text-white hover:text-gray-400 transition-all duration-300">Chat with Us</Link></li>
                            <li><Link to="/help/contact-me" className="text-white hover:text-gray-400 transition-all duration-300">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="mt-3 pl-7">
                        <h3 className="text-lg font-semibold text-white mb-3">Quick Link</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="text-white hover:text-gray-400 transition-all duration-300">About Us</Link> </li>
                            <li><Link to="/shop" className="text-white hover:text-gray-400 transition-all duration-300">Shop</Link></li>
                            <li><Link to="/contact" className="text-white hover:text-gray-400 transition-all duration-300">Contact</Link></li>
                            <li><Link to="/faq" className="text-white hover:text-gray-400 transition-all duration-300">FAQs</Link></li>
                        </ul>

                    </div>
                    <div className=" flex gap-3 justify-between w-full">
                        <div className=" mt-3 text-xl mb-3">
                            <h3 className="text-lg font-semibold text-white mb-3">Social Media</h3>
                            <div className="flex gap-3">
                                <Link to="#"><FaFacebookF className="hover:text-blue-500" /></Link>
                                <Link to="#"><FaInstagram className="hover:text-pink-500" /></Link>
                                <Link to="#"><FaTwitter className="hover:text-sky-400" /></Link>
                                <Link to="#"><FaWhatsapp className="hover:text-green-500" /></Link>
                            </div>

                        </div>
                        <div className="mt-3 text-xl mb-3 text-right">
                            <h4 className="text-lg font-semibold text-white mb-3 ">Payment Method</h4>
                            <div className="flex gap-3">
                                <Link to="#" className="relative group ">
                                    <GiCash className="hover:text-yellow-600  text-2xl" />
                                    <p className="absoulte w-5 top-full hidden group-hover:block text-[12px]">Cash</p>
                                </Link>
                                <Link to="#" className="relative group ">
                                    <FaCcVisa className="hover:text-yellow-600  text-2xl" />
                                    <p className="absoulte w-5 top-full hidden group-hover:block text-[12px]">Visa</p>
                                </Link>
                                <Link to="#" className="relative group ">
                                    <FaCcMastercard className="hover:text-yellow-600 text-2xl" />
                                    <p className="absolute top-full left-[-150%] hidden group-hover:block text-[12px] w-20 ">Master Card</p>
                                </Link>
                                <Link to="#" className="relative group w-5 ">
                                    <img src="/image/mtn_icon.png" alt="MTN Icon" className="w-full mt-[2px]" />
                                    <p className="absolute w-5 top-full left-[-15%] hidden group-hover:block text-[12px]   ">MTN</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 🔹 Bottom Note */}
                <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
                    &copy; {new Date().getFullYear()} E-Sissoko. All rights reserved.
                </div>
            </div>
        </>
    )
}