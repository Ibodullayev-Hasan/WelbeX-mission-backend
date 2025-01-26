import { Router } from "express";
import { BlogController } from "../controllers";
import { verifyUser } from "../middlewares";

const blogRouter: Router = Router()

blogRouter.get("/blog", verifyUser, BlogController.getAllBlogs)
blogRouter.post("/blog/new", verifyUser, BlogController.createBlog)
blogRouter.patch("/blog/update", verifyUser, BlogController.updateBlog)
blogRouter.delete("/blog/delete", verifyUser, BlogController.deleteBlog)

export default blogRouter
