import {Router} from "express"

import {google} from 'googleapis'
import axios from 'axios'

import { userFindOrCreate } from '../controllers/user.js'

import { GOOGLE_CLIENT, GOOGLE_SECRET } from '../config/config.js'

import  { SERVER_URL, CLIENT_URL } from '../config/config.js'

const GOOGLE_SCOPE = [ 'email', 'profile' ]
const callbackUrl = `${SERVER_URL}/oauth/google/callback`

//express
let google_router = Router()

let oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT,
    GOOGLE_SECRET,
    callbackUrl
)

//routes
google_router.get('/', function(_req, res) {
    let authurl= oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: GOOGLE_SCOPE,
        include_granted_scopes: true
    })
    res.redirect(authurl)
})

google_router.get('/callback', async(req, res) => {
    const {tokens} = await oauth2Client.getToken(req.query.code)    
    oauth2Client.setCredentials(tokens)

    let response = await axios({
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    })

    let username = response.data.given_name
    let email = response.data.email

    req.session.user = await userFindOrCreate(email, username, null, 0)   
    res.redirect(`${CLIENT_URL}/login`)    
})

export default google_router