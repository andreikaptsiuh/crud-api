import { userController } from '../controllers/userController';
import http from 'http';

export const userRouter = (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case 'GET':
            const url = req.url?.replace(/\/$|\/*$/g, '');
            const reqParameters = url?.split('/') as string[];

            if (reqParameters[reqParameters?.length - 1] === 'users') {
                userController.getUsers(req, res);
            } else {
                userController.getUserById(req, res);
            }
            break;

        case 'POST':
            userController.addUser(req, res);
            break;

        case 'PUT':
            userController.updateUserById(req, res);
            break;

        case 'DELETE':
            userController.deleteUserById(req, res);
        break;
    
        default:
            res.end('Switch not working!')
            break;
    }
};
