import express from 'express'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import "./config/mongo.js"
import "./utils/mqtt/mqttHandler.js"

import user_router from './routes/user.js'
import google_router from './routes/google_auth.js'
import terminal_router from './routes/terminal.js'
import machine_router from './routes/machine.js'
import reservation_router from './routes/reservation.js'

import { addCredentials} from './utils/middlewares.js'
import { PORT, ON_PRODUCTION, CLIENT_URL} from './config/config.js'

let app = express()
var whitelist = ['http://localhost:3000/', 'https://techlab-client.herokuapp.com/']

app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
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
app.use('/user/', user_router)

app.listen( PORT,() => console.log(`Server App listening on ${PORT}`))