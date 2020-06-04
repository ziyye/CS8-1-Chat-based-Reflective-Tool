import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarVisible: boolean = true;
  user: firebase.User;

  constructor(private auth: AuthService, 
    private router: Router, public route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.auth.isLoggedIn);
    console.log(this.auth.UserID)
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
      
  }

  logout() {

    this.auth.logout();
    this.auth.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
