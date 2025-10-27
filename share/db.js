const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // shopping_db
  process.env.DB_USER,      // postgres
  process.env.DB_PASSWORD,  // your password
  {
    host: process.env.DB_HOST,  // localhost
    dialect: 'postgres',        // ← use postgres here
    port: process.env.DB_PORT,  // usually 5432
    logging: false,
  }
);
console.log(process.env.DB_NAME)
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);


async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('db connected!');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
}

connectDB();

module.exports = sequelize;
