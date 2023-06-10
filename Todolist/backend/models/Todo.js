import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    creator:{
        type:String,
        required: true
    },
    createDate:{
        type:String,
        required: true
    },
    deadline:{
        type:String,
        required: true
    },
    taskID:{
        type:String,
        requierd: true
    },
    at:{
        type:[String]
    },
    done:{
        type:Boolean
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;