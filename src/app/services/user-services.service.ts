import { Observable, Subject, tap } from 'rxjs';
import { UserData } from './../_models/data.model';


// import { Product } from './../_models/product.models';

import { User } from './../_models/user.models';
import { Injectable } from '@angular/core';
import { Product } from '../_models/product.models';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { NotificationData } from '../_models/nof.models';
import { Notifi } from '../_models/notiication.models';




@Injectable({
  providedIn: 'root'
})



export class UserServicesService {

  // user:User=
  //   {id:1,
  //   name:"basam",
  //   image:"https://source.unsplash.com/random/200x200?sig=1",
  //   product:[
  //   {id:1,
  //     name:"aaaaaaa",
  //     price:20,
  //     image:"https://source.unsplash.com/random/200x200?sig=3",
  //     description:"hhh jgugugb jhugui",
  //     category:{id:1,name:"clothes",image:"https://source.unsplash.com/random/200x200?sig=2"},
  //     user:{id:1,name:"basma",image:"https://source.unsplash.com/random/200x200?sig=3"},
  //     isFav:false,},
  //     {id:2,
  //     name:"bbbbbb",
  //     price:30,
  //     image:"https://source.unsplash.com/random/200x200?sig=2",
  //     description:"hhh jgugugb jhugui",
  //     category:{id:1,name:"clothes",image:"https://source.unsplash.com/random/200x200?sig=2"},
  //     user:{id:1,name:"basma",image:"https://source.unsplash.com/random/200x200?sig=3"},
  //     isFav:false,}]
  // };


  constructor(private http:HttpClient) { }
  private _refreshNeeded=new Subject<void>();
  get refreshNeeded(){
       return this._refreshNeeded
  }
  deleteProductOfUser(product:Product){
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

    return this.http.delete('http://127.0.0.1:8000/api/deleteproduct/'+product.id,{headers});
  }
//  addedprudect(product:Product){
//     console.log(product.name);
//    this.user.product?.push(product);
// }
authToken: any;
  getData():Observable<UserData>{
    // this.loadToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

    return this.http.get<UserData>('http://127.0.0.1:8000/api/profile',{ headers});
  }

  // public loadToken() {
  //   const token = localStorage.getItem('id_token');
  //   this.authToken = token;
  // }



    registeruser(data:any){
    const headers=new HttpHeaders()
  return this.http.post(environment.apiUrl+'/api/register',data,{
    headers:headers
     }
  );
    }
    loginuser(data:any){
      return this.http.post(environment.apiUrl+'/api/login',data)
        }
    forgetpass(email:string){
      return this.http.post(environment.apiUrl+'/api/forget',{email:email})
    }
    resetpass(token:any,password:string,confirmpass:string){
      const data={
        token:token,
        password:password,
        confirmpassword:confirmpass
      }

      return this.http.post(environment.apiUrl+'/api/reset',data)
    }

    verifyemail(token:any):Observable<any>{
     const header = new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer ' + token})
      return this.http.post(environment.apiUrl+'/api/email/verification-notification',null,{headers:header})
    }
    completeverify(token:any,id:any,hash:any):Observable<any>{
      const header = new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer ' + token})

       return this.http.get(environment.apiUrl+'/api/verify-email/'+id+'/'+hash,{headers:header})
     }

     edit(data:any):Observable<UserData>{
      const headers = new HttpHeaders({'Authorization': 'Bearer ' +localStorage.getItem('token')})

       return this.http.post<UserData>(environment.apiUrl+'/api/editProfile',data,{headers})
     }

//  addedprudect(product:Product){
//     console.log(product.name);
//    this.user.product?.push(product);
// }


    getUsers(userIDs:Number[]){
      const body = { 'id':userIDs};
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

      return this.http.post<User[]>('http://127.0.0.1:8000/api/userbyId',body,{headers});
    }
    getSenderById(senderID:Number){
      return this.http.get<UserData>('http://127.0.0.1:8000/api/user/'+senderID);

    }
    getReciverById(receiverID:Number){
      return this.http.get<UserData>('http://127.0.0.1:8000/api/user/'+receiverID);

    }


    buyProduct(product:Product):Observable<NotificationData>{
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})
      const body = { 'product_id':product.id,'seller_id':product.userid};

      return this.http.post<NotificationData>(environment.apiUrl+'/api/buy/'+product.id,body,{headers}).pipe(
        tap(()=>{
          this._refreshNeeded.next()
        })
      )



    }
    request(id:number):Observable<NotificationData>{
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')})

      return this.http.get<NotificationData>(environment.apiUrl+'/api/notification/'+id,{headers})
    }

    accept(nof:Notifi):Observable<Notifi[]>{
      console.log(nof);
      const headers=new HttpHeaders({
        'content-type' : 'application/json',
        // 'Content-Type':'multipart/form-data',
        'Access-Control-Allow-Origin' : '*',
        'Authorization':'Bearer '+localStorage.getItem('token')
      });

      return this.http.post<Notifi[]>(environment.apiUrl+'/api/purchases/'+nof.id_not,nof,{headers}).pipe(
        tap(()=>{
          this._refreshNeeded.next()
        })
      )

    }
    reject(id:number):Observable<Notifi[]>{
      const headers=new HttpHeaders({
        'content-type' : 'application/json',
        // 'Content-Type':'multipart/form-data',
        'Access-Control-Allow-Origin' : '*',
        'Authorization':'Bearer '+localStorage.getItem('token')
      });

      return this.http.delete<Notifi[]>(environment.apiUrl+'/api/nof/'+id,{headers}).pipe(
        tap(()=>{
          this._refreshNeeded.next()
        })
      )

    }





}
