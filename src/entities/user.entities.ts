import { IUser } from "../interfaces";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blogs.entities";

@Entity('users_table')
export class User implements IUser {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column({ type: "text", nullable: false })
	username!: string;

	@Column({ type: "text", nullable: false, unique: true })
	login!: string;

	@Column({ type: "varchar", length: '18', nullable: false })
	password!: string;

	@OneToMany(() => Blog, (blog) => blog.author)
	blogs?: Blog[];
}