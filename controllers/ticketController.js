const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');

async function addTicket(req, res) {
    const ticket = req.body
    const response = await supabase.from('ticket').insert(ticket).select()

    redisCaching.removeData(`tickets:${req.body.creator}`)

    res.status(200).json(response)
}

async function deleteTicket(req, res) {
    const ticketID = req.body.ticketID

    const response = await supabase.from('ticket').delete().eq('id', ticketID).select('creator')
    redisCaching.removeData(`tickets:${response.data[0].creator}`)

    res.status(200).json(response)
}

async function getUserTicket(req, res) {

    const tickets = await redisCaching.getOrSetCache(`tickets:${req.query.user_id}`, async () => {

        return await supabase
            .from('ticket')
            .select()
            .eq('creator', req.query.user_id)
    })

    res.status(200).json(tickets)
}

async function changeStatus(req, res) {
    const ticketID = req.body.ticketID
    const newStatus = req.body.newStatus

    const response = await supabase
        .from('ticket')
        .update({ status: newStatus })
        .eq('id', ticketID)
        .select('creator')

    redisCaching.removeData(`tickets:${response.data[0].creator}`)


    res.status(200).json(response)
}

module.exports = {
    addTicket,
    getUserTicket,
    changeStatus,
    deleteTicket
}