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
  public dateArr = new Array(7);
  public formatDate = new Array(7);

  constructor() { }

  ngOnInit() {
    this.curDay = this.date.format('L');
    this.createTiming();
    this.createWeekday();
    this.createDate();
  }

  createTiming(): void {
    for ( let i = 0; i < 10; i++) {
      this.timingArr[i] = '0' + i + ':00';
    }
    for ( let i = 10; i < 24; i++) {
      this.timingArr[i] = i + ':00';
    }
  }

  createWeekday(): void {
      this.weekdayArr[0] = 'SUN';
      this.weekdayArr[1] = 'MON';
      this.weekdayArr[2] = 'TUE';
      this.weekdayArr[3] = 'WED';
      this.weekdayArr[4] = 'THU';
      this.weekdayArr[5] = 'FRI';
      this.weekdayArr[6] = 'SAT';
  }

  createDate(): void {
    for ( let i = 0; i < 7; i++) {
      this.dateArr[i] = moment().subtract(moment().day() - i, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  isToday(date): boolean {
    return moment().format('MM/DD') === date.format('MM/DD');
  }
}
