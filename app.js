import express from 'express'
import cors from 'cors'
import session from 'express-session'

import "./config/mongo.js"
import "./utils/mqtt/mqttHandler.js"

import google_router from './routes/google_auth.js'
import terminal_router from './routes/terminal.js'
import machine_router from './routes/machine.js'
import reservation_router from './routes/reservation.js'

import { checkAuth, addCredentials} from './utils/middlewares.js'
import { PORT, URL } from './config/config.js'

let app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "pwd",
    name: "Cookie",
    cookie: {
        maxAge: 60*60*1000,
        httpOnly: false,
        domain: "localhost"
    },
    resave: false,
    saveUninitialized: false
}))

app.use('/oauth/google/', google_router)
app.use('/terminals/', terminal_router)
app.use('/machines/', machine_router)
app.use('/reservations/', reservation_router)

app.use(addCredentials)

app.get('/', (req,res) => {
    res.send(`Hi ${req.session.user}, URL ${URL}!!`)
})

app.get('/login',  (req, res) => {
    req.session.user = {
        email: "andreu.villaro@estudiantat.upc.edu",
        username: "Andreu",
        permission: 3
    }
    res.json(req.session.user)
})
app.listen(PORT,() => console.log(`Server App listening on ${PORT}`))