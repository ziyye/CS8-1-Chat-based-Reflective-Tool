import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';




@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  notifications: Observable<any[]>;
  content: String = "...";
  collection: any;




  constructor(firestore: AngularFirestore,private auth: AuthService) { 
    this.notifications = firestore.collection('notifications').valueChanges();
    this.collection = firestore.collection('notifications')

  }

  ngOnInit(): void {
  }

  detail_unread(item,id){
    this.content = item.content;   
    const data = {
      ifread: "read"
    }
    id = id + 1;
    console.log(id)
    this.collection.doc(id.toString()).update(data);
  


    // var dom : any = event.target;
  }
  detail_read(item){
    this.content = "Content:    "+ item.content;

    

  }

}
