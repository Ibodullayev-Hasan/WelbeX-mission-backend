import { Blog } from "src/entities"

export interface IUser {
	id?: string
	username: string
	login: string
	password: string
	blogs?: Blog[]
}