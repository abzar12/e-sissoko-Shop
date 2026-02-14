import { createContext, useContext, useEffect, useState } from "react"


const ThemeContext = createContext()

export function ThemProvider({children}){
    const [them, setTheme] = useState("light")

    useEffect(() =>{
       document.documentElement.setAttribute('data-theme', them === 'light'? "" : them )
    }, [them])

    const SwitchTheme = (Newthem) => setTheme(Newthem);

    return (
        <ThemeContext.Provider value={{them, SwitchTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => useContext(ThemeContext)

