const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = require('./User');

const Order = sequelize.define('Order',{

    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    user_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {model: User, key: 'id'},
    },
    total_amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending',
    }
},{

    tableName: 'orders',
    timestamps:true,

});

User.hasMany(Order, {foreignKey:'user_id'})
Order.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Order;