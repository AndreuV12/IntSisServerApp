import Machine from "../models/machine.js"

let addMachine = (name, description) => {
    let machine = new Machine({
        name,
        description
    })
    return machine.save().catch((err) => { null })
}

let getMachine = (name) => {
    return Machine.findOne({ name })
}

let getAllMachines = () => {
    return Machine.find({})
}

let deleteMachine = (name) => {
    return Machine.findOneAndDelete({ name })
}
export { addMachine, getMachine, getAllMachines, deleteMachine }