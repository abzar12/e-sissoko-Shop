import Navbar from "./component/Navbar"
import filter from '../FiltersGetting'
import './style/home.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
        <div className="" key={index}>
            <input type="checkbox" onChange={(e) => handleQuery(e, "Category")} id={item.toLowerCase()} value={(item == "All") ? "" : item} /> <label className="text-[15px] font-[lora]">{item}</label>
        </div>
    ))
    const filtersByPrice = filter.Price.map((item, index) => (
        <div className="" key={index}>
            <input type="checkbox" onChange={(e) => handleQuery(e, "Price")} id={item.toLowerCase()} value={item} /> <label className="text-[15px] font-[lora]">{item} <span>GHS</span></label>
        </div>
    ))
    const filterByColor = filter.Color.map((item, index) => (
        <div className="" key={index}>
            <input type="checkbox" onChange={(e) => handleQuery(e, "Color")} id={item.toLowerCase()} value={item == "All" ? "" : item} /> <label className="text-[15px] ">{item}</label>
        </div>
    ))

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="grid grid-cols-[1fr,4fr] ">
                <aside className=" ">
                    <div className="ac-Filters p-5 relative">
                        <div className="ac-Category" >
                            <h2 className="text-[1.1rem] mb-5 font-bold uppercase font-[lora]">Category</h2>
                            {filtersByCategory}
                        </div>
                        <div className="ac-Price">
                            <h2 className="text-[1.1rem] my-3 font-bold uppercase font-[lora]">Price</h2>
                            {filtersByPrice}
                        </div>
                        <div className="ac-Color">
                            <h2 className="text-[1.1rem] my-3 font-bold uppercase font-[lora]">Color</h2>
                            {filterByColor}
                        </div>
                    </div>
                </aside>
                {/* card items */}
                <section className="px-5 pt-10 h-[90vh] overflow-y-scroll">
                    <div className="ac_Items flex flex-wrap justify-center items-end gap-3 py-5 ">
                        {
                            products.map((P, index) => (
                                <div key={index} className="item bg-white rounded-lg w-[180px] min-h-[220px] my-5 text-left mb-0 border-2 overflow-hidden ">
                                    <Link to={`/product/product-detail?${P.Id_phone}`}> <img src={`http://localhost:5330/public/img/${P.Image}`} alt={P.Image} className="w-full h-[100px] object-contain bg-center hover:scale-110 transition-all duration-300 z-0" /> </Link>
                                    <div className="ac_textItem px-3 h-auto pt-3">
                                        <p className="text-[16px] font-[Merriweather] font-bold">{P.Nom}</p>
                                        <p className="text-[12px]">{P.Description}</p>
                                        <p className="text-[18px] font-[Open-Sans]"> <span className="text-[16px] font-[Merriweather] mr-2 font-bold">Price:</span>{P.Price} GHS</p>
                                    </div>
                                    <div className="Add_btn mx-3 mt-2">
                                        <Link to={auth ? `/product/edit-product?Id=${P.Id_phone}` : `/product/product-detail?${P.Id_phone}`} > <button type="button" className="border-gray-500 hover:border-green-700 font-[Merriweather] border rounded-[50px] relative py-1 w-full mb-2 transition-all duration-[0.2s] ease-in hover:text-white "> {auth ? "Edit Product" : "Add to Cart"}</button> </Link>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </section>
            </main>
        </>
    )
}
export default Home;