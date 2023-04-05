const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');

async function addMessage(req, res){
    const message = req.body

    const response = await supabase.from('message').insert(message)

    redisCaching.removeData(`messages:${req.body.conversation_id}`)

    res.status(200).json(response)
}


async function getConversationMessages(req, res){
    const conversation_id = req.query.conversation_id

    const {data, error} = await supabase.from('message').select().eq('conversation_id', conversation_id)

    if (error) res.json(error)
    else res.json(data)
}

async function readMessage(req, res) {

    const messages = await redisCaching.getOrSetCache(`messages:${conversationID}`, async () => {

        return await supabase.from('message').select().eq('conversation_id', conversationID)
    })

    res.status(200).json(messages)
}

module.exports = {
    addMessage, getConversationMessages, readMessage
}