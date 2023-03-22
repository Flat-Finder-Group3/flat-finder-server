const supabase = require('../supabaseClient.js')

async function addForum(req, res) {
    const forum = req.body

    const response = await supabase.from('forum').insert(forum).select('id')
    const forumID = response.data[0].id
    const listingID = req.body.listing
    if(response){
        const res2 = await supabase.from('listing').update({forum: forumID}).eq('id', listingID)
    }

    res.status(200).json(response)
}

module.exports = {
    addForum,
}