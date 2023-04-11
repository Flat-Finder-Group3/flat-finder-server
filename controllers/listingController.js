const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');


async function getListings(req, res) {

    const listings = await redisCaching.getOrSetCache("listings", async () => {

        const { data, error } = await supabase
            .from('listing')
            .select("*, owner( * )")

        if (error) {
            res.json(error)
        }

        return data
    })
    
    res.status(200).json(listings)
}

async function addListing(req, res) {
    const listing = req.body
    const response = await supabase.from('listing').insert(listing).select("*, owner ( * ) ")
    const listingID = response.data[0].id

    if (response) {
        const response2 = await supabase.from('forum').insert({ listing: listingID }).select()
        const forumID = response2.data[0].id

        if (response2) {
            const response3 = await supabase.from('listing').update({ forum: forumID }).eq('id', listingID).select()
            
            redisCaching.removeData("listings")
            redisCaching.removeData(`listings:${req.body.owner}`)
            
            res.status(200).json(response3)
        }
    }
}

async function deleteListing(req, res) {
    const listingID = req.body.listing_id
    const response = await supabase
        .from('listing')
        .delete()
        .eq("id", listingID)
        .select('forum, owner')

    // clear cache of everything related to that listing
    // TODO: keep track of who has favourited this listing so we only clear cache for those users' favourite listing
   
    redisCaching.removeData("listings")
    redisCaching.removeData(`forum_posts:${response.data[0].forum}`)
    redisCaching.removeMatchingData(`favourite_listings:*`)
    redisCaching.removeData(`listings:${response.data[0].owner}`)

    res.status(200).json(response)
}

async function getOwnListing(req, res) {
    // const user_id = req.body.user_id
    const user_id = req.query.user_id

    const ownListings = await redisCaching.getOrSetCache(`listings:${user_id}`, async () => {
        return await supabase
            .from('listing')
            .select('*, owner ( * )  ')
            .eq('owner', user_id);
    })
    
    res.status(200).json(ownListings)
}


module.exports = {
    getListings,
    addListing,
    deleteListing,
    getOwnListing
}