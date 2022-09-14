import dotenv from "dotenv";
import express from "express";

import userRouter from "./routes/user.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
