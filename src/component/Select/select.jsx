import { useEffect, useState, useRef } from "react";
import "./select.css"
import { IoMdArrowDropdown } from "react-icons/io";
function Select({ items, onChance }) {
    // create useRef to handle click of outside 
    const dropdownRef = useRef(null)
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([
    ]) //store multiple value 
    const handleSelected = (value) => {
        let newSelected;
        if (selected.includes(value)) {
            newSelected = selected.filter(ele => ele !== value);
        } else {
            newSelected = [...selected, value]
        }
        setSelected(newSelected);
        if (onChance) onChance(newSelected);
    }
    // setSelected((prev) => 
    //     prev.includes(value)
    //     ? prev.filter((ele) => ele !== value )
    //     :newSelected = [...prev, value]
    //    
    // )}

    useEffect(() => {
        console.log(items)
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="select-container" ref={dropdownRef}>
                <div className="dropdown-btn" onClick={() => (setOpen(!open))}>
                    <label htmlFor="">{selected.length > 0 ? selected.join(", ") : "Select Product"}<span> <IoMdArrowDropdown className="icon-Dropdown" /></span></label>
                </div>
                {/* dropdown */}
                {
                    open && (
                        <div className="dropdown" >
                            <ul>
                                {
                                    items.map((item) => (
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