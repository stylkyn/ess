export interface IUser {
    id: string;
    email: string;
    personal: IUserPersonal;
    company: IUserCompany;
    hasAdminAccess: boolean;
    hasAgentAccess: boolean;
    token: IIAuthentificationToken;
}

export interface IUserPersonal {
    firstname: string;
    lastname: string;
    password?: string;
    address: IUserAddress;
    contact: IUserContact;
}

export interface IUserCompany {
    companyName: string;
    companyVat: string;
    companyId: string;
    address: IUserAddress;
}

export interface IUserAddress {
    country: string;
    postalCode: string;
    city: string;
    street: string;
    houseNumber: string;
}

export interface IUserContact {
    phone: string;
    email: string;
}

export interface IIAuthentificationToken {
    expiresDate: Date;
    jwt: string;
}

export interface IUserOption {
    id: string;
    name: string;
    email: string;
}

const tokenInitial: IIAuthentificationToken = {
    expiresDate: null,
    jwt: null
};
export const cookieJwtName = 'jwt';

export const tokenToObject = (tokenStr: string): IIAuthentificationToken => {
    if (!tokenStr || tokenStr === 'undefined')
    {
        return tokenInitial;
    }

    const token: IIAuthentificationToken = JSON.parse(tokenStr);
    if (!token)
    {
        return tokenInitial;
    }
    token.expiresDate = new Date(token.expiresDate);

    return token;
};
