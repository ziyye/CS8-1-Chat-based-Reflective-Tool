import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Item } from '../auth/module/item';
import { map } from 'rxjs/operators';
import { LogItem } from './module/logitem';
import { Unites } from './module/unites';
import {Notification} from '../auth/module/notification';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  private loggedInStatus;
  // redirectUrl: string;
  uid:any;
  uname:any;
  newUser: any;
  userid=Number((Math.random() * (9999 - 1000 + 1)+ 1000).toFixed(0));
  
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  logitemsCollection: AngularFirestoreCollection<LogItem>;
  logitems: Observable<LogItem[]>;
  stateCollection: AngularFirestoreCollection<Notification>;
  logstate: Observable<Notification[]>;
  unitesCollection: AngularFirestoreCollection<Unites>;
  logunites:Observable<Unites[]>;
  


  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
      this.itemsCollection = db.collection<Item>('Users');
      this.items = this.itemsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      this.logitemsCollection = db.collection<LogItem>('names');
      this.logitems = this.logitemsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as LogItem;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      this.stateCollection = db.collection<Notification>('notification1');
      this.logstate = this.stateCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Notification;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      this.unitesCollection = db.collection<Unites>('notifications2');
      this.logunites = this.unitesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Unites;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }

    getItems(){
      return this.items;
    }
    getLogState(){
      return this.logstate;
    }
    getLogItems(){
      return this.logitems;
    }
    setLoggedIn(value: boolean) {
      this.loggedInStatus = value
    }
    get isLoggedIn() {
      return this.loggedInStatus
    }

    getUserState() {
      return this.afAuth.authState;
    }
    
    getUserId(id:any){
      this.uid=id;
      return this.uid;
    }
    get UserID(){
      return this.uid
    }
    getUserName(firstname:any,lastname:any){
      this.uname=firstname+lastname;
      return this.uname;
    }
    get UserName(){
      return this.uname
    }
    login( email: string, password: string,role:any,id:any){
      
      this.afAuth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          this.eventAuthError.next(error);
          
        })
        .then(userCredential => {
          if(userCredential) {
            if(role=='1'){
              this.setLoggedIn(true)
              this.router.navigateByUrl('/student');
              
            }else if(role == 2){
              this.setLoggedIn(true)
              this.router.navigateByUrl('/teacher');
            }
           
          }
        })
       
    }
  
    

    resetPassword(email:string){
      return this.afAuth.sendPasswordResetEmail(email).then(res=>{
        console.log('success',res); 
      }).catch(err=>{
        console.log(err);
      })
      
    }

    createUser(user:any) {
      console.log(user);
      this.afAuth.createUserWithEmailAndPassword( user.email, user.password)
        .then( userCredential => {
          this.newUser = user;
          console.log(userCredential);
          userCredential.user.updateProfile( {
            displayName: user.firstName + ' ' + user.lastName 
          });
  
          this.insertUserData(userCredential)
            .then(() => {
             
              this.router.navigate(['/login']);
            });
        })
        .catch( error => {
          this.eventAuthError.next(error);
        });
    }
  
   
    
  
    logout() {
      
      return this.afAuth.signOut();
    }

    insertUserData(userCredential: firebase.auth.UserCredential) {
      return this.db.doc(`Users/${userCredential.user.uid}`).set({
        email: this.newUser.email,
        firstname: this.newUser.firstName,
        lastname: this.newUser.lastName,
        role: this.newUser.occupation,
        id:this.userid
      })
    }
    insertLogData( id:any,names:any,problems:any) {
      
      console.log(this.UserName)
      return this.db.doc(`names/${this.UserID}`).set({     
        id:id,
        names:names,
        problems:problems
      })
      
    }
   
    insertLogResult(content: any,userid:any,result:any,state:string) {
      if(userid==this.UserID){
          this.db.doc(`notification1/${userid}`).set({
            content: content,
            names:this.UserName,
            id:this.UserID,
            problems:result,
            date:new Date,
            state:state
          })  
          
        this.resultLogList();

      }
    }

    resultLogList(){
      const num_array = [3,3];
      let DifflistNum=0;
      let SiglistNum = 0;
      const DifArray=[];
      const SigArray=[];
      this.getLogState().subscribe(unites=>{       
        for(let resultSta of unites){
          if(resultSta.state.search("difficult")!=-1){
            DifflistNum++;
            DifArray.push(resultSta.names)
          }else if(resultSta.state.search("significant")!=-1){
            SiglistNum++;
            SigArray.push(resultSta.names)
          }
        }  
        num_array.push(DifflistNum)
        num_array.push(SiglistNum)
        const data1 = {
          diff: DifArray,
          sig: SigArray
        }
        const data = {
          num: num_array
        }
        this.insertDifficultLog(data);
        this.insertlsitLog(data1);
        
  
  
      })
  
    }
  
    insertDifficultLog(data: any){
      return this.db.doc(`unites/1`).update(
       data
      )       
      
    }
    insertlsitLog(data: any){
      return this.db.doc(`list/1`).update(
       data
      )       
      
    }
  
    
}
