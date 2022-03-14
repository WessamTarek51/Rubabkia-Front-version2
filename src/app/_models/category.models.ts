import { Product } from "./product.models";



export interface Category{
    id?: number;
    image?: string;
    name:string;
}
export interface Categorys{
    image?: string;

}

export interface getAllCategoryData{
    data:Product[];

    // name:string;
    // price: number;
    // image?: string;
}
