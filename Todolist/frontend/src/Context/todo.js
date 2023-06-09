import React, { createContext, useState } from 'react'

export const todoContext = createContext()

const TodoContextProvider = (props) => {
    const [todo, setTodo] = useState([])

    return (
        <todoContext.Provider value={{ todo, setTodo }} {...props} />
    )
}

export default TodoContextProvider