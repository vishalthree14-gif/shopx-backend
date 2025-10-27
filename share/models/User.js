const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Role = require('./Role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id:{
    type: DataTypes.BIGINT,
    allowNull: false,
    references:{
      model: Role,
      key: 'id'
    }
  }
}, 

{
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(User, {foreignKey: "role_id"});

module.exports = User;

