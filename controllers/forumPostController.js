const supabase = require('../supabaseClient.js')


async function getForumPosts(req, res) {

    const result = await supabase  
                        .from('forum_post')
                        .select("*, forum(*), author(*)")
                        .eq('forum', req.query.forum_id)

    res.status(200).json(result)
}


async function addForumPost(req, res) {
    const forumPost = req.body

    const result = await supabase
                    .from('forum_post')
                    .insert(forumPost).select("*, author ( * )")


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