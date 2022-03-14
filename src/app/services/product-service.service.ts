import { UserData } from './../_models/data.model';
import { Product ,getAllProductsData, proData } from '../_models/product.models';
import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  products:Product[]=[];
  product!:Product;
  private filterProduct: Product[]=[];
  // products:Product[]=
  // [
  // //   {id:1,
  // //   name:"aaaaaaa",
  // //   price:20,
  // //   image:"https://source.unsplash.com/random/200x200?sig=1",
  // //   description:"hhh jgugugb jhugui",
  // //   category:{id:1,name:"food",image:"https://source.unsplash.com/random/200x200?sig=2"},
  // //   user:{id:1,username:"basma",image:"https://source.unsplash.com/random/200x200?sig=3",email:"wessam@gmail.com",phoneNumber:1124879180,address:"cairo",password:"1234"},
  // //   isFav:false,
  // // },




  // ];


  constructor(private HttpClient:HttpClient) {
    for(let i of this.products){
      this.filterProduct.push(i);
      }
   }



  getData(){
    // console.log("done");
    return this.HttpClient.get('http://127.0.0.1:8000/api/products');

  }

  getAllProducts():Observable<getAllProductsData> {
         const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})
if(localStorage.getItem('token')!=null){
  return this.HttpClient.get<getAllProductsData>('http://127.0.0.1:8000/api/products',{headers});

}else{
    return this.HttpClient.get<getAllProductsData>('http://127.0.0.1:8000/api/productsWithOutLogin');
  }}


/////////////////Add product////////////////////
  storeData(data:any):Observable<Product[]>{
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.HttpClient.post<Product[]>('http://127.0.0.1:8000/api/products',data,{
      headers:headers
    });
  }

/////////////////Add  Purchases////////////////////
AddPurchases(product:Product):Observable<Product[]>{
  const headers=new HttpHeaders({
    // 'content-type' : 'application/json',
    // 'Content-Type':'multipart/form-data',
    'Access-Control-Allow-Origin' : '*',
    'Authorization':'Bearer '+localStorage.getItem('token')
  });
  return this.HttpClient.post<Product[]>('http://127.0.0.1:8000/api/purchases/'+product.id,product,{
    headers:headers
  });
}
  getAllProductsiid(category_id:any):Observable<getAllProductsData> {
    return this.HttpClient.get<getAllProductsData>('http://127.0.0.1:8000/api/product/'+category_id);
  }




  geteditData(id:number){
   return this.HttpClient.get('http://127.0.0.1:8000/api/products/'+id);

 }

  /////////////////Update product////////////////////
  updateData(id:number,data:any):Observable<Product[]>{
    console.log(data);
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+localStorage.getItem('token')
    });
    return this.HttpClient.post<Product[]>('http://127.0.0.1:8000/api/image/'+id,data,{
      headers:headers
    });
  }

  getDetailesOfProduct(id:number){
    console.log("done");
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

    return this.HttpClient.get('http://127.0.0.1:8000/api/productid/'+id);

    }
    addFavProduct(product:Product){


      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

      return this.HttpClient.get('http://127.0.0.1:8000/api/like/'+product.id,{headers});

    }
    getDataFav(id:any):Observable<getAllProductsData>{
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

      return this.HttpClient.get<getAllProductsData>('http://127.0.0.1:8000/api/showlike/'+id,{headers});

    }
    deleteFavOfUser(product:Product){
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

      return this.HttpClient.delete('http://127.0.0.1:8000/api/favdelete/'+product.id,{headers});
    }





}












