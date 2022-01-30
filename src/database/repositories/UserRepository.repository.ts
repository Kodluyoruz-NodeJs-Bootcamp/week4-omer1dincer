import * as config from '../../config/env';
import { UserModel } from '../models/User.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/UserInterface/IUser.interface';
import { IUsers } from '../interfaces/UserInterface/IUsers.interface';
import { IRegisterUser } from '../interfaces/UserInterface/IRegisterUser.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


//User ile ilgili veritabanı işlemlerinin yapıldığı "Repository" katmanı
/*
	Bu katmanda business logic bulunmaz , sadece veri akışı için gerekli bağlantı ve temel fonksiyonlar oluşturulur
*/

export default class UserRepository {
	private UserModel: Model<IUser>;
	constructor() {
		this.UserModel = UserModel;
	}

	async GetUsers(): Promise<IUsers> {
		try {
			const users = await this.UserModel.find({});
			return users;
		} catch (error) {
			await this.ThrowUserRepoError(error.message);
		}
	}

	async AddNewUser(registerUser: IRegisterUser): Promise<IUser> {
		try {
			const { name, surname, username, password, role } = registerUser;
			const newUser = new this.UserModel({
				name: name,
				surname: surname,
				username: username,
				password: bcrypt.hashSync(password),
				role: role
			});
			await newUser.save();
			return newUser;
		} catch (error) {
			await this.ThrowUserRepoError(error.message);
		}
	}

	async findUserByUsername(username: IUser['username']): Promise<IUser> {
		try {
			const user = await this.UserModel.findOne({ username: username });
			return user;
		} catch (error) {
			await this.ThrowUserRepoError(error.message);
		}
	}

	async isPasswordValid(userPassword: IUser['password'], validPassword: IUser['password']): Promise<boolean> {
		return bcrypt.compareSync(userPassword, validPassword);
	}

	async createAccessToken(username: IUser['username'], role: IUser['role']) {
		try {
			const payload = {
				username: username,
				role: role
			};
			const token = jwt.sign(payload, config.default.accessToken, { expiresIn: config.default.jwtExpire });
			return token;
		} catch (error) {
			await this.ThrowUserRepoError(error.message);
		}
	}

	///////
	async ThrowUserRepoError(message: string) {
		throw new Error(`User Repository Error with ${message}`);
	}
}
