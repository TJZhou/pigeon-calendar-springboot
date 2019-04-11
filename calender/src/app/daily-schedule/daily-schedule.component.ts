import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {

  public date = moment();
  public curDay: string;
  public timing;
  public timingArr = new Array(24);

  constructor() { }

  ngOnInit() {
    this.curDay = this.date.format('L');
    this.createTiming();
  }

  createTiming() {
    for ( let i = 0; i < 10; i++) {
      this.timingArr[i] = '0' + i + ':00';
    }
    for ( let i = 10; i < 24; i++) {
      this.timingArr[i] = i + ':00';
    }
  }
}
