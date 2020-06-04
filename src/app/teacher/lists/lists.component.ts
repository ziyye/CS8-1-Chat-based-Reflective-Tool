import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  units: Observable<any[]>;
  selected_task: any;
  button = 'unsubmitted';
  collection: any;
  units_dataset = [];
  selected_dataset = [];


  constructor(private firestore: AngularFirestore, private auth: AuthService) { 
    this.units = firestore.collection('list').valueChanges();
    this.collection = firestore.collection('list')

  }

  ngOnInit(): void {
    this.auth.resultLogList();

    this.units.subscribe(units=>{

      for(let item of units){

        this.units_dataset.push(item);
        
       }
       console.log(this.units_dataset);
       this.selected_task = this.units_dataset[0].name;
  })
      
    
  }
  
  


  click_un(){
    this.button = "unsubmitted";
  }
  click_sub(){
    this.button = "submitted";
  }
  click_diff(){
    this.button = "diff";
  }
  click_sig(){
    this.button = "sig";
  }
}
