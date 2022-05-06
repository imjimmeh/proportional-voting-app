import BaseUser from '../base/baseUser';
import { IUser } from '../base/IUser';

export default class UserDTO extends BaseUser{
    constructor(user: IUser)
    {
        super(user);
    }
}