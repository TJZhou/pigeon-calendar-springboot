import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {

  public date = moment();
  public curDay: string;
  public timing;
  public timingArr = new Array(24);
  public weekday;
  public weekdayArr = new Array(7);

  constructor() { }

  ngOnInit() {
    this.curDay = this.date.format('L');
    this.createTiming();
    this.createWeekday();
  }

  createTiming() {
    for ( let i = 0; i < 10; i++) {
      this.timingArr[i] = '0' + i + ':00';
    }
    for ( let i = 10; i < 24; i++) {
      this.timingArr[i] = i + ':00';
    }
  }

  createWeekday() {
      this.weekdayArr[0] = 'SUN  ' + (moment().date() - moment().day());
      this.weekdayArr[1] = 'MON  ' + (moment().date() - moment().day() + 1);
      this.weekdayArr[2] = 'TUE  ' + (moment().date() - moment().day() + 2);
      this.weekdayArr[3] = 'WED  ' + (moment().date() - moment().day() + 3);
      this.weekdayArr[4] = 'THU  ' + (moment().date() - moment().day() + 4);
      this.weekdayArr[5] = 'FRI  ' + (moment().date() - moment().day() + 5);
      this.weekdayArr[6] = 'SAT  ' + (moment().date() - moment().day() + 6);
  }
}
