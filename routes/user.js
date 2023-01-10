import { Router } from "express"
import { checkAuth, checkAdmin } from "../utils/middlewares.js"
import { updateUser, deleteUser } from "../controllers/user.js"
let user_router = Router()

user_router.get('/', checkAuth, async (req, res) => {
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

user_router.post('/add', checkAdmin, async function (req, res) {
    let { email, username, rfid, permission } = req.body
    let user = await userFindOrCreate(email, username, rfid, permission)
    if (user == 1) res.status(402).send("user already exists")

    else if (user == 2) {
        res.status(404).send("Bad entry")
    }
    else {
        res.json(user)
    }
})

user_router.post('/update', checkAdmin, async function (req, res) {
    let { email, rfid, permission } = req.body
    let user = await updateUser(email, rfid, permission)
    if (!user) res.status(404).send("user dont exist")
    res.json(user)
})

user_router.post('/delete', checkAdmin, async function (req, res) {

    let user = await deleteUser(req.body.email)
    if (!user) res.status(404).send("user dont exist")
    res.json(user)
})

export default user_router