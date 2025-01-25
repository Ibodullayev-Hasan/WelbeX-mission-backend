import { Blog, User } from "src/entities";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
	type: "postgres",
	url: 'postgres://postgres:8077@localhost:5432/welbex',
	synchronize: true,
	logging: false,
	entities: [User, Blog]
});