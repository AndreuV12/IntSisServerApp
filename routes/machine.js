import { Router } from "express"
import { getAllMachines, getMachine, addMachine, deleteMachine } from "../controllers/machine.js"
import { checkAdmin } from "../utils/middlewares.js"

let machine_router = Router()

machine_router.get('/', async (req, res) => {
    res.json(await getAllMachines())
})

machine_router.get('/find/:name', async (req, res) => {
    res.json(await getMachine(req.params.name))
})

machine_router.post('/add', checkAdmin, async (req, res) => {
    let machine = await addMachine(req.body.name, req.body.description)
    if (machine)
        res.json(machine)
    else
        res.status(404).send("Something went wrong")
})

machine_router.post('/delete', checkAdmin, async (req, res) => {
    let machine = await deleteMachine(req.body.name)
    if (machine)
        res.json(machine)
    else
        res.status(404).send("Non existing machine")
})

export default machine_router