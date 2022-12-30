import mongoose from 'mongoose'

const terminal_schema = new mongoose.Schema(
    {
        machine_name: String, //name of the associated machine

        permission: Number
    },
    {
        versionKey: false 
    }
)

const Terminal = mongoose.model('terminals', terminal_schema)

export default Terminal