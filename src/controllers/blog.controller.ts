import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "src/errors";
import { appDataSource } from "src/config/typeorm.config";
import { Blog, User } from "src/entities";
import { IBlog } from "src/interfaces";
import { validateBlogData } from "src/validation";
import "dotenv/config";

export class BlogController {
	private static blogRepository = appDataSource.getRepository(Blog);

	// All blogs of the author
	static async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const blogs = await BlogController.blogRepository.find({
				relations: {
					author: true
				},
				select: {
					author: { id: true, username: true }
				}
			});

			res.status(200).send({
				message: "All blogs of the author",
				blogs: blogs,
			});
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}

	// Create new blog
	static async createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const blogData: IBlog = req.body;
			const user = req.user as User

			// Validate blog data
			const validationError = validateBlogData(blogData);
			if (validationError) {
				res.status(400).send({ message: validationError });
				return;
			}

			blogData.author = user

			const newBlog: Blog = BlogController.blogRepository.create(blogData);
			const savedBlog = await BlogController.blogRepository.save(newBlog);

			res.status(201).send({
				message: "Blog successfully created",
				blog: {
					id: savedBlog.id,
					content: {
						type: savedBlog.content.type,
						content: savedBlog.content.content,
					},
					author: {
						username: savedBlog.author?.username,
					},
					date: savedBlog.date,
				},
			});
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}
}
