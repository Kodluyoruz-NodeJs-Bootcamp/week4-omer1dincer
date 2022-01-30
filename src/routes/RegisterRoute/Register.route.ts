import { Request, Response, NextFunction, Router } from 'express';
import { IRegisterUser } from '../../database/interfaces/UserInterface/IRegisterUser.interface';
import UserService from '../../services/UserService/User.Service';

class RegisterRouteClass {
	router: Router;
	UserService: UserService;

	constructor() {
		this.router = Router();
		this.UserService = new UserService();
		this.initRoutes();
	}

	async registerRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const _register: IRegisterUser = req.body;

			if (await this.UserService.getUserByUsername(_register.username)) {
				res.render('signup', { message: 'User is Already Taken' });
			} else {
				const _newUser = await this.UserService.addNewUser(_register);

				if (!_newUser) {
					res.render('signup', { message: 'There is some error while Signing In' });
				} else {
					res.render('login', { message: 'You can login with your credentials now' });
				}
			}
		} catch (error) {
			next(error);
		}
	}
	initRoutes() {
		this.router.get('/sign-up', (req: Request, res: Response) => {
			res.render('signup', { message: '' });
		});
		this.router.post('/sign-up', this.registerRoute.bind(this));
	}
}
export const RegisterRoute = new RegisterRouteClass().router;
