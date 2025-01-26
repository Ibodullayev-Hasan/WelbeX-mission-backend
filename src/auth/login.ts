import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "src/errors";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { IUser } from "src/interfaces";
import { User } from "src/entities";
import { appDataSource } from "src/config/typeorm.config";


// login
export class Login {

	static async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { login, password }: Partial<IUser> = req.body

			if (!login || !password) {
				throw new ErrorHandler('login and password required', 400)
			}

			const user: User | null = await appDataSource.getRepository(User).findOne({ where: { login: login } })

			if (!user) {
				throw new ErrorHandler("User not found", 401);
			}

			const payload: object = { sub: user?.id, username: user?.username }
			const [acc_token, ref_token] = await Promise.all([
				jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: "30m" }),
				jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: "10d" })
			])

			res.status(201).send({
				acc_token: acc_token,
				ref_token: ref_token
			})
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}
}