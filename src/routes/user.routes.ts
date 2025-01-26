import { Router } from "express";
import { Login } from "../auth/login";
import { UseerController } from "../controllers";
import { verifyUser } from "../middlewares";

const userRouter: Router = Router()

userRouter.post('/user/new', UseerController.createUser)
userRouter.post('/user/login', Login.userLogin)
userRouter.get('/user/profile', verifyUser, UseerController.getProfile)

export default userRouter
