import { ProductServiceService } from './../../services/product-service.service';
import { Product } from './../../_models/product.models';
import { User } from './../../_models/user.models';
import { UserServicesService } from './../../services/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userID =this.param.snapshot.params['id'];
  userData!:User;
  constructor(private param:ActivatedRoute,private service:UserServicesService,private productServices:ProductServiceService) { }

  ngOnInit(): void {
this.getSenderById();
  }
  getSenderById(){
    this.service.getSenderById(this.userID).subscribe(res=>{
        console.log(res);
         this.userData=res.data;
    });
  }
  changFav(product:Product){
    console.log(product.id);
    console.log(product.isFav);

      if(product.isFav==true){
        this.productServices.deleteFavOfUser(product).subscribe(res=>{
          console.log (res.toString);

        });


      }
       else{
        this.productServices.addFavProduct(product).subscribe(res=>{
          console.log (res.toString);

        });

       }
       product.isFav=!product.isFav


      }
      AddPruchases(product:Product){
        this.productServices.AddPurchases (product).subscribe(res=>{})
     }


    buyProduct(product:Product){

      this.service.buyProduct(product).subscribe(res=>{
      });
      }
    


}
