import Navbar from "../component/Navbar"
import Hero from "../component/hero"
import filter from '../../FiltersGetting'
import "../component/style/home.css"
import { useEffect, useState } from "react"
import ProductCard from "../component/ProductSection/ProductCard"
import ProductCardSlide from "../component/ProductSection/ProductCardSlide"
import Button from "../component/Button/button"
function Home() {
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
    const handleValues = (value) => {
        console.log(`abzar : ${value}`)
    }
    // fetching the product on the table
    // filters data to the server
    const queryStringFilter = encodeURIComponent(JSON.stringify(query));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`http://localhost:5330/product/show-product?query=${queryStringFilter}`);
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
    }, [query])
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
                <div className="grid grid-cols-[1fr,4fr] ">
                    {/* ---------aside */}
                <aside className="ac-filter">
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
                <section className="section-card ">
                    <ProductCard title="New Arrivals" auth={auth} Products={products} />
                    <div className="btn-down">
                        <Button type="button" children="Download More" />
                    </div>
                </section>
                </div>
                
                {/* ------------------New Arrivals Product------------------ */}
                <section className="section-cardSlide ">
                    <ProductCardSlide title="Most Popular" reverse= "" auth={auth} Products={products} />
                </section>
                <section className="section-cardSlide ">
                    <ProductCardSlide title="Recommended for You" reverse= "true" auth={auth} Products={products} />
                </section>
            </main>
        </>
    )
}
export default Home;