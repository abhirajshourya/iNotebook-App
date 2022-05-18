const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

//Middleware for CORS
app.use(cors())
//Middleware for JSON
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})