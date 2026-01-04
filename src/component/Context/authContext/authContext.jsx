import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState()
    const [user, setUser] = useState(null)
    const [isloading, setIsloading] = useState(true)
    // logged in or logged out function
    const login = (newtoken, userData) => {
        setAccessToken(newtoken)
        setUser(userData)
    }
    const logout = () => {
        setAccessToken(null);
        setUser(null);
        fetch('/auth/logout', { credential: true })
    }
    useEffect(() => {
        const IniatialRefresh = async () => {
            try {
                setIsloading(true)
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/refresh/api`, {
                    method: "POST",
                    credentials: "include",
                })
                if (!resp.ok){
                    console.log("Unauthorize request")
                    throw new Error("Unauthorize request");
                } 
                const data = await resp.json()
                setAccessToken(data.token)
                setUser(data.user)
                console.log("InitialAUth:", data)
            } catch (error) {
                logout()
                throw new Error(`Unauthorize request: : ${error}`);
            } finally {
                setIsloading(false)
            }
        }
        IniatialRefresh()
    }, [])
    return (
        <>
            <AuthContext.Provider value={{ accessToken, user, login, logout, isloading }} >
                {children}
            </AuthContext.Provider>
        </>
    )
}
export const useAuth = () => useContext(AuthContext)