import { Router } from 'express'
import { getReservationById, getReservations, checkReservation, addReservation, deleteReservation} from '../controllers/reservation.js'
import { getTerminal } from '../controllers/terminal.js'
import { checkAuth, addSession } from '../utils/middlewares.js'

//express
const reservation_router = Router()

//routes

reservation_router.get('/', async ( req, res ) => {
    let {from, to, terminal_id} = req.query
    return res.json( await getReservations(from, to, terminal_id, null) )
})

reservation_router.get('/find/:id', async ( req, res ) => {
    return res.json( await getReservationById(req.params.id) )
})

reservation_router.get('/user/', checkAuth, async ( req, res ) => {
    let {from, to, terminal_id} = req.query
    return res.json( await getReservations(from, to, terminal_id, req.session.user.email) )
})

reservation_router.get('/check/', checkAuth, async (req, res) => {
    let terminal = await getTerminal(req.query.terminal_id)
    if (!terminal) 
        return res.send("Non existing terminal_id")
    return res.json( await checkReservation(req.query.terminal_id, req.session.user.email) )
})

reservation_router.post('/add', checkAuth, async function(req, res) {
    let {terminal_id, start, end} = req.body
    let {permission, email} = req.session.user

    let terminal = await getTerminal(terminal_id)
    if (!terminal) 
        return res.send("Non existing terminal_id")

    if (permission < terminal.permission) 
        return res.send("No permision for using this machine")

    let reservations = await getReservations(start, end, terminal_id)
    if (!reservations) 
        return res.status(400).send("Invalid date or dates")

    if (reservations.length != 0) 
        return res.send("Machine already reserved during this period")
        
    return res.json(await addReservation(email, terminal_id, start, end))
})

reservation_router.post('/delete', checkAuth, async function(req, res) {
    let reservation = await getReservationById(req.body.reservation_id)

    if (!reservation) return res.send("No reservation matched")
    
    if (reservation.email != req.session.user.email) return res.send("No permision for deleting this reservation")

    return res.json(await deleteReservation(req.body.reservation_id))
})

export default reservation_router