import { Router } from "express"
import { getTerminal, getAllTerminals, addTerminal, deleteTerminal, bindTerminal, setPermission } from "../controllers/terminal.js"
import { checkAdmin } from "../utils/middlewares.js"
import { getMachine } from "../controllers/machine.js"
let terminal_router = Router()

terminal_router.get('/', async (req, res) => {
    let terminals = await getAllTerminals()
    res.json(terminals)
})

terminal_router.post('/add', checkAdmin, async (req, res) => {
    let { machine_name, permission } = req.body
    let terminal = await addTerminal(machine_name, permission)
    if (terminal)
        return res.json(terminal)
    else
        return res.status(404).send("Bad entry")
})

terminal_router.post('/delete', checkAdmin, async (req, res) => {
    let { terminal_id } = req.body
    let terminal = await deleteTerminal(terminal_id)
    if (terminal)
        return res.json(terminal)
    else
        return res.status(404).send("Non existing terminal_id")
})

terminal_router.post('/bind', checkAdmin, async (req, res) => { //query: terminal_id machine_name
    let { terminal_id, machine_name } = req.body
    let machine = await getMachine(machine_name)
    if (!machine) res.status(404).send("Non existing machine with this name")

    let terminal = await bindTerminal(terminal_id, machine_name)
    if (terminal)
        return res.json(terminal)
    else
        return res.status(404).send("Non existing terminal_id")
})

terminal_router.post('/set-permission', checkAdmin, async (req, res) => { //query: terminal_id machine_name
    let { terminal_id, permission } = req.body
    let terminal = await setPermission(terminal_id, permission)
    if (terminal)
        return res.json(terminal)
    else
        return res.status(404).send("Non existing terminal_id")
})

terminal_router.get('/find/:terminal_id', async (req, res) => {
    let terminal = await getTerminal(req.params.terminal_id)
    res.json(terminal)
})

export default terminal_router