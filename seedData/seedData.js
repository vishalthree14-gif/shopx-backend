// seedRoles.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // ensures .env loads from project root

const sequelize = require('../db'); // correct path from seedData folder
const Role = require('../models/Role');

(async () => {
  try {
    await sequelize.sync({ alter: true }); // sync tables

    // Create roles if they don't exist
    await Role.findOrCreate({ where: { role_name: 'admin' } });
    await Role.findOrCreate({ where: { role_name: 'user' } });

    console.log('Roles created/ensured ✅');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding roles:', err);
    process.exit(1);
  }
})();



// const sequelize = require('../db'); // make sure path is correct
// const Role = require('../models/Role');

// (async () => {
//   try {
//     await sequelize.sync({ alter: true }); // sync tables

//     // Create roles if they don't exist
//     await Role.findOrCreate({ where: { role_name: 'admin' } });
//     await Role.findOrCreate({ where: { role_name: 'user' } });

//     console.log('Roles created/ensured ✅');
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// })();


