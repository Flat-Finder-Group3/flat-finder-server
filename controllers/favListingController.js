const supabase = require('../supabaseClient.js')

async function addFavListing(req, res) {

    const result = await supabase
        .from('favourite_listing')
        .insert({
            user: req.body.user_id,
            listing: req.body.listing_id
        }).select("listing (*, owner (*))")


    res.status(200).json(result)
}

async function getFavListings(req, res) {

    // http://localhost:3001/favlisting?user_id=1

    const result = await supabase  
        .from('favourite_listing')
        .select("*, listing(*, owner(*))")
        .eq('user', req.query.user_id)

    res.status(200).json(result)
    
}

async function removeFavListing(req, res) {

    const result = await supabase
        .from('favourite_listing')
        .delete()
        .eq('user', req.body.user_id)
        .eq('listing', req.body.listing_id)

    res.status(200).json(result)
}

module.exports = {
    addFavListing, getFavListings, removeFavListing
}