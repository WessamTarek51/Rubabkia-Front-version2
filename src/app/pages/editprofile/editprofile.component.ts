import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserServicesService } from './../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  show:boolean=false;
  file:any;
  form!:FormGroup;
  submitted=false;
  data:any;
  username:any;
  address:any;
  email:any;
  phonenumber:any;
  gender:any;
  image:any;
  userid=localStorage.getItem('user_id')
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
  this.userservice.getData().subscribe(res=>{

      console.log(res['data']);
      this.username=res['data'].username;
      this.email=res['data'].email;
      this.address=res['data'].address;
      this.phonenumber=res['data'].phoneNumber;
      this.image=res['data'].image
      
      this.form.patchValue({
        name: this.username,
        email:this.email,
        phone_number:this.phonenumber,
        address:this.address,
       });
     console.log(this.username)
      
    
  });
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
    this.userservice.edit(formdata).subscribe(res=>{
      this.data=res
      console.log(this.data)
      if(this.data.status === 1){
        this.toaster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true
        });
        this.router.navigate(['profile',this.userid])
        
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
