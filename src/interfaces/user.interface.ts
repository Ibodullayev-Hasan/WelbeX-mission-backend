import { Blog } from "src/entities"

export interface IUser {
	id: string
	username: string
	password: string
	blogs?:Blog[]
}