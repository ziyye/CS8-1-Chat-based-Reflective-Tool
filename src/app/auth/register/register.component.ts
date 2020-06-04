import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  authError: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }
  createUser(frm:any) {
    console.log(frm);
    this.auth.createUser(frm.value);
  }

}
