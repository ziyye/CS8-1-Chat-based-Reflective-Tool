import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ChartsModule } from 'ng2-charts';
import { ListsComponent } from './lists/lists.component';
@NgModule({
  declarations: [TeacherComponent, SidebarComponent,NotificationsComponent, ChartComponent, ListsComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ScrollingModule,
    MatProgressBarModule,
    ChartsModule
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TeacherModule { }
