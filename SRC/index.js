const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const connection = require('./db/connection')

const app = express()

app.use(
  session({
    secret: '12153610',
    resave: false,
    saveUninitialized: false
  })
)

const hbs = exphbs.create()
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.set('views', path.join(__dirname, 'views'))

app.use(express.static('src/public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(authRoutes)
app.use(userRoutes)

app.get('/login', (req, res) => {
  res.render('login/login')
})

app.get('/register', (req, res) => {
  res.render('login/register')
})

app.get('/books', (req, res) => {
  console.log('Renderizando livros')
  res.render('livros/books-list')
})

connection
  .authenticate()
  .then(() => {
    console.log('Conectado ao MySQL!')
    return connection.sync({ alter: true })
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000')
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err)
  })
