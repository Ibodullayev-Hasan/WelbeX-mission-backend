import { IBlog, IContent } from "../interfaces";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";

@Entity('blog')
export class Blog implements IBlog {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
	date?: Date | undefined;

	@ManyToOne(() => User, (user) => user.blogs)
	author?: User | undefined;

	@Column({ type: "jsonb" })
	content!: IContent;
}