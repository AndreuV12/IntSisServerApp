import mongoose from 'mongoose'
import { DB_USER, DB_PASSWORD } from './config.js'
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.za7axzk.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('BD is connected')
})