const supabase = require('../supabaseClient.js')

// async function getListing(req, res) {

//   const response = await supabase
//     .from('listing')
//     .select(`
//       *,
//       owner (
//        * 
//       )
//     `).eq('id', '1') 

//   console.log('Response: ', response)
//   res.status(201).json(response)
// }

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

    // console.log(listings)

    res.status(200).json(listings)
}

async function addListing(req, res) {
    const listing = req.body
    const response = await supabase.from('listing').insert(listing).select()
    const listingID = response.data[0].id

    if (response) {
        const response2 = await supabase.from('forum').insert({ listing: listingID }).select()
        const forumID = response2.data[0].id

        if (response2) {
            const response3 = await supabase.from('listing').update({ forum: forumID }).eq('id', listingID).select()
            res.status(200).json(response3)
            // console.log(response3)
        }
        // console.log(response2)
    }
}

async function deleteListing(req, res) {
    const listingID = req.body.listing_id
    const response = await supabase.from('listing').delete().eq("id", listingID)
    res.status(200).json(response)
}

async function getOwnListing(req, res) {
    // const user_id = req.body.user_id
    const user_id = req.query.user_id

    const ownListings = await redisCaching.getOrSetCache(`listings:${user_id}`, async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*')
            .eq('owner', user_id);
        
        if (error) {
            res.json(error)
        }

        return data
    })
    
    res.status(200).json(ownListings)
}


module.exports = {
    getListings,
    addListing,
    deleteListing,
    getOwnListing
}