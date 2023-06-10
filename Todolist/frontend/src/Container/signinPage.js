import React, { useState, useRef, useContext } from 'react'
import { Button, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userContext } from '../Context/user.js'
import { todoContext } from '../Context/todo.js'
import { historyContext } from '../Context/history.js'
import { useHistory } from 'react-router-dom'

import axios from '../api'

const Div = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    height:100vh;
    width:500px;
    margin: auto;
`

const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const SigninPage = () => {
    const { historylist, setHistory } = useContext(historyContext)
    const { user, setUser } = useContext(userContext)
    const { todo, setTodo } = useContext(todoContext)
    const goPath = useHistory()
    const checkin = async(e) => {
        console.log("Checkin")
        const { data: {data} } = await axios.get('/api/todolist', {params:{}});
        const { 
            data: { history, code }
        } = await axios.get('/api/historylist', {
            params:{
                name: user
            }
        })
        setTodo(data)
        setHistory(history)
        goPath.push("/homepage") 
        if(!code)console.log("It's a new person")  
    }
    return <Div>
        <TitleDiv>
            <h1>Sign In</h1>
        </TitleDiv>
        
        {/*Input Username*/}
        <Input
        onKeyDown = {(e) => {
            if(e.key === "Enter" && e.target.value){
                checkin()
            }
        }}
        prefix={<UserOutlined/>}
        placeholder="Usename"
        value={user}
        onChange = {(e) => setUser(e.target.value)}
        style={{marginBottom:10}}
        ></Input>
        <Button onClick={checkin}>Send</Button>
    </Div>
}

export default SigninPage;