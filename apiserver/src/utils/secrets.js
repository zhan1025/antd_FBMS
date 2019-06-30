const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env['MONGODB_URI'];

module.exports = {
  MONGODB_URI
};
