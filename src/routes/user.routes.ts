import { Router } from "express";
import { UseerController } from "src/controllers";

const userRouter: Router = Router()

userRouter.post('/user', UseerController.createUser)

export default userRouter
