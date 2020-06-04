import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationComponent } from './notification/notification.component';
import { BarchartComponent } from './barchart/barchart.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    StudentComponent,
    SidebarComponent,
    NotificationComponent,
    BarchartComponent,
    ChatComponent,
],

  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    MatProgressBarModule
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StudentModule { }
