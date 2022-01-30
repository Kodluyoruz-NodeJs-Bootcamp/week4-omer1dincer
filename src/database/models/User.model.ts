import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/UserInterface/IUser.interface';

const UserSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true }
});

export const UserModel = model<IUser>('User', UserSchema);
