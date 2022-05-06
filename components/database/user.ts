import BaseUser from '../../models/base/baseUser';
import { IUser } from '../../models/base/IUser';

export default class User extends BaseUser
{
    hashedPassword: string;

    constructor(hashedPassword: string, user: IUser)
    {
        super(user);

        this.hashedPassword = hashedPassword;
    }
}