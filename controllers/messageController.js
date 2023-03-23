const supabase = require('../supabaseClient.js')

async function addMessage(req, res){
    const message = req.body

    const response = await supabase.from('message').insert(message)

    res.status(200).json(response)
}

async function getMessage(req, res){
    const conversationID = req.body.id

    const response = await supabase.from('message').select().eq('conversation_id', conversationID)

    res.status(200).json(response)
}

module.exports = {
    addMessage, getMessage
}