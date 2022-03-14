import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserServicesService } from './../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  file:any;
  form!:FormGroup;
  submitted=false;
  data:any;
  show:boolean=false;
  constructor(private formbuilder:FormBuilder,private userservice:UserServicesService
    ,private toaster:ToastrService,private router:Router ) { }

  ngOnInit(): void {
    this.createform();
  }
  createform(){
    this.form=new FormGroup({
    name: new FormControl(null,Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    phone_number:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]),
    confirmpassword:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required)
   
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
    const formdata=new FormData();
    formdata.append("name",this.form.get('name')?.value)
    formdata.append("address",this.form.get('address')?.value)
    formdata.append("email",this.form.get('email')?.value)
    formdata.append("password",this.form.get('password')?.value)
   
    formdata.append("phone_number",this.form.get('phone_number')?.value)
    formdata.append('image',this.file,this.file.name)
    console.log(formdata)
    this.userservice.registeruser(formdata).subscribe(res=>{
      this.data=res
      // console.log(this.data);
      if(this.data.status === 1){
        this.toaster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true
        });
        this.submitted=false
        this.form.get('name')?.reset()
        this.form.get('password')?.reset()
        this.form.get('confirmpassword')?.reset()
        this.form.get('email')?.reset
        this.form.get('phone_number')?.reset()
        this.form.get('address')?.reset()
        this.form.get('email')?.reset()
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
  
  imageupload(event:any){
    this.file=event.target.files[0];
    console.log(this.file);
  }
  
  showpass(){
    this.show=!this.show
  }

}
