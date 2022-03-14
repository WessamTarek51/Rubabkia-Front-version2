import { User } from 'src/app/_models/user.models';
export interface Sales{
  id?: number;
  name:string;
  price: number;
  image?: string;
  description:string;
  user:User;
  isFav:boolean;
}
