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
        if (user){
            let res = await checkReservation(terminal_id, user.email)
            if (res){
                client.publish(`${terminal_id}/reserva`, res.end.toISOString())
                let now = new Date()
                setTimeout(()=>{
                    client.publish(`${terminal_id}/reserva`,'-1')
                }, 
                res.end - now)
            }     
            else    
                client.publish(`${terminal_id}/reserva`,'-1')
        }
        else{
            client.publish(`${terminal_id}/reserva`,'-1')
        }
    }  
})
export default client