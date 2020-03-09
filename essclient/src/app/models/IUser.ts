export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    token: IIAuthentificationToken;
}

export interface IIAuthentificationToken {
    expiresDate: Date;
    jwt: string;
}
