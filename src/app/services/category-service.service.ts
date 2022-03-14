import { Category,getAllCategoryData } from '../_models/category.models';
import { Product,getAllProductsData } from '../_models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// 

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private HttpClient:HttpClient) { }
  categories:Category[]=[];
  // [
  //   {id:1,name:"food",image:"https://source.unsplash.com/random/200x200?sig=1"},
  //   {id:2,name:"clothing",image:"https://source.unsplash.com/random/200x200?sig=2"},
  //   {id:3,name:"electric",image:"https://source.unsplash.com/random/200x200?sig=3"},
  //   {id:4,name:"baby",image:"https://source.unsplash.com/random/200x200?sig=4"},
  //   {id:5,name:"toys",image:"https://source.unsplash.com/random/200x200?sig=5"},
  //   {id:6,name:"home",image:"https://source.unsplash.com/random/200x200?sig=6"},
  // ]
  getAllcategories():Observable<getAllCategoryData>{
    return this.HttpClient.get<getAllCategoryData>('http://127.0.0.1:8000/api/categories');

  }
  
    getCtId(categoryId:any){
    // console.log("done");
    return this.HttpClient.get('http://127.0.0.1:8000/api/categories/'+categoryId);
   
  }
}
