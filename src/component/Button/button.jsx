 
 function Button({children, className="", ...props }){
    return(
        <button className={`border bg-[var(--btn-color)] font-[lora] cursor-pointer transition duration-300 ease-in ${className}`} {...props}>
            {children}
        </button>
    )
 }
 export default Button;