import User from '../models/user.js'
import "../config/mongo.js"

let userFindOrCreate = async (email, username, rfid, permission ) => {
    let user = await User.findOne({email})
    if (user) return user 
    
    user = new User({
        username,
        email,
        rfid,
        permission
    })
    return user.save()
}

let getUserByRfid = async (rfid) => {
    return await User.findOne({rfid})
}

let updateUser = async (email, rfid, permission) => {
    let updates = {}
    if (rfid) updates.rfid = rfid
    if (permission) updates.permission = permission
    return User.findOneAndUpdate({email}, updates)
}

export {userFindOrCreate, getUserByRfid, updateUser}