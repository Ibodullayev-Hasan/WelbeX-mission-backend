import { appDataSource } from './../config/typeorm.config';
import { ErrorHandler } from "src/errors"
import { User } from 'src/entities';
import { NextFunction, Request, Response } from 'express';
import { IUser } from 'src/interfaces';
import { validateUserData } from 'src/validation';


// User controller
export class UseerController {

	//  create new user
	static async createUser(req: Request, res: Response, next: NextFunction): Promise<object> {
		try {
			const userData: Partial<IUser> = req.body

			const validationError = validateUserData(userData);
			if (validationError) {
				return res.status(400).send({ message: validationError });
			}

			const userRepo = appDataSource.getRepository(User)
			const existUser: User | null = await userRepo.findOne({ where: { username: userData.username } })

			if (existUser) {
				return res.status(409).send({ message: 'Existing user' })
			}

			const newUser: User | null = userRepo.create(userData)
			const savedUser = await userRepo.save(newUser);

			return res.status(201).send({
				message: 'User created successfully!',
				data: savedUser,
			});
		} catch (error: any) {
			if (error instanceof Error) throw error
			throw new ErrorHandler(error.message, 404)
		}
	}
}