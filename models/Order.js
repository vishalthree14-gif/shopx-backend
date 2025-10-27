const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: { model: User, key: 'id' },
  },

  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'razorpay', // or cod
  },

  razorpay_order_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  razorpay_payment_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM('pending', 'paid', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

// Relations
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;



// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const User = require('./User');

// const Order = sequelize.define('Order',{

//     id:{
//         type: DataTypes.BIGINT,
//         primaryKey: true,
//         autoIncrement: true,
//     },

//     user_id:{
//         type: DataTypes.BIGINT,
//         allowNull: false,
//         references: {model: User, key: 'id'},
//     },
//     total_amount:{
//         type: DataTypes.FLOAT,
//         allowNull: false,
//     },
//     status:{
//         type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
//         defaultValue: 'pending',
//     }
// },{

//     tableName: 'orders',
//     timestamps:true,

// });

// User.hasMany(Order, {foreignKey:'user_id'})
// Order.belongsTo(User, { foreignKey: 'user_id' });


// module.exports = Order;