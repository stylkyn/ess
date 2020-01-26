
export interface ICategory {
    id: string;
    urlName: string;
    parentCategoryId: string;
    name: string;
    subcategories: ICategory[];
}

export const initCategory: ICategory = {
    id: null,
    urlName: null,
    parentCategoryId: null,
    name: null,
    subcategories: []
};
