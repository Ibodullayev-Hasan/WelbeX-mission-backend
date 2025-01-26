import { Router } from "express";
import { BlogController } from "src/controllers";
import { verifyUser } from "src/middlewares/verify.user";

const blogRouter: Router = Router()

blogRouter.get("/blog", verifyUser, BlogController.getAllBlogs)
blogRouter.post("/blog/new", verifyUser, BlogController.createBlog)
blogRouter.patch("/blog/update", verifyUser, BlogController.updateBlog)
blogRouter.delete("/blog/remove", verifyUser, BlogController.deleteBlog)

export default blogRouter
