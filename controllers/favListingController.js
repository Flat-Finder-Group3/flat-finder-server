const supabase = require('../supabaseClient.js')
const redisCaching = require('../redisCaching.js');

async function addFavListing(req, res) {

    const result = await supabase
        .from('favourite_listing')
        .insert({
            user: req.body.user_id,
            listing: req.body.listing_id
        }).select("listing (*, owner (*))")

    await redisCaching.removeData(`favourite_listings:${req.body.user_id}`)

    res.status(200).json(result)
}

async function getFavListings(req, res) {

    // http://localhost:3001/favlisting?user_id=1
    const usrID = req.query.user_id

    const favListings = await redisCaching.getOrSetCache(`favourite_listings:${usrID}`, async () => {

        return await supabase  
            .from('favourite_listing')
            .select("*, listing(*, owner(*))")
            .eq('user', usrID)
    })

    res.status(200).json(favListings)
    
}

async function removeFavListing(req, res) {

    const result = await supabase
        .from('favourite_listing')
        .delete()
        .eq('user', req.body.user_id)
        .eq('listing', req.body.listing_id)

    await redisCaching.removeData(`favourite_listings:${req.body.user_id}`)

    res.status(200).json(result)
}

module.exports = {
    addFavListing, getFavListings, removeFavListing
}