const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Meat = sequelize.define('Meat', {
  meat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'meat', // Your MySQL table name
  timestamps: false  // Disable createdAt/updatedAt
});

module.exports = Meat;
