const supabase = require('../supabaseClient.js')


async function getForumPosts(req, res) {

    const result = await supabase  
                        .from('forum_post')
                        .select("*, forum(*)")
                        .eq('forum', req.query.forum_id)

    res.status(200).json(result)
}


async function addForumPost(req, res) {
    const result = await supabase
                    .from('forum_post')
                    .insert({
                        author: req.body.user_id,
                        content: req.body.content,
                        forum: req.body.forum_id
                    })


    res.status(200).json(result)
}

async function removeForumPost(req, res) {
    
    const result = await supabase
        .from('forum_post')
        .delete()
        .eq('id', req.body.forum_post_id)

    res.status(200).json(result)
}

module.exports = {
    getForumPosts, addForumPost, removeForumPost
}