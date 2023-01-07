import Reservation from "../models/reservation.js"
import { genCode } from "../utils/codeGenerator.js"
let checkReservation = async (terminal_id, email) => {
    let now = new Date()
    return (await Reservation.findOne({terminal_id, email, start: {$lte: now}, end: {$gte: now}}))
}   

let addReservation = function (email, terminal_id, start, end){
    start = new Date(start)
    end = new Date(end)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return false
    let code = genCode(5)
    let reservation = new Reservation({
        email,
        terminal_id,
        start,
        end,
        code
    })
    return reservation.save()
}

let deleteReservation = async function (reservation_id){
    return await Reservation.findByIdAndRemove(reservation_id).catch( () => (null) )
}

let getReservationById = async function (reservation_id){
    return await Reservation.findById(reservation_id).catch( () =>(null) )
}

let getReservations = async function (from, to, terminal_id, email){
    let filters = {}
    if (from){
        from = new Date(from)
        if (isNaN(from.getTime())) return false
        filters.end = {$gt: from} 
    }
    if (to) {
        to = new Date(to)
        if (isNaN(to.getTime())) return false
        filters.start = {$lt: to}
    }
    
    if (terminal_id) filters.terminal_id = terminal_id
    if (email) filters.email = email
    return await Reservation.find(filters)
}

export {checkReservation, addReservation, deleteReservation, getReservationById, getReservations }