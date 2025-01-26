import { Blog } from "../entities"

export interface IUser {
	id?: string
	username: string
	login: string
	password: string
	blogs?: Blog[]
}