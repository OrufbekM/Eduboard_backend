require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "eduboard_xiam",
  process.env.DB_USER || "eduboard_xiam_user",
  process.env.DB_PASSWORD || "PJzwr2pXX6ZrlaFbU1YtYEf4YxiJPX55",
  {
    host: process.env.HOST || "dpg-d5qco4h4tr6s73ddc1h0-a.oregon-postgres.render.com",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
