import UserRepository from '../../database/repositories/UserRepository.repository';
import { IUser } from '../../database/interfaces/UserInterface/IUser.interface';
import { IUsers } from '../../database/interfaces/UserInterface/IUsers.interface';
import { IRegisterUser } from '../../database/interfaces/UserInterface/IRegisterUser.interface';

/*
	Bu katman , veri akışının sağlandığı "Repository" katmanı ile , diğer katmanlar arasındaki köprü görevini görür.
	Gerekli durumlarda, minimal seviyede business logic barındırabilir
*/ 


export default class UserService {
	private UserRepository: UserRepository;
	constructor() {
		this.UserRepository = new UserRepository();
	}

	async getUsers(): Promise<IUsers> {
		try {
			const users = await this.UserRepository.GetUsers();
			return users;
		} catch (error) {
			await this.ThrowUserServiceError(error.message);
		}
	}

	async addNewUser(registerUser: IRegisterUser): Promise<IUser> {
		try {
			const newUser = await this.UserRepository.AddNewUser(registerUser);
			return newUser;
		} catch (error) {
			await this.ThrowUserServiceError(error.message);
		}
	}
	async getUserByUsername(username: IUser['username']): Promise<any> {
		try {
			const user: IUser = await this.UserRepository.findUserByUsername(username);
			return user;
		} catch (error) {
			await this.ThrowUserServiceError(error.message);
		}
	}

	async isPasswordValid(userPassword: IUser['password'], validPassword: IUser['username']) {
		try {
			const result = await this.UserRepository.isPasswordValid(userPassword, validPassword);
			return result;
		} catch (error) {
			await this.ThrowUserServiceError(error.message);
		}
	}
	async createAccessToken(username: IUser['username'], role: IUser['role']) {
		try {
			const result = await this.UserRepository.createAccessToken(username, role);
			return result;
		} catch (error) {
			await this.ThrowUserServiceError(error.message);
		}
	}

	/////////
	private async ThrowUserServiceError(message: string) {
		throw new Error(`User Service Error with ${message}`);
	}
}
