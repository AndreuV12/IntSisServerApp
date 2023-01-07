import mqtt from 'mqtt'
const client  = mqtt.connect("mqtt://test.mosquitto.org")

let terminal_id = "63ab0c155a8b724741a0a9e8"
client.on('connect', function () {
    console.log("Connected")
})

client.subscribe(`${terminal_id}/reserva`)
client.subscribe(`${terminal_id}/code`)

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic, "->", message.toString())
})

client.publish('rfid', `${terminal_id}/b27433ec`) 

// client.publish(`${terminal_id}/code`, `11111`) //enviar code