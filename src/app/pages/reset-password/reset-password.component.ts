import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserServicesService } from './../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token:any;
  file:any;
  form!:FormGroup;
  submitted=false;
  data:any;
  show:boolean=false;
  constructor(private formbuilder:FormBuilder,private userservice:UserServicesService
    ,private toaster:ToastrService,private router:Router,private activeroute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(param=>{
      this.token=param['token'] 
      console.log(this.token)
    })
    this.createform();
  }
  createform(){
    this.form=new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmpassword:new FormControl('',Validators.required)
   })
  this.form.setValidators(this.MustMatch('password','confirmpassword'))

  }
  public MustMatch(controlName:string,matchingControlName:string):any{
    return (formgroup:FormGroup)=>{
           const control=formgroup.controls[controlName];
           const matchingcontrol=formgroup.controls[matchingControlName];
 
           if(matchingcontrol.errors && !matchingcontrol.errors['mustMatch']){
                 return;
           }
           if(control.value !== matchingcontrol.value){
               matchingcontrol.setErrors({mustMatch:true});
           }
           else{
             matchingcontrol.setErrors(null);
           }
           }
 }
  get f(){
     return this.form.controls;
  }
  submit(){
    this.submitted=true;
    if(this.form.invalid){
      return;
    }
    const password=this.form.get('password')?.value
    const confirmpass=this.form.get('confirmpassword')?.value
    
    this.userservice.resetpass(this.token,password,confirmpass).subscribe(res=>{
      this.data=res
      console.log(this.data);
      if(this.data.status === 1){
        this.toaster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true
        });
        this.router.navigate([''])

        // this.submitted=false
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
