
export interface IProduct {
    id: string;
    name: string;
    urlName: string;
    previewDescription: string;
    description: string;
    categoryId: string;
    previewName: string;
    previewImageUrl: string;
    gallery: string[];
}

export const initProduct: IProduct = {
    id: null,
    name: null,
    urlName: null,
    previewDescription: null,
    description: null,
    categoryId: null,
    previewName: null,
    previewImageUrl: null,
    gallery: []
};
