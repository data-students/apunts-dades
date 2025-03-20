export type User = {
	id: string;
	username: string;
	email: string;
	name: string;
	avatar: string;
	subjects: string[];
	created: Date;
	updated: Date;
	initials: string;
	expand: any;
};

export type Note = {
	id: string;
	title: string;
	file: File | null;
	subject: string;
	topic: string;
	type: string;
	course: string;
	author: string;
	hideAuthor: boolean;
	created: Date;
	updated: Date;
	expand: any;
};

export type Subject = {
	id: string;
	title: string;
	acronym: string;
	quarter: string;
	type: string;
	created: Date;
	updated: Date;
};

export type Topic = {
	id: string;
	title: string;
	subject: string;
	created: Date;
	updated: Date;
};
