import Navbar from "../component/Navbar"
import Hero from "../component/hero"
import Footer from "../component/Footer"
import filter from '../../FiltersGetting'
import { FaAward } from "react-icons/fa"
import { FaLightbulb } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaPhone } from "react-icons/fa"
import "../component/style/home.css"
import { useEffect, useState } from "react"
import ProductCard from "../component/ProductSection/ProductCard"
import ProductCardSlide from "../component/ProductSection/ProductCardSlide"
import Button from "../component/Button/button"
import Loading from "../component/loading/Loading"
import { useLocation } from "react-router-dom"
function Home() {
    const location = useLocation()
    console.log("Home rendered ")

    const [is_loading, setloading] = useState(false)
    const [filterbutton, setfilterbutton] = useState(true); // for the small screen to hide an aside card refer to filter 
    const [products, SetProducts] = useState([]);
    // const for the filters of product
    const [query, Setquery] = useState({
        category: [],
        price: [],
        color: [],
        page: 1,
        limit: 50,
        search: ""
    })
    // authentification

    const queryString = new URLSearchParams(query).toString();
    // funtion to hanldle the product to be save
    const handleQuery = (e, type) => {
        let valueItem = e.target.value;
        let valueCheck = e.target.checked
        Setquery((prev) => {
            const NewValue = valueCheck ? [...prev[type], valueItem] : prev[type].filter(ele => ele !== valueItem)
            return { ...prev, [type]: NewValue };
        })
    }
    const searchFn = (values) =>{
        const value = values.toLowerCase().trim()
        Setquery((prev) => {
            return {...prev, search: value}
        })
        console.log(query)
    }
    // fetching the product on the table
    // filters data to the server
    const queryStringFilter = encodeURIComponent(JSON.stringify(query));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/product/getAll?query=${JSON.stringify(query)}`);
                if (!resp.ok) {
                    throw new Error(`Please Check : ${resp.status}`)
                }
                const data = await resp.json();
                SetProducts(data.response.products);
                setloading(true)
            } catch (Err) {
                console.log("Fetching Data Failed", Err)
            } finally {
                setTimeout(() => {
                    setloading(false)
                }, 500);
            }
        }
        fetchData();
    }, [query])
    // handle filters 
    const filtersByCategory = filter.Category.map((item, index) => (
        <div className="categories" key={index}>
            <input type="checkbox" className="cursor-pointer" onChange={(e) => handleQuery(e, "category")} id={item.toLowerCase()} value={item.toLowerCase() == "all" ? "" : item.toLowerCase()} /> <label className="text-[15px] font-[lora] hover:text-gray-600 ">{item}</label>
        </div>
    ))
    const filtersByPrice = filter.Price.map((item, index) => (
        <div className="categories" key={index}>
            <input type="checkbox" className="cursor-pointer" onChange={(e) => handleQuery(e, "price")} id={item.toLowerCase()} value={item.toLowerCase()} /> <label className="text-[15px] font-[lora] hover:text-gray-600">{item} <span>GHS</span></label>
        </div>
    ))
    const filterByColor = filter.Color.map((item, index) => (
        <div className="categories" key={index}>
            <input type="checkbox" className="cursor-pointer" onChange={(e) => handleQuery(e, "color")} id={item.toLowerCase()} value={item.toLowerCase() == "all" ? null : item.toLowerCase()} /> <label className="text-[15px]  font-[lora] hover:text-gray-600">{item}</label>
        </div>
    ))
    return (
        <>
            <header >
                <Hero onSearch={searchFn}/>
            </header>
            <main className="">
                <div className={`grid ${filterbutton ? "grid-cols-[1fr,4fr]" : "grid-cols-1fr"}`}>
                    {/* ---------aside */}
                    {/* display this button only if filters card is false mean hid */}
                    <button
                        className={`aside-btn ${filterbutton ? 'hidden' : 'flex'} `}
                        onClick={() => setfilterbutton(!filterbutton)}
                    >
                        <FaFilter />
                        <span > <FaRegArrowAltCircleRight className="absolute  right-[-20px] bg-[var(--bg-color)] py-2 top-0 text-[40px] rounded-r-full " /></span>
                    </button>
                    <aside className={`${filterbutton ? 'block' : 'hidden'} ac-filter max-h-[750px]`}>
                        <span > <FaRegArrowAltCircleLeft onClick={() => setfilterbutton(false)} className={`${filter ? " " : ""} absolute cursor-pointer right-[-20px] top-[50%] bg-[var(--bg-secondary)] text-[var(--bg-color-primary)] py-2 text-[40px] rounded-r-full `} /></span>
                        <div className="container">
                            <div className="ac-Category" >
                                <h2 className="">Category</h2>
                                {filtersByCategory}
                            </div>
                            <div className="ac-Price">
                                <h2 className="">Price</h2>
                                {filtersByPrice}
                            </div>
                            <div className="ac-Color">
                                <h2 className="">Color</h2>
                                {filterByColor}
                            </div>
                        </div>

                    </aside>
                    {/* ------------------New Arrivals Product------------------ */}
                    <section className="section-card h-[100vh] overflow-y-scroll">
                        {/* ac_ItemClass refer in productCart class ac_Items to make it responsible with props */}
                        {
                            (is_loading === false)
                                ?
                                // if data no found ---------------------------------------
                                (
                                    products.length === 0 ?
                                        <div className="flex flex-col items-center justify-center h-full py-10">
                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-10 h-10 text-gray-400"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.362 5.214A8.25 8.25 0 016 6.75m12.002 10.5A8.25 8.25 0 006 17.25m0 0L3.75 15m2.25 2.25L3.75 19.5"
                                                    />
                                                </svg>
                                            </div>

                                            <h1 className="text-gray-600 font-semibold text-lg mt-4">
                                                No Data Found
                                            </h1>

                                            <p className="text-gray-400 text-sm mt-1 text-center">
                                                We couldn't find any items. Please try again later.
                                            </p>
                                        </div>
                                        // if data no found ------------------ END ---------------------
                                        :
                                        // if Item found on data base ---------------------------------------

                                        <div className="">
                                            < ProductCard title="New Arrivals" titleClass="text-white bg-[rgb(234,179,8)]" ac_ItemClass={filterbutton ? 'is_small' : 'is_large'} Products={products} />
                                            <div className="btn-down">
                                                <Button type="button" onClick={() => set(prev => prev + 10)} children="Download More" />
                                            </div>
                                        </div>
                                )

                                :
                                // if the product is not available this Loading will be display
                                (
                                    < Loading />
                                )
                        }

                    </section>
                </div>
                {/* ------------------New Arrivals Product------------------ */}
                <section className="section-cardSlide ">
                    <ProductCardSlide title="Most Popular" titleClass="bg-red-600 text-white" reverse="" icon={<FaAward className="text-yellow-300 text-4xl mr-3" />} Products={products} />
                </section>
                {/* ------------------recommended section -------- */}
                <section className="section-cardSlide ">
                    <ProductCardSlide title="Recommended for You" titleClass="bg-[var(--bg-color-primary)] text-white" icon={<FaLightbulb className="text-blue-500 text-4xl mr-3" />} reverse="true" Products={products} />
                </section>
                {/* ------------------Phone section -------- */}
                <section className="section-card min-h[100vh] pb-5">
                    <ProductCard title="Phone" titleClass="bg-[var(--bg-color-primary)] text-white" Icon={< FaPhone className="text-4xl" />} ac_ItemClass="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 " Products={products} />
                </section>
            </main >
            <footer>
                <Footer />
            </footer>
        </>
    )
}
export default Home;