const express = require('express')
const authUser = require('./utils/auth')

const {authUser} = require('./utils/auth')
const commonAPI = require('./routes/commonAPI')
const videos = require('./routes/videos')

const courses = require('./routes/courses')
const student = require('./routes/student')

const app = express()

app.use(express.json())
app.use(authUser)
app.use(commonAPI)

app.use(videos)
app.use(courses)
app.use(student)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
