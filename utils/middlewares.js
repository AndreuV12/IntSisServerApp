import { CLIENT_URL } from "../config/config.js"

{ CLIENT_URL}
let checkAuth = (req, res, next) => {
    if (!req.session.user) return res.status(401).send("Not auth")
    next()
}

let addCredentials = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', CLIENT_URL )
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
}

let addSession = (req, _res, next) => {
    req.session.user = {
        email: "andreu.villaro@estudiantat.upc.edu",
        username: "Andreu",
        permission: 3
    }
    next()
}

export {checkAuth, addCredentials, addSession}