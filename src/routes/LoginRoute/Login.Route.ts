import { Request, Response, NextFunction, Router } from 'express';
import UserService from '../../services/UserService/User.Service';
import { ILoginUser } from '../../database/interfaces/UserInterface/ILoginUser.interface';
import { IUser } from '../../database/interfaces/UserInterface/IUser.interface';

/*
	Router Class'lar, isteğin karşılandığı ve business logic çevresinde işlemlerin yapıldığı katmandır
*/

class LoginRouteClass {
	router: Router;
	private UserService: UserService;

	constructor() {
		this.router = Router();
		this.UserService = new UserService();
		this.initRoutes();
	}

	async LoginRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const username = req.body.username;
			const password = req.body.password;
			if (username && password) {
				const user: IUser = await this.UserService.getUserByUsername(username);

				if (!user) {
					res.render('login', { message: 'Username is Wrong' }); // wrong username
				} else if (!(await this.UserService.isPasswordValid(password, user.password))) {
					res.render('login', { message: 'Password is Wrong' }); // wrong password
				} else {
					req.session['token'] = await this.UserService.createAccessToken(user.username, user.role);
					req.session['browser'] = req.headers['user-agent'];
					res.render('main');
				}
			} else {
				res.render('login', { message: 'Username and/or pasword did not provided' });
			}
		} catch (error) {
			next(error);
		}
	}

	initRoutes() {
		this.router.get('/login', (req: Request, res: Response) => {
			res.render('login', { message: '' });
		});
		this.router.post('/login', this.LoginRoute.bind(this));
	}
}

export const LoginRoute = new LoginRouteClass().router;
