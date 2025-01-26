import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { IUser } from "../interfaces";
import { appDataSource } from "../config/typeorm.config";
import { User } from "../entities";
import { ErrorHandler } from "../errors";


// user verification
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {

	try {
		const token = req.headers.authorization?.split(" ")[1]

		if (!token) {
			return res.status(401).send({ message: 'No token provided' });
		}

		const { sub } = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);

		if (!sub) {
			return res.status(401).send({
				message: "unauthorized"
			})
		}

		const user = await appDataSource.getRepository(User).findOne({
			where: { id: sub as string },
			relations: { blogs: true }
		})

		if (!user) {
			return res.status(401).send({
				message: "User not found"
			})
		}

		req.user = user as IUser
		next()

	} catch (error: any) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).send({ message: "Token has expired. Please log in again." });
		}
		next(new ErrorHandler(error.message, error.status || 400))
	}
} 