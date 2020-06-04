import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Item } from '../../auth/module/item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any;
  items: Item[];

  constructor(public router:Router,private auth: AuthService) {
    
   }

  ngOnInit(): void {
    console.log(this.auth.isLoggedIn);
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
   
  }
  login(frm:any) {
    
    this.auth.getItems().subscribe(items => {
     
      this.items = items;
      for(let item of items){
        // {{ item.email }}
        if(item.email == frm.value.email){
          // return item.role;
          // console.log(item.id);
          this.auth.getUserId(item.id);
          this.auth.getUserName(item.firstname,item.lastname);
          this.auth.login(frm.value.email, frm.value.password,item.role,item.id);
        }
        
      }
    });
 
  }
  
  onRegister(){
    this.router.navigate(['/register']);
  }
  

}