import { UserData } from './../../_models/data.model';
import { User } from './../../_models/user.models';
import { UserServicesService } from './../../services/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Message } from 'src/app/_models/message.models';


@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {
  sender!:User;
  receiver!:User;
  data!:UserData;
  showSppiner:boolean = true;



  senderRef!: AngularFireList<Message> ;
  receiverRef!: AngularFireList<Message> ;
  messages!:Message[];
  messageObj!:Message
  @ViewChild('messageInput') messageElement!: ElementRef;

  receiverID =this.param.snapshot.params['id'];
  senderID = parseInt(localStorage.getItem('user_id')!)

  constructor(public db: AngularFireDatabase,private param:ActivatedRoute,private service:UserServicesService,){

    this.receiverID = parseInt(this.param.snapshot.paramMap.get('id')!);
    this.senderRef = db.list('/chat/' + this.senderID + '/' +this.receiverID);
    this.receiverRef = db.list('/chat/' + this.receiverID + '/' +this.senderID);
   this.getChatMessages();
this.getSenderById();
this.getReciverById();

  }

  getChatMessages() {
    this.senderRef!.valueChanges().subscribe(msgs=>{
      this.messages = msgs
      console.log(length + " " + this.messages[0].body)
      this.showSppiner=false;
   });
  }
  ngOnInit(): void {
  }


  sendMessage(message: string) {
    this.messageElement.nativeElement.value = ''


    this.messageObj ={
      body: message,
      senderID: this.senderID
    }
    this.senderRef.push(this.messageObj);
    this.receiverRef.push(this.messageObj);
  }

  getSenderById(){
    this.service.getSenderById(this.senderID).subscribe(res=>{
        console.log(res);
         this.sender=res.data;
    });
  }
  getReciverById(){
    this.service.getReciverById(this.receiverID).subscribe(res=>{
        console.log(res);
         this.receiver=res.data;
    });
  }


}
