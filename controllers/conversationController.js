const supabase = require('../supabaseClient.js')

async function addConversation(req, res){
    const conversation = req.body

    const response = await supabase.from('conversation').insert(conversation)

    res.status(200).json(response)

}

module.exports = {
    addConversation,
}