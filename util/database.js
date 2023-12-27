const Sequelize = require('sequelize');

const sequelize = new Sequelize(`postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:5432/${process.env.PG_DB}`);

module.exports = sequelize;
