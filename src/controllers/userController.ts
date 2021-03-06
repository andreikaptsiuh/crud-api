import { IUser } from '@/interfaces/IUser';
import http from 'http';
import { validate } from 'uuid';
import { myDb } from '../myDb/myDb';

const InvalidIdMessage = 'User id invalid';

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

        if (!validate(id)) {
            res.writeHead(400, InvalidIdMessage);
            res.end(InvalidIdMessage);
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
        let body: any[] = [];

        req.on('data', (chunk) => {
            body.push(chunk as string);
        });

        req.on('end', () => {
            try {
                const bodyJson = Buffer.concat(body);
                const userForCreate = JSON.parse(bodyJson as unknown as string);

                if (!this._checkReqUserBody(userForCreate)) {
                    const message = 'Request body invalid';
                    res.writeHead(400, message);
                    res.end(message);
                    return;
                };

                const createdUser = myDb.addUser(userForCreate);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(createdUser));
            } catch (error) {
                const e = error as Error;
                res.end(e.message);
            }
        }); 
    };

    updateUserById(req: http.IncomingMessage, res: http.ServerResponse) {
        const id = this._getIdFromUrl(req);

        if (!validate(id)) {
            res.writeHead(400, InvalidIdMessage);
            res.end(InvalidIdMessage);
            return;
        };

        let body: any[] = [];

        req.on('data', (chunk) => {
            body.push(chunk as string);
        });

        req.on('end', () => {
            try {
                const bodyJson = Buffer.concat(body);
                const userForUpdate = JSON.parse(bodyJson as unknown as string);

                const user = myDb.updateUserById(id, userForUpdate);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } catch (error) {
                const e = error as Error;
                res.writeHead(404, e.message);
                res.end(e.message);
            };
        }); 
    };

    deleteUserById(req: http.IncomingMessage, res: http.ServerResponse) {
        const id = this._getIdFromUrl(req);

        if (!validate(id)) {
            res.writeHead(400, InvalidIdMessage);
            res.end(InvalidIdMessage);
            return;
        };

        try {
            const result: boolean = myDb.deleteUserById(id);
            if (result) {
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end();
            }
        } catch (error) {
            const e = error as Error;
            res.writeHead(404, e.message);
            res.end(e.message);
        };
    };

    _checkReqUserBody(user: unknown): boolean {
        if (
            typeof (user as IUser).username !== 'string' ||
            typeof (user as IUser).age !== 'number' ||
            !Array.isArray((user as IUser).hobbies)
        ) {
            return false;
        };
        return true;
    };

    _getIdFromUrl(req: http.IncomingMessage): string {
        const reqParameters = req.url?.split('/') as string[];
        const id = reqParameters[reqParameters.length - 1];

        return id;
    };
};

export const userController = new UserController();
