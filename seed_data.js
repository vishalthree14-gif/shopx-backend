// seed roles

// seedRoles.js
const { Sequelize } = require('sequelize');
const Role = require('./models/Role'); // adjust the path if needed
const sequelize = require('./db'); // your existing db.js connection

(async () => {
  try {
    // Ensure DB connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    // Sync model (only create table if not exists)
    await Role.sync();

    // Insert roles if not already there
    await Role.bulkCreate(
      [
        { role_name: 'Admin' },
        { role_name: 'User' },
      ],
      { ignoreDuplicates: true } // prevents errors if they already exist
    );

    console.log('🎉 Roles inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting roles:', error);
  } finally {
    await sequelize.close();
    console.log('🔒 Database connection closed.');
  }
})();
