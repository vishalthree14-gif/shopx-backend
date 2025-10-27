const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{ model: User, key: 'id' },
    },

    product_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {model: Product, key: 'id' },
    },

    quantity:{
        type: DataTypes.BIGINT,
        defaultValue: 1,
    }

    },{

        tableName: 'carts',
        timestamps: true,
    });

User.hasMany(Cart, {foreignKey: 'user_id'});
Cart.belongsTo(User, {foreignKey: 'user_id'});

Product.hasMany(Cart, {foreignKey: 'product_id'});
Cart.belongsTo(Product, {foreignKey: 'product_id'});

module.exports = Cart;