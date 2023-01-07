import {Router} from "express"
import { checkAuth } from "../utils/middlewares.js"
let user_router = Router()

user_router.get ('/', checkAuth, async (req,res) => {
    res.json(req.session.user)
})

user_router.get('/username', checkAuth, (req, res) => {
    res.json(req.session.user.username)
})

user_router.get('/permission', checkAuth, (req, res) => {
    res.json(req.session.user.permission)
})

user_router.get('/login', (req, res) => {
    req.session.user = {
        email: "andreu.villaro@estudiantat.upc.edu",
        username: "Andreu",
        rfid: "123",
        permission: 3
    }
    res.send("Artificial login done with andreu.villaro@estudiantat.upc.edu")
})

user_router.get('/logout', checkAuth, (req, res) => {
    delete req.session
    res.send("loged out")
})

export default user_router