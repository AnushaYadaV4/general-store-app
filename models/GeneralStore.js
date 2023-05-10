const Sequelize = require('sequelize');
const sequelize = require('../helper/database');
const GeneralStore = sequelize.define('generalstore',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    itemName: Sequelize.STRING,
    description: {
      type: Sequelize.STRING,
      unique: false,
    },
    price: {
      type: Sequelize.STRING,
      unique: false,
    },
    quantity:{
        type: Sequelize.INTEGER,
        unique: false,

    }
  });

module.exports = GeneralStore;