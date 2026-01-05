import React from "react"

let isRefreshing = false; // we will declare the condition with this variable
let RefreshSubscribe = []; // it will store the call back function that are waiting for new token

// funciton that store all the request which need the request
const SubscribeRefreshToken = (cb) => {
    RefreshSubscribe.push(cb);
}
// Notify all the request now after getting the new token 
const AfterRefresh = (newToken) => {
    RefreshSubscribe.forEach((cb) => cb(newToken))
    RefreshSubscribe = []; // after clean the array
}
// main
const ApiFetchData = async (url, option = {}, auth) => {
    const { accessToken, login, logout } = auth;
    const Resp = await fetch(url, {
        ...option,
        headers: {
            ...option.headers,
            Authorization: `Bearer ${accessToken}`,
            credentials: "include"
        }
    })
    if (Resp.status !== 401) return Resp
    // if the status is equals to 401 is mean acccess Token expired then get new one 
    if (!isRefreshing) {
        isRefreshing = true // pass true to isRefreshing to prevent others requestion to access 
        // call refreshToken from backend
        try {
            const RefreshResp = await fetch(`${import.meta.env.VITE_API_URL}/refresh/api`, {
                method: "POST",
                credentials: "include"
            });
            if (!RefreshResp.ok) throw new Error("Failed to refresh");

            const data = await RefreshResp.json()
            login(data.token, data.user);
            isRefreshing = false
            AfterRefresh(data.token)
        } catch (error) { 
            isRefreshing = false;
            logout()
            console.log(`Refresh token Failed: ${error.message}`)
            throw new Error(`Refresh token Failed: ${error.message}`);
        }
    }
    // Wait for refresh to complete 
    return new Promise((resolve) => {
        SubscribeRefreshToken((newtoken) => {
            resolve(
                fetch(url, {
                    ...option,
                    headers: {
                        ...option.headers,
                        Authorization: `Bearer ${newtoken}`
                    },
                    credentials: "include",
                })
            );
        });
    });
}
export default ApiFetchData