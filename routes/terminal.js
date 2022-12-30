import {Router} from "express"
import { getTerminal, getAllTerminals, addTerminal, deleteTerminal, bindTerminal } from "../controllers/terminal.js"
let terminal_router = Router()

terminal_router.get ('/', async (req,res) => {
    let terminals = await getAllTerminals()
    res.json(terminals)
})

terminal_router.post ('/add', async (req,res) => { 
    let {machine_name, permission} = req.body
    return res.json( await addTerminal(machine_name, permission) )
})

terminal_router.post ('/delete', async (req,res) => { 
    let {terminal_id} = req.body
    return res.json ( await deleteTerminal(terminal_id) )
})

terminal_router.post ('/bind', async (req,res) => { //query: terminal_id machine_name
    let {terminal_id, machine_name} = req.body
    res.json( await bindTerminal(terminal_id, machine_name))
})

terminal_router.get('/find/:terminal_id', async (req, res) => {
    let terminal = await getTerminal(req.params.terminal_id)
    res.json(terminal)
})

export default terminal_router