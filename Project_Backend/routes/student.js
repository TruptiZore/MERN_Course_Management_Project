const express = require("express")
const cryptojs = require("crypto-js")
const pool = require("../db/pool")
const result = require("../utils/result")
const auth = require("../utils/auth")

const router = express.Router()


//REGISTER TO COURSE
router.post("/student/register-to-course", (request, response) => {
  const { courseId, email, name, mobileNo } = request.body
  const sql = `INSERT INTO students (course_id, email, name, mobile_no) VALUES (?, ?, ?, ?)`
  pool.query(sql, [courseId, email, name, mobileNo], (error, data) => {
      response.send(result.createResult(error, data))
  })
})


//CHANGE PASSWORD
router.put("/student/change-password", (request, response) => {
  const { newPassword, confirmPassword } = request.body

  if (newPassword !== confirmPassword) {
    return response.send ( result.createResult("Passwords do not match"))
  }

  const encryptedPassword = cryptojs.SHA256(newPassword).toString()
  const sql = `UPDATE users SET password = ? WHERE email = ?`
  pool.query( sql, [encryptedPassword, request.user.email], (error, data) => {
      response.send(result.createResult(error, data))
  })
})


//MY COURSES
router.get("/student/my-courses", (request, response) => {
  const sql = `SELECT c.* FROM courses c JOIN students s ON c.course_id = s.course_id WHERE s.email = ?`
  pool.query( sql, [request.user.email], (error, data) => {
      response.send(result.createResult(error, data))
  })
})


//MY COURSE WITH VIDEOS 
router.get("/student/my-course-with-videos",(request, response) => {
  const sql = `SELECT c.course_id,c.course_name,v.video_id,v.title,v.youtube_url,v.description FROM students s
    JOIN courses c ON s.course_id = c.course_id
    JOIN videos v ON c.course_id = v.course_id
    WHERE s.email = ? AND DATE_ADD(v.added_at, INTERVAL c.video_expire_days DAY) >= CURDATE()`
  pool.query( sql, [request.user.email], (error, data) => {
      response.send(result.createResult(error, data))
  })
})

module.exports = router
