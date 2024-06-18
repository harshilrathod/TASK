import { Router } from 'express';
import { TaskController } from './task-controller';
import { Middleware } from '../../middleware';
const router: Router = Router();
const taskController = new TaskController();
const middleware = new Middleware();

router.post(
    '/create-task',
    middleware.authenticateToken,
    taskController.createTask
);

router.put(
    '/update-task',
    middleware.authenticateToken,
    taskController.updateTask
);

router.get(
    '/',
    middleware.authenticateToken,
    taskController.getTask
);


router.get('/create-task', (req, res) => {
    res.render('createTask', {});
});

router.get('/task-dashboard', (req, res) => {
    console.log('dashboard');
    
    res.render('dashboard', {});
});

// router.post(
//     '/login',
//     userController.login
// );

// router.get('/login', (req, res) => {
//     res.render('login', {message : ''});
// });



export const taskRoute: Router = router;
