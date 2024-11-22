const express = require('express')
const router = express.Router()

function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login')
  }
  next()
}

router.get('/profile', isAuthenticated, (req, res) => {
  const userId = req.session.userId
  res.render('profile', { userId })
})

router.get('/profile/edit', isAuthenticated, (req, res) => {
  res.render('editProfile')
})

module.exports = router
