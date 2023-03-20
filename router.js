const express = require('express')

const router = express.Router()

const usr_controller = require('./controllers/userController')
const listing_controller = require('./controllers/listingController')
router.get('/', (req, res) => {
    res.send('Hello World!')
})

// router.post('/login')
// router.post('/register', usr_controller.register)
// router.get('/user/:token', usr_controller.getUserFromToken)
// router.get('/listing', listing_controller.getListing)
// router.get('/avatar', usr_controller.getAvatarURL)

module.exports = router