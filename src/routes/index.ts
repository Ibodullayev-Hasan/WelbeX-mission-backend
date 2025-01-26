import { Router } from "express";
import userRouter from "./user.routes";
import blogRouter from "./blog.routes";

const router: Router = Router()

router.use(userRouter)
router.use(blogRouter)

export default router
