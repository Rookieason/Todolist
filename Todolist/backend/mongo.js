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
        console.log("here2")
        const newTodo = new Todo({_id:id, name:name, creator:creator, createDate:createDate, deadline:deadline, taskID:taskID, done:false})
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

export { todoList, addList, deleteList, changeDone, edit }