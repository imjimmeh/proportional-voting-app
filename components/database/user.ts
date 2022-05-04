import BaseUser from '../base/baseUser';

export default class User extends BaseUser
{
    Id: bigint;
    Username: string;
    HashedPassword: string;
    CreatedAt: Date;

    constructor(username: string, hashedPassword: string, createdAt?: Date, id?: bigint)
    {
        super(username, createdAt);
    }
}