export interface IImage {
    publicId: string;
    secureUrl: string;
    url: string;
    originalFileName: string;
    signature: string;
    createdAt: Date; 
}

export const initImage: IImage = {
    publicId: null,
    secureUrl: null,
    url: null,
    originalFileName: null,
    signature: null,
    createdAt: null
};