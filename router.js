const express = require('express')

const router = express.Router()

const usr_controller = require('./controllers/userController')
const listing_controller = require('./controllers/listingController')

const ticket_controller = require('./controllers/ticketController')

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

module.exports = router