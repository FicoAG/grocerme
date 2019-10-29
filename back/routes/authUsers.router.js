const router = require('express').Router()

const {
  loginUser,
  signupUser
} = require('../controlers/authUsers.controller')

router.post('/signup', signupUser)
router.post('/login', loginUser)

module.exports = router
