const express = require("express")
const pool = require("../db/pool")
const result = require("../utils/result")

const router = express.Router()
const { checkAuthorization } = require("../utils/auth");

//ALL VIDEOS
router.get("/video/all-videos/:courseId", (request, response) => {
  const { courseId } = request.params
  const sql = `SELECT * FROM videos WHERE course_id = ?`
  pool.query(sql, [courseId], (error, data) => {
    response.send(result.createResult(error, data))
  })
})


//ADD VIDEO 
router.post("/video/add",checkAuthorization, (request, response) => {
  const { courseId, title, youtubeURL, description } = request.body
  const sql = `INSERT INTO videos (course_id, title, description, youtube_url, added_at) VALUES (?, ?, ?, ?, CURDATE())`
  pool.query(sql, [courseId, title, description, youtubeURL], (error, data) => {
      response.send(result.createResult(error, data))
    })
})


//UPDATE VIDEO
router.put("/video/update/:videoId",checkAuthorization, (request, response) => {
  const { videoId } = request.params
  const { courseId, title, youtubeURL, description } = request.body
  const sql = `UPDATE videos SET course_id = ?, title = ?, description = ?, youtube_url = ? WHERE video_id = ?`
  pool.query( sql, [courseId, title, description, youtubeURL, videoId], (error, data) => {
      response.send(result.createResult(error, data))
    })
})


//DELETE VIDEO
router.delete("/video/delete/:videoId", checkAuthorization,(request, response) => {
  const { videoId } = request.params
  const sql = `DELETE FROM videos WHERE video_id = ?`
  pool.query(sql, [videoId], (error, data) => {
    response.send(result.createResult(error, data))
  })
})


//ENROLLED STUDENTS
router.get("/admin/enrolled-students", checkAuthorization,(request, response) => {
  const { courseId } = request.query
  const sql = `SELECT s.reg_no,s.name,s.email,s.mobile_no,c.course_name FROM students s JOIN courses c ON s.course_id = c.course_id WHERE s.course_id = ?`
  pool.query(sql, [courseId], (error, data) => {
    response.send(result.createResult(error, data))
  })
})

module.exports = router
