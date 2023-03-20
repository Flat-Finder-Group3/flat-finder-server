const supabase = require('../supabaseClient.js')


async function getListing(req, res) {

  const response = await supabase
    .from('listing')
    .select(`
      *,
      owner (
       * 
      )
    `).eq('id', '1') 

  console.log('Response: ', response)
  res.status(201).json(response)
}


module.exports = {
  getListing
}