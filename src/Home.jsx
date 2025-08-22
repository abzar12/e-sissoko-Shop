import Navbar from "./component/Navbar"
import filter from '../FiltersGetting'
import './style/home.css'
import { useState } from "react"
function Home() {

    const query = [];
    const [input, Setinput] = useState([])
    const handleInput = (e) =>{
        let valueItem = e.target.value;
        let valueCheck = e.target.checked 
            Setinput((prev) => {
                const NewValue = valueCheck ? [...prev, valueItem] : prev.filter(ele => ele !== valueItem)
                return NewValue;
            }) 
    }

    const filtersByCategory = filter.Category.map((item, index) => (
        <div className="" key={index}>
            <input type="checkbox" onChange={handleInput} id={item.toLowerCase()} value={item} /> <label className="text-[15px] font-[lora]">{item}</label>
        </div>
    ))
    const filtersByPrice = filter.Price.map((item, index) => (
        <div className="" key={index}>
            <input type="checkbox" onChange={handleInput} id={item.toLowerCase()} value={item} /> <label className="text-[15px] font-[lora]">{item} <span>GHS</span></label>
        </div>
    ))
    const filterByColor = filter.Color.map((item, index) => (
        <div className="" key={index}>
            <input type="checkbox" onChange={handleInput} id={item.toLowerCase()} value={item} /> <label className="text-[15px] ">{item}</label>
        </div>
    ))
    return (
        <>
            <header>
                <Navbar />
            </header>
                <main className="grid grid-cols-[1fr,4fr] gap-5 ">
                    <aside className="border-r-2">
                        <div className="ac-Filters p-5">
                            <div className="ac-Category" >
                                <h2 className="text-[1.1rem] mb-5 font-bold uppercase font-[lora]">Category</h2>
                                {filtersByCategory}
                            </div>
                            <div className="ac-Price">
                                <h2 className="text-[1.1rem] my-3 font-bold uppercase font-[lora]">Price </h2>
                                {filtersByPrice}
                            </div>
                            <div className="ac-Color">
                                <h2 className="text-[1.1rem] my-3 font-bold uppercase font-[lora]">Color</h2>
                                {filterByColor}
                            </div>
                        </div>
                    </aside>
                    <section>

                    </section>
                </main>
        </>
    )
}
export default Home;