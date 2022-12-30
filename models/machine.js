import mongoose from 'mongoose'

const machine_schema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        description: String
    },
    {
        versionKey: false,
    }
)

export default mongoose.model('machines', machine_schema)