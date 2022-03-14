import { Product,getAllProductsData } from './../../_models/product.models';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { UserServicesService } from 'src/app/services/user-services.service';
import { UserData } from 'src/app/_models/data.model';
import { User } from 'src/app/_models/user.models';
import { Purchase } from './../../_models/purchase.models';
import { getAllCategoryData } from 'src/app/_models/category.models';
import { ActivatedRoute,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})

export class ProductListingComponent implements OnInit {
  product = {} as Product;
productData!:Product[];
token:any=localStorage.getItem('token');
fav:boolean=false;
// Purchasedata:getAllCategoryData | undefined;
Purchasedata!:Product[];
totalLength:any;
page:number=1;
Purchase={} as Product;
dataCat:any;
user!:User;
data!:UserData;
searchText!:string;
Product_id: any;

search(){

  this.service.getAllProducts().subscribe(
    (res)=>{

      this.productData= res.data.filter(value => value.name.match(this.searchText)  || value.price <= this.searchText )
      // this.productData = res.data;

    },)
  console.log(this.searchText);
  console.log(this.searchText);
}
searchas(){
  this.service.getAllProducts().subscribe(
    (res)=>{

      this.productData= res.data
      // this.productData = res.data;

    },

  )
}


  constructor(public service:ProductServiceService ,
    private userService:UserServicesService,
    private activatedRoute:ActivatedRoute,private toaster:ToastrService,private router:Router) { }
  // productselected!:number;
  ngOnInit(): void {


    this.service.getAllProducts().subscribe(
      (res)=>{
        this.productData = res.data;
      },

    )
  }
  changFav(product:Product){
    if(!this.token){
      this.router.navigate(['login'])
    }
    else{
console.log(product.id);
console.log(product.isFav);

  if(product.isFav==true){
    this.service.deleteFavOfUser(product).subscribe(res=>{
      console.log (res.toString);

    });


  }
   else{
    this.service.addFavProduct(product).subscribe(res=>{
      console.log (res.toString);

    });

   }
   product.isFav=!product.isFav

    }
  }

  // onFav(product:Product){
  //  this.service.favProduct(product);
  // }
  getproduct(){
    this.service.getData().subscribe(res=>{
      //let profile=JSON.parse(res.toString())

        //  console.log(profile);
        console.log(res);

        //  this.product=res.data;
         console.log(this.product);

    });
  }


///////////////////delete product to add it in purchases/////////////
AddPruchases(product:Product){
    this.service.AddPurchases (product).subscribe(res=>{})
 }


buyProduct(product:Product){
  if(!this.token){
    this.router.navigate(['login'])
  }
  else{
  this.userService.buyProduct(product).subscribe(res=>{
    this.toaster.success(JSON.stringify(res.message),JSON.stringify(res.code),{
      timeOut:2000,
      progressBar:true
    });
  });
}
  }
}

// deleteProduct(product:Product){
//   this.userService.deleteProductOfUser(product).subscribe(res=>{
//    console.log(product);
//  this.service.AddPurchases (product).subscribe(res=>{
//  });

// })

// }








