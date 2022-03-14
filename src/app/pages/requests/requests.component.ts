import { UserServicesService } from 'src/app/services/user-services.service';
import { Component, OnInit } from '@angular/core';
import { NotificationData } from 'src/app/_models/nof.models';
import { Notifi } from 'src/app/_models/notiication.models';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  seller=parseInt(localStorage.getItem('user_id')!);
  data!:NotificationData;
  notifi!:Notifi[];
  
  constructor(private service:UserServicesService ) { }

  ngOnInit(): void {
    this.service.refreshNeeded.subscribe(()=>{
      this.requset(this.seller)
    })
   this.requset(this.seller)
  }
  requset(seller:any){
    this.service.request(seller).subscribe(
      (res)=>{

      this.notifi=res.data
      console.log(res.data)
      console.log(this.notifi)
      // console.log(this.notifi[0].id)
      console.log
      },)
  }
  accept(nof:Notifi,seller:number){

    this.service.accept(nof).subscribe(
      (res)=>{
      },)
      this.requset(seller);

  }
  reject(id:number,seller:number){
    this.service.reject(id).subscribe(
      (res)=>{
      },)
      this.requset(seller);

  }
  }


