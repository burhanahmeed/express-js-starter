require('dotenv').config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data'
  }
};