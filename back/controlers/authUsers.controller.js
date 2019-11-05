const UserModel = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  signupUser,
  loginUser
}

function signupUser (req, res) {
  const hashedPwd = bcrypt.hashSync(req.body.user_password, 10)
  const userBody = {
    name: req.body.user_name,
    email: req.body.user_email,
    password: hashedPwd
  }
  UserModel
    .create(userBody)
    .then((newUser) => {
      const userData = { username: req.body.user_name, email: req.body.user_email, _id: newUser._id }

      const token = jwt.sign(
        userData,
        'secret', // TODO SECRET MORE SECRET PLEASE
        { expiresIn: '1w' }
      )

      return res.json({ token: token, ...userData })
    })
    .catch((err) => {
      res.status(403).json({ error: err })
    })
}

function loginUser (req, res) {
  UserModel
    .findOne({ email: req.body.user_email })
    .then(user => {
      if (!user) { return res.json({ error: 'wrong email' }) }

      bcrypt.compare(req.body.user_password, user.password, (err, result) => {
        if (!result) { return res.status(500).json({ error: `wrong password for ${req.body.user_email}` }) }
        if (err) { return res.status(500).json({ error: `error ${err}` }) }

        const userData = { username: user.name, email: user.email, _id: user._id }

        const token = jwt.sign(
          userData,
          'secret', // TODO SECRET MORE SECRET PLEASE
          { expiresIn: '1h' }
        )

        return res.json({ token: token, ...userData })
      })
    })
    .catch(err => handdleError(err, res))
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
