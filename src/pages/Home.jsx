import Navbar from "../component/Navbar"
import Hero from "../component/hero"
import filter from '../../FiltersGetting'
import { FaAward } from "react-icons/fa"
import { FaLightbulb } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../component/style/home.css"
import { useEffect, useState } from "react"
import ProductCard from "../component/ProductSection/ProductCard"
import ProductCardSlide from "../component/ProductSection/ProductCardSlide"
import Button from "../component/Button/button"
function Home() {
    const [filterbutton, setfilterbutton] = useState(true); // for the small screen to hide an aside card refer to filter 
    const [limitPage, setlimitPage] = useState(10)
    const [products, SetProducts] = useState([]);
    // const for the filters of product
    const [query, Setquery] = useState({ Category: [], Price: [], Color: [] })
    // authentification
    const [auth, setAuth] = useState(false);
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
    // ----------------handle values of select 
    // fetching the product on the table
    // filters data to the server
    const queryStringFilter = encodeURIComponent(JSON.stringify(query));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`http://localhost:5330/product/show-product?query=${queryStringFilter}&page=1&limit=${limitPage}`);
                if (!resp.ok) {
                    throw new Error(`Please Check : ${resp.status}`)
                }
                const data = await resp.json();
                SetProducts(data);
            } catch (Err) {
                console.log("Fetching Data Failed", Err)
            }
        }
        fetchData();
    }, [query, limitPage])
    // handle filters 
    const filtersByCategory = filter.Category.map((item, index) => (
        <div className="categories" key={index}>
            <input type="checkbox" className="cursor-pointer" onChange={(e) => handleQuery(e, "Category")} id={item.toLowerCase()} value={(item == "All") ? "" : item} /> <label className="text-[15px] font-[lora] hover:text-gray-600 ">{item}</label>
        </div>
    ))
    const filtersByPrice = filter.Price.map((item, index) => (
        <div className="categories" key={index}>
            <input type="checkbox" className="cursor-pointer" onChange={(e) => handleQuery(e, "Price")} id={item.toLowerCase()} value={item} /> <label className="text-[15px] font-[lora] hover:text-gray-600">{item} <span>GHS</span></label>
        </div>
    ))
    const filterByColor = filter.Color.map((item, index) => (
        <div className="categories" key={index}>
            <input type="checkbox" className="cursor-pointer" onChange={(e) => handleQuery(e, "Color")} id={item.toLowerCase()} value={item == "All" ? "" : item} /> <label className="text-[15px]  font-[lora] hover:text-gray-600">{item}</label>
        </div>
    ))
    return (
        <>
            <header >
                <Hero />
            </header>
            <main className="">
                <div className={`grid ${filterbutton ? "grid-cols-[1fr,4fr]" : "grid-cols-1fr"}`}>
                    {/* ---------aside */}
                    {/* display this button only if filters card is false mean hid */}
                    <button
                        className={`aside-btn ${filterbutton ? 'hidden' : ''} `}
                        onClick={() => setfilterbutton(!filterbutton)}
                    >
                        <FaFilter />
                        <span > <FaRegArrowAltCircleRight className="absolute right-[-20px] bg-[var(--bg-color)] py-2 top-0 text-[40px] rounded-r-full " /></span>
                    </button>
                    {
                        filterbutton && (
                            <aside className="ac-filter">
                                <button
                                    className={`aside-btn ${filterbutton ? 'right-0 top-[50%] py-0  mt-0 ' : 'hidden'} `}
                                    onClick={() => setfilterbutton(!filterbutton)}
                                >
                                    <span > <FaRegArrowAltCircleLeft className="absolute right-[-20px] bg-[var(--bg-secondary)] text-[var(--bg-color-primary)] py-2 top-0 text-[40px] rounded-r-full " /></span>
                                </button>
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
                        )
                    }
                    {/* ------------------New Arrivals Product------------------ */}
                    <section className="section-card ">
                        {/* ac_ItemClass refer in productCart class ac_Items to make it responsible with props */}
                        <ProductCard title="New Arrivals" ac_ItemClass={filterbutton ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 '} auth={auth} Products={products} />
                        <div className="btn-down">
                            <Button type="button" onClick={() => setlimitPage(prev => prev + 10)} children="Download More" />
                        </div>
                    </section>
                </div>
                {/* ------------------New Arrivals Product------------------ */}
                <section className="section-cardSlide ">
                    <ProductCardSlide title="Most Popular" titleClass="bg-red-600 text-white" reverse="" icon={<FaAward className="text-yellow-300 text-4xl mr-3" />} auth={auth} Products={products} />
                </section>
                <section className="section-cardSlide ">
                    <ProductCardSlide title="Recommended for You" titleClass="bg-[var(--bg-color-primary)] text-white" icon={<FaLightbulb className="text-blue-500 text-4xl mr-3" />} reverse="true" auth={auth} Products={products} />
                </section>
            </main >
        </>
    )
}
export default Home;