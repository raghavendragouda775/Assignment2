import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,         // Database name
  process.env.DB_USER,         
  process.env.DB_PASSWORD,     // Database password
  {
    host: process.env.DB_HOST, // Host name of the database
    port: process.env.DB_PORT, 
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    logging: false
  }
);

export default sequelize;
