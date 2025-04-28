import React from "react"
import { createContext, useContext } from "react"

//create the default context value
const ApiUrlContext = createContext('https://homely-backend-qffs.onrender.com')
//const ApiUrlContext = createContext('http://localhost:8080')

//create context provider that'll wrap around app
export const ApiUrlProvider = ({ children }) => {
    const apiUrl = 'https://homely-backend-qffs.onrender.com'
    //const apiUrl = 'http://localhost:8080'
    return (
        <ApiUrlContext.Provider value={apiUrl}>
            {children}
        </ApiUrlContext.Provider>
    )
}

//create hook to access the url
export const useApiUrl = () => {
    return useContext(ApiUrlContext)
}