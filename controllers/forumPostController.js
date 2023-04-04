const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');


async function getForumPosts(req, res) {

    const forumPosts = await redisCaching.getOrSetCache(`forum_posts:${req.query.forum_id}`, async () => {
        return await supabase  
                        .from('forum_post')
                        .select("*, forum(*), author(*)")
                        .eq('forum', req.query.forum_id)
    })

    res.status(200).json(forumPosts)
}


async function addForumPost(req, res) {
    const forumPost = req.body

    const result = await supabase
                    .from('forum_post')
                    .insert(forumPost).select("*, author ( * )")

    redisCaching.removeData(`forum_posts:${req.body.forum}`)

    res.status(200).json(result)
}

async function removeForumPost(req, res) {
    
    const result = await supabase
        .from('forum_post')
        .delete()
        .eq('id', req.body.forum_post_id)
        .select('forum')

    redisCaching.removeData(`forum_posts:${result.data[0].forum}`)

    res.status(200).json(result)
}

module.exports = {
    getForumPosts, addForumPost, removeForumPost
}