import {Router} from "express"
import { getAllMachines, getMachine, addMachine, deleteMachine} from "../controllers/machine.js"
let machine_router = Router()

machine_router.get ('/', async (req,res) => {
    res.json(await getAllMachines())
})

machine_router.get('/find/:name', async (req,res) => {
    res.json(await getMachine(req.params.name))
})

machine_router.get('/add/', async (req,res) => {
    res.json(await addMachine(req.query.name, req.query.description))
})

machine_router.get('/delete/:name', async (req,res) => {
    res.json ( await deleteMachine(req.query.name) )
    
})

export default machine_router