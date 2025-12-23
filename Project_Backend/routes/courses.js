const express = require("express")
const pool = require("../db/pool")
const result = require("../utils/result")
const router = express.Router()

// GET ALL COURSES
router.get("/course/all-courses", (request, response) => {
  const { startDate, endDate } = request.query
  pool.query(
    `SELECT * FROM courses WHERE start_date BETWEEN ? AND ?`,
    [startDate, endDate],
    (error, data) => response.send(result.createResult(error, data))
  )
})

// ADD COURSE
router.post("/course/add", (request, response) => {
  const { courseName, description, fees, startDate, endDate, videoExpireDays } =
    request.body

  pool.query(
    `INSERT INTO courses VALUES (NULL,?,?,?,?,?,?)`,
    [courseName, description, fees, startDate, endDate, videoExpireDays],
    (error, data) => response.send(result.createResult(error, data))
  )
})

// UPDATE COURSE
router.put("/course/update/:courseId", (request, response) => {
  const { courseId } = request.params
  const { courseName, description, fees, startDate, endDate, videoExpireDays } =
    request.body

  pool.query(
    `UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE course_id=?`,
    [courseName, description, fees, startDate, endDate, videoExpireDays, courseId],
    (error, data) => response.send(result.createResult(error, data))
  )
})

// DELETE COURSE
router.delete("/course/delete/:courseId", (request, response) => {
  pool.query(
    `DELETE FROM courses WHERE course_id=?`,
    [request.params.courseId],
    (error, data) => response.send(result.createResult(error, data))
  )
})

module.exports = router