import { Router } from "express";
import userRouter from "./user.routes";

let router: Router = Router()
router.use(userRouter)

export default router
