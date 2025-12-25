const express = require('express')
const authUser = require('./utils/auth')

const commonAPI = require('./routes/commonAPI')
const admin = require('./routes/admin')
const student = require('./routes/student')

const app = express()
app.use(express.json())

app.use(authUser)

app.use(commonAPI)
app.use(admin)
app.use(student)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
