import { Router } from "express";
import { Login } from "src/auth/login";
import { UseerController } from "src/controllers";
import { verifyUser } from "src/middlewares/verify.user";

const userRouter: Router = Router()

userRouter.post('/user/new', UseerController.createUser)
userRouter.post('/user/login', Login.userLogin)
userRouter.get('/user/profile', verifyUser, UseerController.getProfile)

export default userRouter
