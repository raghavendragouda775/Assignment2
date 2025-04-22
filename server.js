import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import schoolRoutes from "./routes/routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use('/', schoolRoutes);
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
    sequelize.sync(); 
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
