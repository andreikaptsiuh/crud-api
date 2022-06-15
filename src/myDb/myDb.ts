import { IUser, IUserFromDb } from '../interfaces/IUser';

class MyDb {
    private users: IUserFromDb[];

    constructor () {
        this.users = [];
    };

    getUsers() {
        return this.users;
    };

    getUserById(id: string): IUserFromDb {
        const user = this.users.find((user: IUserFromDb) => user.id === id);

        if (!user) {
            throw new Error("User with this id not found");
        };

        return user;
    };

    addUser (user: IUser) {
        const userWithId: IUserFromDb = {...user, id: this._createUserId()};
        this.users.push(userWithId);
        return true;
    };

    updateUserById (id: string, data: IUser) {
        const user = this.users.find((user: IUserFromDb) => user.id === id);

        if (!user) {
            throw new Error("User was not found");
        };

        for(let key in data) {
            user[key as keyof IUser] = data[key as keyof IUser];
        };

        return true;
    };

    deleteUserById(id: string) {
        const user = this.users.find((user: IUserFromDb) => user.id === id);

        if (!user) {
            throw new Error("User was not found");
        };

        const deleteUserIndex = this.users.indexOf(user);
        this.users.splice(deleteUserIndex);

        return true;
    };

    _createUserId(): string {
        return String(this.users.length + 1); // TODO: id should be uuid
    };
};

export const myDb = new MyDb();
