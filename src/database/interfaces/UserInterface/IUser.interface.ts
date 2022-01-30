import { Types } from 'mongoose';

export interface IUser {
	id: Types.ObjectId;
	name: string;
	surname: string;
	username: string;
	password: string;
	role : string;
}
