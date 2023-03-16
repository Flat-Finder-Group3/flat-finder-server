
const express = require('express')

const router = require('./router.js')

const app = express()

app.use(router)

app.listen(3000, () => {
  console.log(`Listening on http://127.0.0.1:3000`)
})