const supabase = require('../supabaseClient.js')

async function addFavListing(req, res) {

    const result = await supabase
        .from('favourite_listing')
        .insert({
            user: req.body.user_id,
            listing: req.body.listing_id
        })


    res.status(200).json(result)
}

async function getFavListings() {
    
}

async function removeFavListing(req, res) {

    const result = await supabase
        .from('favourite_listing')
        .delete()
        .eq('user', req.body.user_id)
        .eq('listing', req.body.listing_id)

    console.log(result)

    res.status(200).json(result)
}

module.exports = {
    addFavListing, getFavListings, removeFavListing
}
