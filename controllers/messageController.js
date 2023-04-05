const supabase = require('../supabaseClient.js')

async function addMessage(req, res){
    const message = req.body

    const response = await supabase.from('message').insert(message).select()

    res.status(200).json(response)
}


async function getConversationMessages(req, res){
    const conversation_id = req.query.conversation_id

    const {data, error} = await supabase.from('message').select().eq('conversation_id', conversation_id)

    if (error) res.json(error)
    else res.json(data)
}

async function readMessage(req, res) {

    const {data, error} = await supabase.from('message').update({ is_read: true }).eq('id', req.body.message_id).select();

    if (error) res.json(error)
    else res.json(data)
}

module.exports = {
    addMessage, getConversationMessages, readMessage
}