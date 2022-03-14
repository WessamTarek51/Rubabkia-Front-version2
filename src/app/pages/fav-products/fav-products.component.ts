import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../_models/product.models';
import { ProductServiceService } from './../../services/product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav-products',
  templateUrl: './fav-products.component.html',
  styleUrls: ['./fav-products.component.css']
})
export class FavProductsComponent implements OnInit {
  productData!:Product[];
  senderID :any;
  user=parseInt(localStorage.getItem('user_id')!);


  constructor(public service:ProductServiceService, private param:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.senderID=this.param.snapshot.paramMap.get('id');
    if(this.senderID){
      this.service.getDataFav(this.senderID).subscribe(
        (res )=>{
console.log(res);
            this.productData=res.data

          // console.log(res.data)

          // console.log(this.categoryId)
        },

      )
}

  }

dataFav(senderID:number){
  this.service.getDataFav(senderID).subscribe(
    (res)=>{

      this.productData = res.data;
      console.log(res);

    },)
}
changFav(product:Product,senderID:number){
  // this.service.deleteProductOfUser(product);
  // console.log(this.user.products?.length);
  this.service.deleteFavOfUser(product).subscribe(res=>{
    // this.router.navigate(['/fav',this.user])
    product.isFav=!product.isFav

    this.dataFav(senderID)

  });

}
// changFav(product:Product){
//   console.log(product.id);
//   console.log(product.isFav);

//     if(product.isFav==true){
//       this.service.deleteFavOfUser(product).subscribe(res=>{
//         console.log (res.toString);

//       });


//     }

//      product.isFav=!product.isFav


//     }

}
