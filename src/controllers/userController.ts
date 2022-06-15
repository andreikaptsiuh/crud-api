import http from 'http';
import { myDb } from '../myDb/myDb';

class UserController {
    getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            const users = myDb.getUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500, 'Server error');
        }
    };

    getUserById(req: http.IncomingMessage, res: http.ServerResponse) {    
        const id = this._getIdFromUrl(req);

        if (typeof id !== 'string') { // TODO: uuid check
            const message = 'User id invalid';

            res.writeHead(400, message);
            res.end(message);
            return;
        };

        try {
            const user = myDb.getUserById(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } catch (error) {
            const e = error as Error;
            res.writeHead(404, e.message);
            res.end(e.message);
        }
    };

    addUser(req: http.IncomingMessage, res: http.ServerResponse) {
        res.end("Add user");
    };

    updateUserById(req: http.IncomingMessage, res: http.ServerResponse) {
        res.end("Update user by id");
    };

    deleteUserById(req: http.IncomingMessage, res: http.ServerResponse) {
        res.end("Delete user by id");
    };

    _getIdFromUrl(req: http.IncomingMessage): string {
        const reqParameters = req.url?.split('/') as string[];
        const id = reqParameters[reqParameters.length - 1];

        return id;
    };
};

export const userController = new UserController();
