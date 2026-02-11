import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState()
    const [user, setUser] = useState(null)
    const [isloading, setIsloading] = useState(true)
    // logged in or logged out function
    const login = (newtoken, userData) => {
        setAccessToken(newtoken)
        setUser(userData)
    }
    const logout = async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/customers/logout`, {
                method: "POST",
                credentials: "include", // 👈 important
            });
            const data = await resp.json()
            if (!resp.ok || !data.success) {
                throw new Error("Failed to Logout");
            }
            // setSuccessMessage(data.message)
            setAccessToken(null);
            setUser(null);
            logout()
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }
    useEffect(() => {
        const IniatialRefresh = async () => {
            try {
                setIsloading(true)
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/refresh/api`, {
                    method: "POST",
                    credentials: "include",
                })
                if (!resp.ok) {
                    // console.log("Unauthorize request")
                    throw new Error("Unauthorize request");
                }
                const data = await resp.json()
                setAccessToken(data.token)
                setUser(data.user)
                // console.log("InitialAUth:", data)
            } catch (error) {
                // logout()
                 setAccessToken(data.token)
                setUser(data.user)
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