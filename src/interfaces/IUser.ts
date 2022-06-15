export interface IUser {
    [key: string]: string | number | string[],
    username: string,
    age: number,
    hobbies: string[] | []
};

export interface IUserFromDb {
    [key: string]: string | number | string[],
    id: string, // add uuid type
    username: string,
    age: number,
    hobbies: string[] | []
};
