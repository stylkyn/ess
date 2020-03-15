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

const tokenInitial: IIAuthentificationToken = {
    expiresDate: null,
    jwt: null
};
export const cookieJwtName = 'jwt';

export const tokenToObject = (tokenStr: string): IIAuthentificationToken => {
    if (!tokenStr || tokenStr === 'undefined') {
        return tokenInitial;
    }

    const token: IIAuthentificationToken = JSON.parse(tokenStr);
    if (!token) {
        return tokenInitial;
    }
    token.expiresDate = new Date(token.expiresDate);

    return token;
};
