const express = require('express')

const router = express.Router()

const usr_controller = require('./controllers/userController')
const listing_controller = require('./controllers/listingController')
const ticket_controller = require('./controllers/ticketController')
const fav_listing_controller = require('./controllers/favListingController')
const forum_post_controller = require('./controllers/forumPostController')
const forum_controller = require('./controllers/forumController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

// router.post('/login')
// router.post('/register', usr_controller.register)
// router.get('/user/:token', usr_controller.getUserFromToken)
// router.get('/listing', listing_controller.getListing)
// router.get('/avatar', usr_controller.getAvatarURL)
router.post('/ticket', ticket_controller.addTicket)
router.get('/ticket', ticket_controller.getUserTicket)
router.put('/ticket', ticket_controller.changeStatus)
router.delete('/ticket', ticket_controller.deleteTicket)

router.get('/listing', listing_controller.getListings)
router.post('/listing', listing_controller.addListing)

router.post('/favlisting', fav_listing_controller.addFavListing)
router.delete('/favlisting', fav_listing_controller.removeFavListing)
router.get('/favlisting', fav_listing_controller.getFavListings)

router.post('/forum-post', forum_post_controller.addForumPost)
router.delete('/forum-post', forum_post_controller.removeForumPost)
router.get('/forum-post', forum_post_controller.getForumPosts)

router.post('/forum', forum_controller.addForum)

module.exports = router