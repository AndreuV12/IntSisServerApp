import mqtt from 'mqtt'
import { getUserByRfid } from '../../controllers/user.js'
import { checkReservation } from '../../controllers/reservation.js'

const client = mqtt.connect("mqtt://test.mosquitto.org", { port: 1884, username: "rw", password: "readwrite" })
client.on('connect', function () { console.log("Mqtt is Connected") })


let activateReservation = (terminal_id, end) => {
    client.publish(`${terminal_id}/reserva`, end.getTime().toString().slice(0, -3))
    let now = new Date()
    setTimeout(() => {
        client.publish(`${terminal_id}/reserva`, '-1')
    },
        end - now)
}

let setCode = (terminal_id, code) => {
    console.log("set code on", terminal_id, code)
    client.publish(`${terminal_id}/code`, code)
}

client.subscribe('rfid')

client.on('message', async (topic, message) => {
    // console.log("Received",topic,message.toString())
    if (topic == 'rfid') {
        let [terminal_id, rfid] = message.toString().split('/')

        let user = await getUserByRfid(rfid)
        if (user) {
            let res = await checkReservation(terminal_id, user.email)
            if (res)
                activateReservation(terminal_id, res.end)
            else
                client.publish(`${terminal_id}/reserva`, '-1')
        }
        else {
            client.publish(`${terminal_id}/reserva`, '-2')
        }
    }
})

export { activateReservation, setCode }