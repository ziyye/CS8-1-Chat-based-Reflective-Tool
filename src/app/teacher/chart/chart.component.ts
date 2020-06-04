import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  doughnutChartLabels: Label[] = ['Submitted', 'Unsubmitted', 'Difficult','Breakthrough'];
  doughnutChartData: MultiDataSet = [];
  // 
  doughnutChartType: ChartType = 'doughnut';
  units_dataset: any;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  units: Observable<any[]>;
  collection: any;



  constructor(firestore: AngularFirestore,private auth: AuthService) { 
    this.units = firestore.collection('unites').valueChanges();
    this.collection = firestore.collection('unites');
    
  }


  ngOnInit(): void {
      this.auth.resultLogList();

      this.units.subscribe(units=>{

        this.units_dataset = units;
        // console.log(this.units_dataset)
        for(let item of this.units_dataset){
          //  console.log(item.num);
           this.doughnutChartData.push(item.num);
           console.log(item.num)
          
         }
         console.log(this.doughnutChartData);
      
    })

  }
  
  
  ChartData(id){
    
    return this.doughnutChartData[id];

  }

}
