import React, { createContext, useEffect, useState } from "react";
import { is } from "zod/locales";

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState()
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [isloading, setIsloading] = useState(true)
    useEffect(() => {
        async function getToken() {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/refresh/api`, {
                    method: "POST",
                    credentials: 'include'
                })
                const data = await resp.json()
                if (!resp.ok) {
                    throw new Error("Client Error, Status:", resp.status);
                }
                setUser(data.user)
                setAccessToken(data.token)
                setIsAuth(true)
                console.log("1: Should be render firstly")
            } catch (error) {
                setAccessToken(null);
                setUser(null)
                setIsAuth(false)
                console.log("Client Error:, ", error)
            } finally {
                setIsloading(false)
            }
        }
        getToken()
    }, [])
    return (
        <>
            <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, isAuth, setIsAuth, isloading }} >
                {children}
            </AuthContext.Provider>
        </>
    )
}
export default AuthProvider