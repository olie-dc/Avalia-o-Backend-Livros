const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./user')

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

Book.belongsTo(User)

Book.sync()
  .then(() => {
    console.log('Tabela Book criada ou já existente!')
  })
  .catch((err) => {
    console.log('Erro ao sincronizar a tabela Book:', err)
  })

module.exports = Book
