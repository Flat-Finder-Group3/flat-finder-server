const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');

async function addMessage(req, res){
    const message = req.body

    const response = await supabase.from('message').insert(message)

    redisCaching.removeData(`messages:${req.body.conversation_id}`)

    res.status(200).json(response)
}

async function getMessage(req, res){
    const conversationID = req.body.id

    const messages = await redisCaching.getOrSetCache(`messages:${conversationID}`, async () => {

        return await supabase.from('message').select().eq('conversation_id', conversationID)
    })

    res.status(200).json(messages)
}

module.exports = {
    addMessage, getMessage
}