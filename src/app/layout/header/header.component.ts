import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { UserServicesService } from 'src/app/services/user-services.service';
import { Notifi } from 'src/app/_models/notiication.models';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  seller=parseInt(localStorage.getItem('user_id')!);
  notifi!:Notifi[];
  counter!:number;
  private updateSubscription!: Subscription;
  constructor(private router:Router,private service:UserServicesService) { }
   token:any
   senderID = parseInt(localStorage.getItem('user_id')!)

  ngOnInit(): void {
    // this.service.refreshNeeded.subscribe(()=>{
    //   this.requset(this.seller)
    // })
    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.requset(this.seller)});
    this.requset(this.seller)
  }
  requset(seller:number){
    this.service.request(seller).subscribe(
      (res)=>{

      this.notifi=res.data
      console.log(res.data)
      this.counter=this.notifi.length
      console.log(this.counter)
      
     },)
     
  }
logout(){

    localStorage.removeItem('token')

  this.router.navigate(['/login'])

}
loggedin(){
  return localStorage.getItem('token')
}


}
