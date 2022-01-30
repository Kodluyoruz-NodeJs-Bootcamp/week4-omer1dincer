import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/env';

//Bu middleware , gidilmek istenilen route'a gitmek için "admin" rolüne sahip olup olunmadığını kontrol eder.

/*

	Gelen request içerisindeki token alınır ve decode edilir, eğer token içerisindeki 'role' bilgisi 'admin' değilse , endpoint'e ulaşmaya izin verilmez.

*/

export const adminVerify = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session['token']) {
			res.render('authenticate');
		} else {
			const userJWT = jwt.verify(req.session['token'], config.default.accessToken);
			if (userJWT['role'] !== config.default.roleAdmin) {
				res.render('authorize');
			} else {
				next();
			}
		}
	} catch (error) {
		next(error);
	}
};
