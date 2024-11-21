const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

const connection = require('./db/connection')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('src/public'))

connection
  .sync({ alter: true })
  //.sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
