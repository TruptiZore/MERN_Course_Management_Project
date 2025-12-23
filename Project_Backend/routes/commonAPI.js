const express = require("express")
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

const pool = require("../db/pool")
const result = require("../utils/result")
const config = require("../utils/config")

const router = express.Router()


// sign-up
router.post("/auth/signup", (request, response) => {
  const { email, password, role } = request.body

  // encrypt password
  const encryptedPassword = cryptojs.SHA256(password).toString()

  const sql = `
    INSERT INTO users (email, password, role)
    VALUES (?, ?, ?)
  `

  pool.query(
    sql,
    [email, encryptedPassword, role || "User"],
    (error, data) => {
      response.send(result.createResult(error, data))
    }
  )
})

// LOGIN
router.post("/auth/login", (request, response) => {
  const { email, password } = request.body
  const encryptedPassword = cryptojs.SHA256(password).toString()

  const sql = `SELECT * FROM users WHERE email=? AND password=?`
  pool.query(sql, [email, encryptedPassword], (error, data) => {
    if (error)
      response.send(result.createResult(error))
    else if (data.length === 0)
      response.send(result.createResult("Invalid credentials"))
    else {
      const payload = {
        email: data[0].email,
        role: data[0].role
      }
      const token = jwt.sign(payload, config.SECRET)
      response.send(result.createResult(null, { token }))
    }
  })
})

// GET ACTIVE COURSES
router.get("/course/all-active-courses", (request, response) => {
  pool.query(
    `SELECT * FROM courses WHERE end_date >= CURDATE()`,
    (error, data) => response.send(result.createResult(error, data))
  )
})

module.exports = router
