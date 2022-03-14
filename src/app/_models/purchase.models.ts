import { User } from 'src/app/_models/user.models';
export interface Purchase{
  id?: number;
  name:string;
  price: number;
  image?: string;
  description:string;
  user:User;
  isFav:boolean;
}
