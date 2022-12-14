import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import { errorHandler } from "./errorHandler.js";

dotenv.config();

const port = process.env.PORT;
const connectionString = process.env.DB_CONNECTION;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use(errorHandler);

async function startApp() {
  try {
    await mongoose.connect(connectionString);

    app.listen(port, () => console.log(`Server started on PORT ${port}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
