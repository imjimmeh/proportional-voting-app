export interface IUser {
    id: number;
    username: string;
    createdAt: Date;
    claims: IClaim[];
}

export interface IClaim{
    Type: string;
    Value: string;
}