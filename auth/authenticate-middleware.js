/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = "it is secret"
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "wrong token" })
      } else {
        req.jwt = decodedToken
      }
      next()
    })
  } else {
    res.status(401).json({ you: "no token!" })
  }
};
