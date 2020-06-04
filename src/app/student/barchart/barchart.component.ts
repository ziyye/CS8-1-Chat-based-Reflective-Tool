import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  course: Observable<any[]>;
  collection: any;


  constructor(firestore: AngularFirestore) { 

	this.course = firestore.collection('course').valueChanges();
	this.collection = firestore.collection('course');
	
  }

  ngOnInit(): void {

	

	}

   
}
