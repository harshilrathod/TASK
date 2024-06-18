import * as express from 'express';
import { Constants } from './helpers/constants';
import { userRoute } from './modules/user/user-routes';
import { taskRoute } from './modules/task/task-routes';
import { Middleware } from './middleware';

export class Routes {
    private middleware = new Middleware();

    public path() {
        const router = express.Router();

        router.use('/user', userRoute);
        router.use('/task', taskRoute);
        router.get('/', (req, res) => {
            res.render('login', { message: '' });
        });
        router.all('/*', (req, res) => {
            return res.status(Constants.NOT_FOUND_CODE).json({
                error: Constants.MESSAGE.NOT_FOUND,
            });
        });
        return router;
    }
}
