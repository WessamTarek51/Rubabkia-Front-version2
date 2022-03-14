import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserServicesService } from './../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
show:boolean=false;
token:any;
  form!:FormGroup;
  submitted=false;
  data:any;
  result:any;
  constructor(private formbuilder:FormBuilder,private userservice:UserServicesService
    ,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createform();
  }
  createform(){
    this.form=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),

  })
  }
  get f(){
    return this.form.controls;
 }
 submit(){
   this.submitted=true;
   if(this.form.invalid){
     return;
   }
   this.userservice.loginuser(this.form.value).subscribe(res=>{
     this.data=res

     // console.log(this.data);
     if(this.data.status === 1){
       this.token=this.data.access_token
       localStorage.setItem('token',this.token)
       localStorage.setItem('user_id',this.data.id)

       this.router.navigate([''])

       this.toaster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
         timeOut:2000,
         progressBar:true
       });
       this.router.navigate([''])
      }
     else{
       this.toaster.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
         timeOut:2000,
         progressBar:true
       });
     }




   })
   
  }

showpass(){
  this.show=!this.show
}

}
