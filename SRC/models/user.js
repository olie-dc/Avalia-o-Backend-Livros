const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const User = connection.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User;
