import Terminal from "../models/terminal.js"

let addTerminal = async function (machine_name, permission) {
    let terminal = new Terminal({
        machine_name,
        permission
    })

    return await terminal.save()
}

let deleteTerminal = async function (terminal_id) {
    return Terminal.findByIdAndDelete(terminal_id).catch((err) => (null))
}

let bindTerminal = async (terminal_id, machine_name) => {
    return Terminal.findByIdAndUpdate(terminal_id, { machine_name }).catch(() => (null))
}

let setPermission = async (terminal_id, permission) => {
    return Terminal.findByIdAndUpdate(terminal_id, { permission }).catch(() => (null))
}

let getAllTerminals = () => {
    return Terminal.find({})
}

let getTerminal = async (id) => {
    return Terminal.findById(id).catch(() => (null))
}

export { addTerminal, deleteTerminal, bindTerminal, getAllTerminals, getTerminal, setPermission }