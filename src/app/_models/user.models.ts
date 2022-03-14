import { Purchase } from './purchase.models';
import { Product } from "./product.models";
import { Sales } from "./sales.model";

export interface User{


    id: number;

    username:string;
    name:string;
    image?: string;
    email:string;
    phoneNumber:number;
    address:string;
    password:string;
    products?:Product[];
    purchases?:Purchase[];
    sales?:Sales[];

    // email:string;
    // phone_number:number;
    // address:string;
    // password:string;


}

