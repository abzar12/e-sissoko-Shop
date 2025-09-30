 
 function Button({children, className="", ...props }){
    return(
        <button className={`border bg-[var(--btn-color)] font-[lora] cursor-pointer transition ease-in-out duration-400 ${className}`} {...props}>
            {children}
        </button>
    )
 }
 export default Button;