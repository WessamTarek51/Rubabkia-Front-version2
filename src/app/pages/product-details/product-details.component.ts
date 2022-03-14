import { Product } from './../../_models/product.models';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productt!:Product[];
  product={} as Product;

  Product_id:any;
  constructor(private router: Router,private param:ActivatedRoute,private service:ProductServiceService, private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
//     this.getId=this.param.snapshot.paramMap.get('id');
//     console.log(this.getId,'getId');
//     if(this.getId){
//        this.productt= this.service.products.filter((value)=>{
//             return value.id==this.getId;
// });
//   }
  this.Product_id=this.activatedRoute.snapshot.params['id'];

  this.service.getDetailesOfProduct(this.Product_id).subscribe(
    (res:any)=>{
      console.log(res.data);
     this.product=res.data;


  }
  );
  }


 btnClick(id:number) {
        this.router.navigateByUrl('/chat/'+id);
};





}
