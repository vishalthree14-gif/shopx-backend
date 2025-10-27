const { DataTypes } = require('sequelize')
const sequelize = require("../db")

const Product = sequelize.define('Product',{ 
    
    id: {
        
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    
    product_name: {
        
        type: DataTypes.STRING,
        allowNull: false
    },

    product_details: {
        
        type: DataTypes.TEXT,
        allowNull: false
    },

    product_price:{

        type: DataTypes.DECIMAL(10, 2),
        allowNull:false
    },
    
    product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    },


    {
        tableName : "products",
        timestamps : true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

module.exports = Product;