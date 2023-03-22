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
  const { data, error } = await supabase
                                  .from('listing')
                                  .select("*, owner( * )")
                                  
  if (error) {
    res.json(error)
  }
  res.status(200).json(data)
}

async function addListing(req, res) {
  const listing = req.body
  const response = await supabase.from('listing').insert(listing)
  res.status(200).json(response)
}


module.exports = {
  getListings,
  addListing
}