const express = require('express')
const router = require('./router.js')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Listening!!`)
})