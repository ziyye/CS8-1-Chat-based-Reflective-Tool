
import { AuthService } from '../../auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Message } from '../../auth/module/message'
import { ChatService } from '../../auth/chat.service'
import { LogItem } from '../../auth/module/logitem';
import {Notification} from '../../auth/module/notification';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user: firebase.User;
  public message : Message;
  public messages : Message[];
  msgArray = [];
  logitems: LogItem[];
  public num:number=0;
  unites: Notification[];
  units_dataset = [];

  // Code for Scrolling
  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(ChatComponent, { read: ElementRef }) chatItems: QueryList<ChatComponent>;
  LogData = [];

  constructor(private firestore: AngularFirestore, private http: HttpClient,private chatService : ChatService, private auth: AuthService, 
    private router: Router, public route:ActivatedRoute) {
      this.message = new Message('', 'assets/images/user.png', new Date());
  	  this.messages = [
  	    new Message('I am your friend Chatbot.', 'assets/images/bot.png', new Date())
      ];
      
      
     
  }

  ngOnInit(): void {
    // console.log(this.auth.isLoggedIn);
    // console.log(this.auth.UserID)
   
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
    
    // console.log(this.LogArray)
  }




  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  } 


  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = "e0caf8b2c68540ff9bfc1459155a65fc";

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '1234567'
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'assets/json;charset=utf-8',
        'Authorization': "Bearer "+this.token
      })
    };
    
    return this.http
    .post(`${this.baseURL}`, data,  httpOptions)
    

  }
  clearMessage(){
    this.message = new Message('', 'assets/images/user.png', new Date());
  	  this.messages = [
  	    new Message('Good day! Mate!', 'assets/images/bot.png', new Date())
      ];
      this.logAnalysis()
  }
  sendMessage(){

    // this.message["timestamp"] = new Date();
    this.messages.push(this.message);
    this.msgArray.push(this.message["content"]);
    this.num ++;
    this.chatService.getResponse(this.message["content"]).subscribe(res => {
      this.messages.push(
         new Message(res.result.fulfillment.speech, 'assets/images/bot.png' ,new Date())
      );
      this.msgArray.push(res.result.fulfillment.speech)
      this.scrollToBottom();
      this.auth.insertLogData( 
        this.auth.UserID,
        this.auth.UserName,
        this.msgArray);
      
      // console.log( this.msgArray)
    });
    
    this.message = new Message('', 'assets/images/user.png', new Date);
  }

  public LogArray =["Do you have any questions about the content of Rnn that the teacher said",
  "Do you understand the description of C++ this semester"];
  public sigWord = ["what progress have you make","aaaa"];
  private logAnalysis(){
    this.auth.getLogItems().subscribe(logitems=>{
      this.logitems = logitems;
      for(let logitem of this.logitems){
        console.log(logitem);
        if(logitem.id == this.auth.UserID){
          for(let problem of logitem.problems){
            this.LogData.push(problem)
          }         
        }
        
        for(var j =0;j<this.LogData.length;j++){
          let word:string = this.LogData[j];  
          console.log(this.LogData[j]) 
          for(var i=0;i<this.LogArray.length;i++){
            // console.log(word.indexOf(this.sigWord[0]))
            if(word.indexOf(this.LogArray[i])!=-1){
              this.auth.insertLogResult("Quiz1",logitem.id,this.LogData[j+1],"difficult")                                      
            } 
            if(word.indexOf(this.sigWord[i])!=-1){
              this.auth.insertLogResult("Quiz1",logitem.id,this.LogData[j+1],"significant")  

            }
          }
        } 
      }       
    })   
  }
 

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

}



