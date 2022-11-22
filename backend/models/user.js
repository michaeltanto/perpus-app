  'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    NIM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};