import mongoose from 'mongoose'

const reservation_schema = new mongoose.Schema({
    email: String,
    terminal_id: String, //Id of the reserved terminal
    start: Date,
    end: Date,
    code: String
})

export default mongoose.model('reservations', reservation_schema)