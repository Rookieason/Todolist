import React, { createContext, useState } from 'react'

export const historyContext = createContext()

const HistoryContextProvider = (props) => {
    const [ historylist, setHistory ] = useState([])
    
    return (
        <historyContext.Provider value={{historylist, setHistory}} {...props} />
    )
}

export default HistoryContextProvider