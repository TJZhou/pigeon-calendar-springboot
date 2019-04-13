import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  currentDate = moment();
  startDate = this.currentDate.format('MM/DD/YY');
  startTime = this.currentDate.format('HH:MM');
  endTime = this.currentDate.add(1, 'h').format('HH:MM');
  endDate = this.startDate;

  
  constructor() { }

  ngOnInit() {
  }

}
