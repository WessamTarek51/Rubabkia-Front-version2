import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category.models';
import { CategoryServiceService } from './../../services/category-service.service';
import { Product } from 'src/app/_models/product.models';
import { ProductServiceService } from './../../services/product-service.service';
import { FormControl ,NgForm } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user.models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  productArray!:Product[];
  categoryArray!: Category[];
  editMode=false;
  product={} as Product;
  productuser!: User;
 Product_id:any;
  editproduct:any;
file:any;
imageData:any;
DirectImage:any='http://127.0.0.1:8000/public/products/';
   constructor(private CategoryService:CategoryServiceService ,
    private productService:ProductServiceService ,
    private userServer:UserServicesService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private FormBuilder:FormBuilder,
    )
    { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    console.log(this.activatedRoute.snapshot.url[0].path);

    if(this.activatedRoute.snapshot.url[0].path=='edit'){
      this.editMode=!this.editMode
    }



/////////////////return product by id  to edit in DB//////////////////////
this.Product_id=this.activatedRoute.snapshot.params['id'];

this.productService.geteditData(this.Product_id).subscribe(
  (res:any)=>{
      console.log(res.data);
     this.product=res.data;


  }
  )

      ///////////to select category //////////////////////

      this.CategoryService.getAllcategories().subscribe(
        (res:any)=>{
          this.categoryArray = res.data

        }
        )
  }


/////////////////////////////upload image//////////////////////

  uploadImage(event:any){
     this.file =event.target.files[0];

 console.log( this.file);
}

  ///////////////// (onSubmit) add/update product in DB   //////////////////////

  onSubmit(form:NgForm){

//////////////////////Add ///////////
    if(this.activatedRoute.snapshot.url[0].path=='add'){

      form.value.image=(this.file,this.file.name);
      const formm=new FormData();
       formm.append('image',this.file,this.file.image);
       formm.append('category_id',form.value.category_id);
       formm.append('name',form.value.name);
       formm.append('price',form.value.price);
       formm.append('description',form.value.description);

        this.productService.storeData(formm).subscribe(res=>{
            //  console.log(form.value);

    })

    this.router.navigateByUrl('profile/this.Product_id');
  }
////////////////////////edit//////////////
    else if(this.activatedRoute.snapshot.url[0].path=='edit'){
      console.log( this.file);


      const formm=new FormData();
      if(this.file!=undefined){
        form.value.image=(this.file,this.file.name);
        formm.append('image',this.file,this.file.image);
      }
       formm.append('category_id',form.value.category_id);
       formm.append('name',form.value.name);
       formm.append('price',form.value.price);
       formm.append('description',form.value.description);

        // this.userServer.deleteProductOfUser( this.product).subscribe(res=>{
        //   console.log(this.product);
        // this.productService.storeData(formm).subscribe(res=>{})
        // })
      this.productService.updateData(this.Product_id,formm).subscribe(res=>{});

        this.router.navigateByUrl('profile/this.Product_id');
    }

}




}
