import { Request, Response, NextFunction } from 'express';

//Bu route , kullanıcının giriş yapıp yapmadığını ve requestin login yapılan browser'dan gelip gelmediğini kontrol eder
/*
	Senaryo : 
		* Kullanıcın token ve browser bilgisi kontrol edilir.
		* Eğer Token veya Browser bilgisi yoksa ,veya browser bilgisi, login olunan browser'a eş değilse, login olmamış sayılır.
*/

export const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
	try {
		const _userToken = req.session['token'];
		const _userBrowser = req.session['browser'];

		if (!_userToken || !_userBrowser || _userBrowser !== req.headers['user-agent']) {
			res.render('authenticate');
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};
