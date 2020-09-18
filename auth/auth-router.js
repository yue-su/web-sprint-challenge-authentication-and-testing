const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require("./auth-model")

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body

  if (isValid(credentials)) {
    const rounds = 8
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash

    Users.add(credentials)
      .then((user) => {
        const token = makeJwt(user)
        res.status(201).json({ data: user, token })
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: "please provide username and password",
    })
  }

});

router.post('/login', (req, res) => {
  // implement login
});


function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  )
}

function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const secret = "it is secret"
  const options = {
    expiresIn: "1h",
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
