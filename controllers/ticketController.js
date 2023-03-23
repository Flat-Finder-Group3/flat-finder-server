const supabase = require('../supabaseClient.js')

async function addTicket(req, res) {
    const ticket = req.body

    // console.log(ticket)

    const response = await supabase.from('ticket').insert(ticket)

    res.status(200).json(response)
}

async function deleteTicket(req, res) {
    const ticketID = req.body.ticketID

    const response = await supabase.from('ticket').delete().eq('id', ticketID)

    res.status(200).json(response)
}

async function getUserTicket(req, res) {

    const response = await supabase
                            .from('ticket')
                            .select()
                            .eq('creator', req.query.user_id)

    res.status(200).json(response)
}

async function changeStatus(req, res) {
    const ticketID = req.body.ticketID
    const newStatus = req.body.newStatus

    const response = await supabase.from('ticket').update({ status: newStatus }).eq('id', ticketID)

    res.status(200).json(response)
}

module.exports = {
    addTicket,
    getUserTicket,
    changeStatus,
    deleteTicket
}