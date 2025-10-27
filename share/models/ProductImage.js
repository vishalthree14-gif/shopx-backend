const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage',{

    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    productUrl1:{
        type: DataTypes.STRING,
        allowNull: false
    },

    productUrl2:{
        type: DataTypes.STRING,
        allowNull: true
    },

    productUrl3:{
        type: DataTypes.STRING,
        allowNull: true
    },

    productId:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: Product,
            key:'id'
        },
        onDelete: 'CASCADE'
    }
    },
    {
        tableName: "productImage",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
});


// Associations
ProductImage.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(ProductImage, { foreignKey: 'productId' });

module.exports = ProductImage;
