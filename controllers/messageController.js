const supabase = require("../supabaseClient.js");
const redisCaching = require("../redisCaching.js");

async function addMessage(req, res) {
  const message = req.body;

  const response = await supabase.from("message").insert(message).select();

  redisCaching.removeData(`messages:${req.body.conversation_id}`);

  res.status(200).json(response);
}

async function getConversationMessages(req, res) {
  const conversation_id = req.query.conversation_id;

  const { data, error } = await supabase
    .from("message")
    .select()
    .eq("conversation_id", conversation_id);

  if (error) res.json(error);
  else res.json(data);
}

async function readMessage(req, res) {

  console.log("here is the body: ", req.body)
  const {data, error} = await supabase.from('message').update({ is_read: true }).eq('id', req.body.message_id).select();


  redisCaching.removeData(`messages:${req.body.conversation_id}`);

  if (error) res.json(error)
  else res.json(data)
}

async function readUserMessage(req, res) {
  const sender_id = req.body.sender_id
  const conversaton_id = req.body.conversation_id

  console.log("here is the body: ", req.body)

  const {data, error} = await supabase.from('message').update({ is_read: true })
                                                      .eq('conversation_id', conversaton_id)
                                                      .eq('sender_id', sender_id)
                                                      .select();

  redisCaching.removeData(`message:${conversaton_id}`)

  if (error) res.json(error)
  else res.json(data)
}

module.exports = {
  addMessage,
  getConversationMessages,
  readMessage,
  readUserMessage,
};
