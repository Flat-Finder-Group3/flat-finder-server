const supabase = require('../supabaseClient.js')

async function addConversation(req, res){
    const conversation = req.body

    const response = await supabase.from('conversation').insert(conversation)

    res.status(200).json(response)

}

async function getConversation(req, res) {
    const { user1, user2 } = req.query;
    console.log({ user1, user2 });
  
    const [result1, result2] = await Promise.all([
    supabase
      .from("conversation")
      .select("*")
      .eq("user1", user1)
      .eq("user2", user2),
      supabase
      .from("conversation")
      .select("*")
      .eq("user1", user2)
      .eq("user2", user1)
    ])

    if (result1.data.length >= result2.data.length){
      res.json(result1.data[0]);
    } else {
      res.json(result2.data[0])
    }
  }
  

// async function getConversation(req, res) {

//     const response = await supabase
//                             .from('ticket')
//                             .select()
//                             .eq('creator', req.query.user_id)

//     res.status(200).json(response)
// }

module.exports = {
    addConversation,
    getConversation
}