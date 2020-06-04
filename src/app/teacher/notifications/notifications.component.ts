import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  notifications: Observable<any[]>;
  content: String = "...";
  collection: any;

  constructor(firestore: AngularFirestore) { 
    this.notifications = firestore.collection('notification1').valueChanges();
    this.collection = firestore.collection('notification1')

  }

  ngOnInit(): void {
  }

detail_unread(item,id){
  this.content = "Content:    "+ item.problems;
  id = id+1;
  const data = {
    ifread: "read"
  }
  this.collection.doc(id.toString()).update(data);

}
detail_read(item){

  this.content = "Content:    "+ item.problems;


}


}
