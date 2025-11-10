 
 function Button({children, className="", disabled, ...props }){
    return(
        <button disabled ={disabled} className={`border ${ disabled ? ' cursor-not-allowed bg-gray-400 text-gray-200 opacity-50 hover:bg-gray-400': 'cursor-pointer'} font-[lora] transition duration-300 ease-in ${className}`} {...props}>
            {children}
        </button>
    )
 }
 export default Button;