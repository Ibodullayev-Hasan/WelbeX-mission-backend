import { DataSource } from "typeorm";
import "dotenv/config"
import { Blog, User } from "../entities";

export const appDataSource = new DataSource({
	type: "postgres",
	url: process.env.DB_URL,
	synchronize: false,
	logging: false,
	entities: [User, Blog]
});