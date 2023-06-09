import React, { useState, useRef, useContext } from 'react'
import { Button, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { userContext } from '../Context/user.js'
import { todoContext } from '../Context/todo.js'
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
    const bodyRef = useRef(null)
    const { user, setUser } = useContext(userContext)
    const { todo, setTodo } = useContext(todoContext)
    const [ password, setPassword ] = useState('')
    const goPath = useHistory()
    const checkin = async(e) => {
        const { data: {data} } = await axios.get('/api/todolist', {params:{}});
        setTodo(data)
        goPath.push("/homepage")
    }
    return <Div>
        <TitleDiv>
            <h1>Sign In</h1>
        </TitleDiv>
        
        {/*Input Username*/}
        <Input
        onKeyDown = {(e) => {
            if(e.key === "Enter" && e.target.value){
                bodyRef.current.focus()
            }
        }}
        prefix={<UserOutlined/>}
        placeholder="Usename"
        value={user.name}
        onChange = {(e) => setUser(t => {
            return {
                name: e.target.value,
                id:t.id
            }
        })}
        style={{marginBottom:10}}
        ></Input>

        {/*Input password*/}
        <Input.Password
        ref={bodyRef}
        onKeydown = {(e) => {
            if(e.key === "Enter"){
                checkin()
            }
        }}  
        prefix = "🔒"
        type="search"
        placeholder="Password"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        style={{marginBottom:10}}
        iconRender = {visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        ></Input.Password>
        <Button onClick={checkin}>Send</Button>
    </Div>
}

export default SigninPage;