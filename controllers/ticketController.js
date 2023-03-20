const supabase = require('../supabaseClient.js')

async function addTicket(req, res) {
    const ticket = req.body

    console.log(ticket)

    const response = await supabase.from('ticket').insert(ticket)

    res.status(200).json(response)

}

module.exports = {
    addTicket
}