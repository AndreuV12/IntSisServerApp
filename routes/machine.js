import {Router} from "express"
import { getAllMachines, getMachine, addMachine, deleteMachine} from "../controllers/machine.js"
let machine_router = Router()

machine_router.get ('/', async (req,res) => {
    res.json(await getAllMachines())
})

machine_router.get('/find/:name', async (req,res) => {
    res.json(await getMachine(req.params.name))
})

machine_router.post('/add', async (req,res) => {
    res.json(await addMachine(req.body.name, req.body.description))
})

machine_router.post('/delete', async (req,res) => {
    res.json ( await deleteMachine(req.body.name) )  
})

export default machine_router