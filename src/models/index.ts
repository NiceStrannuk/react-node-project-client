export interface IPostUser {
	username: string;
	email: string;
	password: string;
}

export interface IGetUser {
	email: string;
	password?: string;
	username: string;
	__v?: number;
	_id: string;
}