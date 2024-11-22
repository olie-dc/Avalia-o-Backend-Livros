const express = require('express')
const { register, login } = require('../controllers/authController')
const checkSession = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/dashboard', checkSession, (req, res) => {
  res.render('dashboard')
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao sair' })
    }
    res.redirect('/login')
  })
})

module.exports = router
