import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserServicesService } from './../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  token:any;
  form!:FormGroup;
  submitted=false;
  data:any;
  constructor(private formbuilder:FormBuilder,private userservice:UserServicesService
    ,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createform();
  }
  createform(){
    this.form=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
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
   const email=this.form.get('email')?.value
   console.log(email)
   this.userservice.forgetpass(email).subscribe(res=>{
     this.data=res
    
     console.log(this.data);
     if(this.data.status === 1){
      //  this.token=this.data.access_token
      //  localStorage.setItem('token',this.token)
      //  this.router.navigate([''])

       this.toaster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
         timeOut:2000,
         progressBar:true
       });
      }
     else{
       this.toaster.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
         timeOut:2000,
         progressBar:true
       });
     }
    

       
   
   })
 }

 

}

