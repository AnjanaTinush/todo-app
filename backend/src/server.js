import dotenv from "dotenv";
import app from "./app.js";
import { initTable } from "./models/taskModel.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await initTable();
  app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`);
  });
};

startServer();
