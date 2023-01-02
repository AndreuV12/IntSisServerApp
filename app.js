import express from 'express'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import "./config/mongo.js"
import "./utils/mqtt/mqttHandler.js"

import google_router from './routes/google_auth.js'
import terminal_router from './routes/terminal.js'
import machine_router from './routes/machine.js'
import reservation_router from './routes/reservation.js'

import { checkAuth, addCredentials} from './utils/middlewares.js'
import { PORT, ON_PRODUCTION, COOKIE_DOMAIN, CLIENT_URL} from './config/config.js'

let app = express()
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('trust proxy', 2)
app.use(session({
    secret: "pwd",
    name: "session-cookie",
    cookie: {
        maxAge: 60*60*1000,
        secure: Boolean(ON_PRODUCTION),
        httpOnly: !Boolean(ON_PRODUCTION),
        domain: ".herokuapp.com"
    },
    resave: false,
    saveUninitialized: false
}))

app.use('/oauth/google/', google_router)
app.use('/terminals/', terminal_router)
app.use('/machines/', machine_router)
app.use('/reservations/', reservation_router)
app.use(addCredentials)

app.get('/', checkAuth, (req,res) => {
    res.send(`Hi ${req.session.user}, ${COOKIE_DOMAIN}!`)
})

app.get('/login',  (req, res) => {
    req.session.user = {
        email: "andreu.villaro@estudiantat.upc.edu",
        username: "Andreu",
        permission: 3
    }
    res.json(req.session.user)
})

app.listen( PORT,() => console.log(`Server App listening on ${PORT}`))