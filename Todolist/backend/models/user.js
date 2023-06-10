import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String
    },
    history: {
        type: [{
            id: {
                type:mongoose.Types.ObjectId
            },
            name: {
                type:String
            },
            creator:{
                type:String
            },
            at:{
                type:String
            }
        }]
    }
});
const User = mongoose.model('User', UserSchema);
export default User;