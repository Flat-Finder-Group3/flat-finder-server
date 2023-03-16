const express = require('express')

const router = express.Router()

const usr_controller = require('./controllers/userController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

// router.post('/login')
router.post('/register', usr_controller.register)

module.exports = router