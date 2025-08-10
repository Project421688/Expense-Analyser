const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Egg = sequelize.define('Egg', {
  egg_id: {
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
  rate_per_plate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  no_of_plate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'eggs', // Your MySQL table name
  timestamps: false  // Disable createdAt/updatedAt
});

module.exports = Egg;
