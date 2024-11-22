const User = require('../models/user')

// Função de registro
const register = async (req, res) => {
  const { username, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { username } })

    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe!' })
    }

    const newUser = await User.create({ username, password })

    return res
      .status(201)
      .json({ message: 'Usuário registrado com sucesso!', user: newUser })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Erro interno ao registrar usuário!' })
  }
}

// Função de login
const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' })
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Senha inválida!' })
    }

    req.session.userId = user.id

    return res.redirect('/books')
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao tentar fazer login!' })
  }
}

// authController.js

// Para a página de login
exports.loginPage = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/books') // Se o usuário já estiver logado, redireciona para a página principal de livros
  }
  res.render('login', { isLoginPage: true }) // Passa 'isLoginPage: true' para a página de login
}

// Para a página de registro
exports.registerPage = (req, res) => {
  res.render('register', { isLoginPage: true }) // Passa 'isLoginPage: true' para a página de registro
}

module.exports = { register, login }
