import BaseUser from '../base/baseUser';

export default class User extends BaseUser
{
    Username: string;
    HashedPassword: string;
    CreatedAt: Date;

    constructor(username: string, hashedPassword: string, id: bigint, createdAt?: Date)
    {
        super(id, username, createdAt);

        this.HashedPassword = hashedPassword;
    }
}