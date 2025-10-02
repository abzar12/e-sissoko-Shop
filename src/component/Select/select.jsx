import { useEffect, useState,useRef } from "react";
import "./select.css"
import { IoMdArrowDropdown } from "react-icons/io";
function Select() {
    const dropdownRef = useRef(null)
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]) //store multiple value 
    const handleSelected = (value) =>{
        setSelected((prev) => 
            prev.includes(value)
            ? prev.filter((ele) => ele !== value )
            : [...prev, value]
        )}
    useEffect(()=>{
        console.log(`this is items selected: ${selected}`)
    },[selected])
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const Items = [
        {
            name: 'Book',
            value: "book"
        },
        {
            name: 'Phone',
            value: "phone"
        },
        {
            name: 'Cable',
            value: "cable"
        },
        {
            name: 'Laptop',
            value: "laptop"
        }
    ]
    return (
        <>
            <div className="select-container" ref={dropdownRef}>
                <div className="dropdown-btn" onClick={() => (setOpen(!open))}>
                    <label htmlFor="">{selected.length > 0 ? selected.join(", ") : "Select Product" }<span> <IoMdArrowDropdown className="icon-Dropdown" /></span></label>
                </div>
                {/* dropdown */}
                {
                    open && (
                        <div className="dropdown" >
                            <ul>
                                {
                                    Items.map((item) => (
                                        <li key={item.name} onClick={() => handleSelected(item.value)} className={`item ${selected.includes(item.value) ? 'selected' : ""}`}>{item.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }

            </div>
        </>
    )
}
export default Select;