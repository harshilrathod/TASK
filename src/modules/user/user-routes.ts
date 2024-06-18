import { Router } from 'express';
import { UserController } from './user-controller';
const router: Router = Router();
const userController = new UserController();

router.post(
    '/signup',
    userController.signUp
);

router.get('/signup', (req, res) => {
    res.render('signup', { message : '' });
});

router.post(
    '/login',
    userController.login
);

router.get('/login', (req, res) => {
    res.render('login', {message : ''});
});



export const userRoute: Router = router;
