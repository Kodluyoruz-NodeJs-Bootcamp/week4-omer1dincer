import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as config from '../config/env';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { LoginRoute } from '../routes/LoginRoute/Login.Route';
import { RegisterRoute } from '../routes/RegisterRoute/Register.route';
import { isAuthenticate } from '../middleware/Authenticate.Middleware';
import { errorMiddleware } from '../middleware/Error.middleware';
import { UserRoute } from '../routes/UserRoute/User.Route';

class App {
	private app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.initRoutes();
		this.initMiddleware();
	}

	private config() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser(config.default.cookie_secret));
		this.app.use(
			session({
				secret: 'myl!ttL£s$cR3TK#?',
				cookie: {
					maxAge: 600000,
					httpOnly: true
				},
				resave: false,
				saveUninitialized: false
			})
		);
		this.app.use(express.static(path.join(__dirname, '../public')));
		this.app.set('view engine', 'ejs');
		this.app.set('views', path.join(__dirname, '../public/views'));
	}

	initRoutes() {
		this.app.get('/home', isAuthenticate, (req: Request, res: Response) => {
			res.render('main');
		});
		this.app.get('/', (req: Request, res: Response) => {
			res.render('home');
		});
		this.app.use(LoginRoute);
		this.app.use(RegisterRoute);
		this.app.use(UserRoute);
		this.app.get('/logout', (req: Request, res: Response, next: NextFunction) => {
			req.session.destroy(function (err) {
				if (err) {
					next(err);
				} else {
					res.redirect('/');
				}
			});
		});
	}
	private initMiddleware() {
		this.app.use(errorMiddleware);
	}

	public StartApp() {
		mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
			console.log('Connected To DB');
			this.app.listen(config.default.appPort, () => {
				console.log(`App is online at port ${config.default.appPort}`);
			});
		});
	}
}
export default App;
