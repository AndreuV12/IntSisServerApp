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
app.set('trust proxy', 1)
app.use(session({
    secret: "pwd",
    name: "session-cookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000,
        secure: Boolean(ON_PRODUCTION),
        sameSite: Boolean(ON_PRODUCTION) ? "none" : false
    }
}))

app.use(addCredentials)
app.use('/oauth/google/', google_router)
app.use('/terminals/', terminal_router)
app.use('/machines/', machine_router)
app.use('/reservations/', reservation_router)


app.get('/', checkAuth, (req,res) => {
    res.send(`Hi ${req.session.user}, ${COOKIE_DOMAIN}!`)
})

app.get('/login', checkAuth, (req, res) => {
    res.json(req.session.user)
})

app.get('/logout', checkAuth, (req, res) => {
    req.session.user = {}
    res.send("loged out")
})

app.get('/username', checkAuth, (req, res) => {
    res.json(req.session.user.username)
})

app.listen( PORT,() => console.log(`Server App listening on ${PORT}`))