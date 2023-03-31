const supabase = require('../supabaseClient.js')

async function addTicket(req, res) {
    const ticket = req.body
    const response = await supabase.from('ticket').insert(ticket).select()
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


async function getTickets(req, res) {

    const {data, error} = await supabase
                            .from('ticket')
                            .select('*, creator(*)')

    if (error) res.json(error)
    else res.json(data)
}


async function changeStatus(req, res) {
    const ticketID = req.body.ticketID
    const newStatus = req.body.newStatus
    const comment = req.body.comment

    const response = await supabase.from('ticket').update({ status: newStatus, comment }).eq('id', ticketID)

    res.status(200).json(response)
}

module.exports = {
    addTicket,
    getUserTicket,
    changeStatus,
    getTickets,
    deleteTicket
}