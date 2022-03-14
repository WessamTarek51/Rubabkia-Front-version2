import { Router } from '@angular/router';
import { User } from './../../../_models/user.models';
import { UserServicesService } from './../../../services/user-services.service';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getDatabase, ref, onValue } from "firebase/database";

@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.component.html',
  styleUrls: ['./listchat.component.css']
})
export class ListchatComponent implements OnInit {
  users!:User[];
  chatRef!: AngularFireList<Number> ;
  userIDs:Number[] = [];
  currentUserId = parseInt(localStorage.getItem('user_id')!)
  showSppiner:boolean = true;


  constructor(private service:UserServicesService,private router:Router) {

    const db = getDatabase();
    const dbRef = ref(db, '/chat/' + this.currentUserId);


   onValue(dbRef, (snapshot) => {
    snapshot.forEach((child) => {
      const key = child.key;
      this.userIDs.push(parseInt(key!))
    }

    );
    this.getUsers();
  },
  {
    onlyOnce: true
  });


  }

  getUsers(){

    this.service.getUsers(this.userIDs).subscribe(res=>{
        console.log(res);
         this.users=res;
         this.showSppiner=false;

    });
  }

  onChatClick(id:number){
    console.log(id)
    this.router.navigateByUrl('/chat/'+id);
  }



  ngOnInit(): void {
  }

}
