const express = require('express')
const router = require('./router.js')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3001, () => {
  console.log(`Listening on http://127.0.0.1:3001`)
})