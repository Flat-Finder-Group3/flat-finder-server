const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');

async function addConversation(req, res){
    const conversation = req.body

    const {response, error} = await supabase
        .from('conversation')
        .insert(conversation)

    if (error) {
        res.json(error)
    } else {

        res.status(200).json(response)

    }
}

module.exports = {
    addConversation,
}