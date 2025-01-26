import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "src/errors";
import { appDataSource } from "src/config/typeorm.config";
import { Blog, User } from "src/entities";
import { IBlog } from "src/interfaces";
import { validateBlogData } from "src/validation";
import "dotenv/config";

export class BlogController {

	// All blogs of the author
	static async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const blogs = await appDataSource.getRepository(Blog).find({
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

			const newBlog: Blog = appDataSource.getRepository(Blog).create(blogData);
			const savedBlog = await appDataSource.getRepository(Blog).save(newBlog);

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


	// update blog
	static async updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const blogData: IBlog = req.body;
			const user = req.user;
			const { id, content } = blogData;

			if (!id || !content || !content.type || !content.content) {
				throw new ErrorHandler("Blog ID, content type, and content are required.", 400);
			}

			const blogRepository = appDataSource.getRepository(Blog);
			const blog = await blogRepository.findOne({
				where: { id },
				relations: { author: true },
			});

			if (!blog) {
				throw new ErrorHandler("Blog not found.", 404);
			}

			if (blog.author?.id !== user?.id) {
				throw new ErrorHandler("You can only update your own blogs.", 403);
			}

			const validTypes = ["text", "image", "video"];
			if (!validTypes.includes(content.type)) {
				throw new ErrorHandler(
					"Invalid content type. Only 'text', 'image' or 'video' are accepted.",
					400
				);
			}

			if ((content.type === "image" || content.type === "video") && !content.content.startsWith("https")) {
				throw new ErrorHandler(
					"If the content type is 'image' or 'video', the URL must be valid.",
					400
				);
			}

			blog.content = content;
			await blogRepository.save(blog);

			res.status(200).send({
				message: "Blog updated successfully.",
				blog: {
					id: blog.id,
					content: {
						type: blog.content.type,
						content: blog.content.content,
					},
					author: {
						username: blog.author?.username,
					},
					date: blog.date,
				},
			});
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}


	// delete blog
	static async deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const blogData: IBlog = req.body;
			const { id } = blogData
			if (!id) throw new ErrorHandler("id required", 400)

			const blog = await appDataSource.getRepository(Blog).findOne({ where: { id: id } })
			if (!blog) throw new ErrorHandler("blog not found", 404)
				
			await appDataSource.getRepository(Blog).delete(id)

			res.status(200).send({ message: "Delete successfully" })
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}
}
