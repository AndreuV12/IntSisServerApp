import dotenv from 'dotenv'
dotenv.config({ path: 'config/.env' })

let DB_USER = process.env.DB_USER
let DB_PASSWORD = process.env.DB_PASSWORD
let GOOGLE_CLIENT = process.env.GOOGLE_CLIENT
let GOOGLE_SECRET = process.env.GOOGLE_SECRET
let PORT = process.env.PORT
export  {DB_USER, DB_PASSWORD, GOOGLE_CLIENT, GOOGLE_SECRET, PORT}