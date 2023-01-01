import dotenv from 'dotenv'

if ( !process.env.ON_PRODUCTION ) dotenv.config({ path: 'config/.env' })
let {
    ON_PRODUCTION,
    PORT,
    SERVER_URL,
    CLIENT_URL,
    DB_USER, 
    DB_PASSWORD, 
    GOOGLE_CLIENT, 
    GOOGLE_SECRET,
    COOKIE_DOMAIN
} = process.env

export  {  ON_PRODUCTION ,PORT, SERVER_URL, CLIENT_URL, DB_USER, DB_PASSWORD, GOOGLE_CLIENT, GOOGLE_SECRET, COOKIE_DOMAIN }