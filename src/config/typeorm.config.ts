import { Blog, User } from "src/entities";
import { DataSource } from "typeorm";
import "dotenv/config"

export const appDataSource = new DataSource({
	type: "postgres",
	url: process.env.DB_URL,
	synchronize: false,
	logging: false,
	entities: [User, Blog]
});