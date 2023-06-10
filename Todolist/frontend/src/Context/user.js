import React, { createContext, useState } from 'react'

export const userContext = createContext()

const UserContextProvider = (props) => {
    const [user, setUser] = useState("")
    
    return (
        <userContext.Provider value = {{ user, setUser }} {...props}/>
    )
}
 
export default UserContextProvider