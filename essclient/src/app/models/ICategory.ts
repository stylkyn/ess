
export interface ICategory {
    id: string;
    parentCategoryId: string;
    name: string;
    subcategories: ICategory[];
}
