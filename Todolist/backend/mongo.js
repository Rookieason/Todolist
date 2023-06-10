import dotenv from "dotenv-defaults";
dotenv.config();
import mongoose from 'mongoose';
import Todo from './models/Todo.js'
import User from './models/user.js'
mongoose.connect(
    process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then((res) => console.log("mongo db connection created"));

const edit = async(id, name, creator, createDate, deadline) => {
    const exist = await Todo.findOne({_id:id})
    if(exist){
        const user = await User.findOne({name:creator})
        if(name !== exist.name || creator !== exist.creator){
            console.log("Can Edit")
            if(user){
                user.history.push({
                    id:id,
                    name: name,
                    creator: creator,
                    at: '',
                })
                user.save()
                console.log("Edited")
            }
        }
        await Todo.updateOne({_id:id}, {$set:{name:name, creator:creator, createDate:createDate, deadline:deadline}})
        return{
            code: 1
        }
    }else{
        return{
            code: 0
        }
    }
}
const changeDone = async(id) => {
    const data = await Todo.findOne({_id:id})
    if(data){
        let after = data.done
        await Todo.updateOne({_id:id}, {$set:{done:!after}})
        return {
            code: 1
        }
    }else{
        return {
            code: 0
        }
    }
}

const todoList = async() => {
    const todo = await Todo.find({})
    const data = []
    for(var i = 0;i<todo.length;i++){
        data.push(todo[i])
    }
    return{
        data: data
    }
}

const historyList = async(name) => {
    const user = await User.findOne({name:name})
    const history = []
    if(user){
        for(var i = 0;i<user.history.length;i++){
            history.push(user.history[i])
        }
        return{
            history:history,
            code: 1
        }
    }else {
        const newUser = new User({name: name, history: []})
        newUser.save()
        return {
        history: history,
        code: 0
        }
    }      
}

const deleteHistory = async(username, name, creator, id) => {
    const user = await User.findOne({name: username})
    if(user){
        await User.updateOne(
            {name:username},
            { $pull : {history:{"name":name, "creator":creator, "id":id}}}
        )
        return {
            code : 1
        }   
    }
    else{
        return {
            code: 0
        }
    }
}


const deleteList = async(id) => {
    const exist = await Todo.deleteOne({_id:id});
    if(!exist){
        return{
            code: 0
        }
    }else{
        return{
            code: 1
        }
    }
}

const addList = async(id, name, creator, createDate, deadline, taskID) => {
    const exist = await Todo.findOne({_id:id})
    if(exist){
        console.log(exist)
        return{
            code: 0
        }
    }else{
        const user = await User.findOne({name:creator})
        if(user){
            user.history.push({
                id:id,
                name: name,
                creator: creator,
                at: '',
            })
            user.save()
        }
        console.log("here2")
        const newTodo = new Todo({_id:id, name:name, creator:creator, createDate:createDate, deadline:deadline, at:[], taskID:taskID, done:false})
        newTodo.save()
        return{
            code: 1
        }
    }
}

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open",() => {
    console.log("db opened successfully.")
});

export { todoList, addList, deleteList, changeDone, edit, historyList, deleteHistory }