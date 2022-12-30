import mqtt from 'mqtt'
import { getUserByRfid } from '../../controllers/user.js'
import { checkReservation } from '../../controllers/reservation.js'

const client  = mqtt.connect("mqtt://test.mosquitto.org")

client.on('connect', function () {console.log("Mqtt is Connected")})

client.subscribe('rfid')

client.on('message', async (topic, message) => {
    console.log("Received",topic,message.toString())

    // message is Buffer
    if (topic == 'rfid'){
        let [terminal_id, rfid] = message.toString().split('/')
        
        let user = await getUserByRfid(rfid)
        let res = await checkReservation(terminal_id, user.email)
        if (res){
            client.publish('reserva', `${terminal_id}/${res.end}`)
            let now = new Date()
            setTimeout(()=>{
                client.publish('reserva',`${terminal_id}/ended`)
            }, 
            res.end - now)
        }     
        else    
            client.publish('reserva', `${terminal_id}/notReserved`)
    }
})
export default client