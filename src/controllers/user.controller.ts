import { appDataSource } from './../config/typeorm.config';
import { ErrorHandler } from "src/errors"
import { User } from 'src/entities';
import { NextFunction, Request, Response } from 'express';
import { IUser } from 'src/interfaces';
import { validateUserData } from 'src/validation';
import jwt from "jsonwebtoken"
import "dotenv/config"


// User controller
export class UseerController {

	//  create new user
	static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userData: Partial<IUser> = req.body

			// validation request body
			const validationError = validateUserData(userData);
			if (validationError) {
				res.status(400).send({ message: validationError });
				return
			}

			const userRepository = appDataSource.getRepository(User)
			const existUser: User | null = await userRepository.findOne({ where: { login: userData.login } })

			if (existUser) {
				res.status(409).send({ message: 'Existing user, enter another login' })
				return
			}

			const newUser: User | null = userRepository.create(userData)
			const savedUser = await userRepository.save(newUser);

			const payload: object = { sub: savedUser.id, login: savedUser.login }
			const acc_token: string = jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '30m' })

			res.status(201).send({
				message: 'User created successfully!',
				data: savedUser,
				token: acc_token
			});
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}

	static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

			const user = req.user
			res.status(200).send({
				message: "User profile",
				data: {
					id: user?.id,
					username: user?.username,
					login: user?.login,
					blogs:user?.blogs
				}
			})
		} catch (error: any) {
			next(new ErrorHandler(error.message, error.status || 500));
		}
	}
}