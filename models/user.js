import mongoose from 'mongoose'

const user_schema = new mongoose.Schema(
    {
        email:{
            type: String,
            unique: true
        },
        username: String,
        rfid: String,
        permission: Number
    },
    {
        versionKey: false 
    }
)

const User = mongoose.model('users', user_schema)

export default User