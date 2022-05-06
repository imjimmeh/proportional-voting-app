import BaseUser from '../base/baseUser';
import { IUser } from '../base/IUser';

export default class User extends BaseUser
{
    hashedPassword: string;

    constructor(hashedPassword: string, user: IUser)
    {
        super(user);

        this.hashedPassword = hashedPassword;
    }
}