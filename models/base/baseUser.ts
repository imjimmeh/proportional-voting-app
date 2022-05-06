import { IClaim, IUser } from "./IUser";

export default class BaseUser implements IUser{
    id: number;
    username: string;
    createdAt: Date;
    claims: IClaim[];

    constructor(user: IUser){
        this.id = user.id;
        this.username = user.username;
        this.createdAt = user.createdAt ?? new Date();
        this.claims = user.claims;
    }
}

