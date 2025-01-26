import { User } from "src/entities";

export interface IContent {
	type: 'text' | 'image' | 'video';
	content: string;
}

export interface IBlog {
	id: number;
	date?: Date;
	content: IContent;
	author?: User;
}