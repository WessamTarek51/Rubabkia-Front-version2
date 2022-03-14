import { Component, OnInit } from '@angular/core';
import { UserServicesService } from './../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent implements OnInit {
url:any;
id:any;
hash:any;
result:any;
token=localStorage.getItem('token')
  constructor(private userservice:UserServicesService
    ,private toaster:ToastrService,private router:Router,private activeroute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(param=>{
      this.url=param['email_verify_url'] 
      console.log(this.url)
   const urlarray= this.url.split('/')
   this.id=urlarray[5]
   this.hash=urlarray[6].split('?')[0]
   console.log(this.hash)
    })
  }
  verify(){
    this.userservice.completeverify(this.token,this.id,this.hash).subscribe(res=>{
      console.log(res)
      this.result=res
      if(this.result.status === 1){
        this.toaster.success(JSON.stringify(this.result.message),JSON.stringify(this.result.code),{
          timeOut:2000,
          progressBar:true
        });
        
      }
      else{
        this.toaster.info(JSON.stringify(this.result.message),JSON.stringify(this.result.code),{
          timeOut:2000,
          progressBar:true
        });
      }
      this.router.navigate([''])
    })
  }

}
