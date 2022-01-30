import { Request, Response, NextFunction, Router } from 'express';
import { IRegisterUser } from '../../database/interfaces/UserInterface/IRegisterUser.interface';
import { isAuthenticate } from '../../middleware/Authenticate.Middleware';
import { adminVerify } from '../../middleware/Authorize.middleware';
import UserService from '../../services/UserService/User.Service';

class UserRouteClass {
	router: Router;
	UserService: UserService;

	constructor() {
		this.router = Router();
		this.UserService = new UserService();
		this.initRoutes();
	}

	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.UserService.getUsers();
			res.status(200).render('programmers', { allUser: users });
		} catch (error) {
			next(error.messages);
		}
	}
	async adminPage(req: Request, res: Response, next: NextFunction) {
		res.render('admin');
	}

	initRoutes() {
		this.router.get('/users', isAuthenticate, this.getAllUsers.bind(this));
		this.router.get('/admin', adminVerify, this.adminPage.bind(this));
	}
}

export const UserRoute = new UserRouteClass().router;
