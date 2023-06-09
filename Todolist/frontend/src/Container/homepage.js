import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Button, Input, Modal, Calendar, Select, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { FilterOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons'
import { userContext } from '../Context/user.js'
import { todoContext } from '../Context/todo.js'
import { Done } from '@mui/icons-material';
import { ObjectID } from 'bson';
import axios from '../api'



const HomeLeft = styled.div`
    background-color:#5b5d61;
    float: left;
    width: 20%;
    height: 100vh;
`
const HomeRight = styled.div`
    background: linear-gradient(#e66465, #9198e5);
    float: right;
    width: 80%;
    height: 100vh;
`
const TodoBlock = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    border: 2px solid white;
    padding : 20px;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    color: white
`
const Inputwidth = styled.div`
    width: 450px;
    align-items: center;
`
const SingleTodo = styled.div`
    border: 2px solid white;
    margin: 10px 0;
    padding: 10px 20px;
    width: 100%;
    display: flex;
    align-items:center;
`
const TodoText = styled.div`
    flex: 1;
`
const TodoTextCurse = styled.div`
    flex: 1;
    cursor:pointer;
`
const Curse = styled.div`
    cursor:pointer;
`


const Homepage = () => {
    const { todo, setTodo } = useContext(todoContext)
    const { user, setUser } = useContext(userContext)
    const [ newItem, setNewItem ] = useState('') 
    const [ openModal, setOpenModal ] = useState(false)
    const [ deadline, setDeadline ] = useState('')
    //params for filter
    const [ filterModal, setFilterModal ] = useState(false)
    const [ filter, setFilter ] = useState(false)
    const [ filterOption, setFilterOption ] = useState()
    const [ filterContext, setFilterContext ] = useState("")
    //
    //params for edit
    const [ editModal, setEditModal ] = useState(false)
    const [ editUser, setEditUser ] = useState("")
    const [ editTodo, setEditTodo ] = useState("")
    const [ editdeadline, setEditdeadline ] = useState("")
    const [ id, setId ] =  useState([])
    // 
    //function for filter
    const Filter = () => {
        setFilterModal(true)
    }
    const handleFilter = () => {
        if(filterOption === 0)setTodo(todo.filter(item => item.name === filterContext))
        if(filterOption === 1)setTodo(todo.filter(item => item.creator === filterContext))
        if(filterOption === 2)setTodo(todo.filter(item => item.deadline === filterContext))
        if(filterOption === 3)setTodo(todo.filter(item => item.createDate === filterContext))
        if(filterOption === 4)setTodo(todo.filter(item => item.taskID === filterContext))
        setFilterModal(false)
    }
    const noFilter = async() => {
        const { data: {data} } = await axios.get('/api/todolist', {params:{}});
        setTodo(data)
    }
    const handleChange = (value) => {
        setFilterOption(value)
    }
    //
    console.log(todo)
    //function for edit
    const EditDeadline = (value, mode) => {
        var val = value.format('YYYY-MM-DD')
        setEditdeadline(val)
    }
    const Edit = (item) => {
        setEditModal(true)
        setId(item)
        setEditUser(item.creator)
        setEditTodo(item.name)
    }
    const handleEdit = async() => {
        if(editdeadline !== '' && editUser !== '' && editTodo !== ''){
            const date = new Date()
            let currentDate = date.toJSON().slice(0,10)
            const {
                data: { code }
            } = await axios.post('/api/edit', {
                id:id._id,
                name: editTodo,
                creator: editUser,
                createDate: currentDate,
                deadline: editdeadline
            })
            if(code){
                setTodo(todo.map(item => {
                    if(item._id !== id._id) return item;
                    return{
                        ...item,
                        name: editTodo,
                        creator: editUser,
                        deadline: editdeadline,
                        createDate: currentDate
                    }
                }))
                setEditModal(false)
            }else{
                alert("Edit failed!")
            }
        }
        else alert("The Edit context shouldn't be empty!")
    }
    const notEdit = () => {
        setEditModal(false)
    }
    //
    //function for sort
    const Sort = (idx) => {
        if(idx === 0){
            const sort = [...todo].sort(
                (a,b) => { return a.name >= b.name ? 1 : -1}
            )
            setTodo(sort)
        }
        if(idx === 1){
            const sort = [...todo].sort(
                (a,b) => { return a.creator >= b.creator ? 1 : -1 }
            )
            setTodo(sort)
        }
        if(idx === 2){
            const sort = [...todo].sort(
                (a,b) => { return a.deadline >= b.deadline ? 1 : -1}
            )
            setTodo(sort)
        }
        if(idx === 3){
            const sort = [...todo].sort(
                (a,b) => { return a.createDate >= b.createDate ? 1 : -1}
            )
            setTodo(sort)
        }
        if(idx === 4){
            const sort = [...todo].sort(
                (a,b) => { return a.taskID >= b.taskID ? 1 : -1}
            )
            setTodo(sort)
        }
        console.log("here")
    }
    //
    const Delete = async(id) => {
        const {
            data: {code}
        } = await axios.post('/api/deleteList', {
            id:id
        })
        if(code){
            setTodo(todo.filter(item => item._id !== id))
        }else{
            alert("delete failed!")
        }
    }
    const showModal = () => {
        setOpenModal(true)
    }
    const handleCancel = () => {
        setNewItem('')
        setOpenModal(false)
    }
    const handleOK = async () => {
        console.log(deadline)
        console.log(newItem)
        if(deadline !== '' && newItem !== ''){
            const id = new ObjectID()
            console.log(id)
            const date = new Date()
            var text = "";
            var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(var i=0; i < 8; i++ )
            {  
            text += char_list.charAt(Math.floor(Math.random() * char_list.length));
            }
            let currentDate = date.toJSON().slice(0,10)
            const {
                data: {code}
            } = await axios.post('/api/addlist', {
                id: id,
                name: newItem,
                creator: user.name,
                createDate: currentDate,
                deadline: deadline,
                taskID: text
            })
            if(code){
                alert("Todos build successfully!")
                setTodo((prev) => {
                    return [...prev, {
                        name:newItem, 
                        creator:user.name, 
                        deadline:deadline, 
                        done:false, 
                        _id:id, 
                        createDate:currentDate,
                        taskID: text
                    }]}
                ) 
                setNewItem('')
                setOpenModal(false)               
            }else{
                alert("Todos build failed!")
            }
        }else{
            alert("deadline or newItem should not be empty!")
        }
    }
    const Done = async(id) => {
        const {
            data: {code}
        } = await axios.post('/api/changeDone', {
            id:id
        })
        if(code){
            setTodo(todo.map(item => {
            if (item._id !== id) return item;
            return{
                ...item,
                done: !item.done
            }
            })) 
        }else{
            alert("something wrong!")
        }
    }
    const Deadline = (value, mode) => {
        var val = value.format('YYYY-MM-DD')
        setDeadline(val)
    }
    return (
        <>
            <HomeLeft>
            </HomeLeft>
            <HomeRight>
                <TodoBlock>
                    <h1>Todo</h1>
                    <Button onClick={showModal}>新增任務</Button>
                    <Inputwidth>
                        <Modal
                            title="新增任務"
                            open={openModal} onOk={handleOK} onCancel={handleCancel}
                        >
                            <Input 
                            placeholder="todo" 
                            value={newItem}
                            onChange = {(e) => setNewItem(e.target.value)}
                            ></Input>
                            <Calendar
                                fullscreen={false}
                                onChange={Deadline}
                            ></Calendar>
                        </Modal>
                    </Inputwidth>
                    <SingleTodo>
                        <TodoTextCurse onClick={() => Sort(0)}>Todos</TodoTextCurse>
                        <TodoTextCurse onClick={() => Sort(1)}>Creator</TodoTextCurse>
                        <TodoTextCurse onClick={() => Sort(2)}>Deadline</TodoTextCurse>
                        <TodoTextCurse onClick={() => Sort(3)}>CreateDate</TodoTextCurse>
                        <TodoTextCurse onClick={() => Sort(4)}>taskID</TodoTextCurse>
                        <FilterOutlined onClick={() => Filter()}></FilterOutlined>
                        <CloseCircleOutlined onClick={() => noFilter()}></CloseCircleOutlined>
                    </SingleTodo>
                    <Modal
                        title="查詢"
                        open={filterModal} onOk={handleFilter} onCancel={noFilter}
                    >  
                    <Space wrap>
                        <Select defaultValue={0} style={{width:120}} onChange={handleChange}
                            options={[
                                {
                                    value:0,
                                    label:"Todos",
                                },
                                {
                                    value:1,
                                    label:"Creator",
                                },
                                {
                                    value:2,
                                    label:"Deadline",
                                },
                                {
                                    value:3,
                                    label:"CreateDate",
                                },
                                {
                                    value:4,
                                    label:"taskID",
                                },
                            ]}
                        ></Select>
                    </Space>        
                    <Input placeholder="filter" value={filterContext} onChange={(e) => setFilterContext(e.target.value)}></Input>               
                    </Modal>
                    {todo.map((item, i) => {
                        return <SingleTodo key={i} >
                                {!item.done && <TodoText onClick={() => Done(item._id)}><Curse>{item.name}</Curse></TodoText>}
                                {item.done && <TodoText onClick={() => Done(item._id)}><Curse><del>{item.name}</del></Curse></TodoText>}
                                <TodoText>{item.creator}</TodoText>
                                <TodoText>{item.deadline}</TodoText>
                                <TodoText>{item.createDate}</TodoText>
                                <TodoText>{item.taskID}</TodoText>
                                <EditOutlined onClick={() => Edit(item)}></EditOutlined>
                                <CloseCircleOutlined onClick={() => Delete(item._id)}></CloseCircleOutlined>
                            </SingleTodo>
                    })}
                    <Modal
                        title="編輯"
                        open={editModal} onOk={handleEdit} onCancel={notEdit}
                    >
                        <Input placeholder="todo" value={editTodo} onChange={(e) => setEditTodo(e.target.value)}></Input>
                        <Input placeholder="creator" value={editUser} onChange={(e) => setEditUser(e.target.value)}></Input>
                        <Calendar fullscreen={false} onChange={EditDeadline}></Calendar>
                    </Modal>
                </TodoBlock>
            </HomeRight>
        </>

    )
}
export default Homepage;