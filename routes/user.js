import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", userController.get);
userRouter.get("/:id", userController.getOne);
userRouter.post("/", userController.create);
userRouter.delete("/:id", userController.delete);
userRouter.put("/:id", userController.update);

export default userRouter;
