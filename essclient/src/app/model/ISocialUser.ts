export interface ISocialUser {
    email: string;
    id: string;
    idToken: string;
    image: string; // foto uzivatele
    name: string; // jmeno uzivatele na fb/googlu
    provider: string; // Facebook/Google
    token: string;
}
