import { IUser } from "src/interfaces";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blogs.entities";

@Entity('users')
export class User implements IUser {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column({ type: "text", nullable: false })
	username!: string;

	@Column({ type: "varchar", nullable: false })
	password!: string;

	@OneToMany(() => Blog, (blog) => blog.author)
	blogs?: Blog[];

}