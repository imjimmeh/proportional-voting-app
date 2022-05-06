import { IUser } from "./IUser";

export default class BaseUser implements IUser{
    Id: number;
    Username: string;
    CreatedAt: Date;
    
    constructor(user: IUser){
        this.Id = user.Id;
        this.Username = user.Username;
        this.CreatedAt = user.CreatedAt ?? new Date();
    }
}

