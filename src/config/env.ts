import * as dotenv from 'dotenv';
dotenv.config();

export default {
	accessToken: process.env.ACCESS_TOKEN_SECRET,
	refreshToken: process.env.REFRESH_TOKEN_SECRET,

	mongoURL: process.env.MONGODB_CONNECTION_STRING,
	appPort: process.env.APP_PORT,

	userModelName: process.env.USER_MODEL_NAME,


	jwtExpire: process.env.ACCESS_EXP_TIME,

	cookie_secret: 'aaAaa',

	roleAdmin : process.env.ROLE_ADMIN,
	roleMember : process.env.ROLE_MEMBER
};
