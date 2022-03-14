import { Product } from 'src/app/_models/product.models';
import { User } from 'src/app/_models/user.models';
export interface Notifi{
  id_not:number;
  user_id:number;
  buyer_name:string;
  image:string;
  name:string;
  description:string;
  price:number;
}

