import { Response, Request, NextFunction } from 'express';

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
	//res.status(err.statusCode).send(errObj);

	console.log(err);

	res.status(505).render('err', { res: err.message });
};
