import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TypeofExpr } from '@angular/compiler';
@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  public curDay;
  public curDayFormat: string;
  public timing;
  public timingArr = new Array(24);
  public weekday;
  public weekdayArr = new Array(7);
  public dateArr = new Array(7);
  public formatDate = new Array(7);
  public showEvent = true;

  constructor() {}

  ngOnInit() {
    this.curDay = moment().format('L');
    this.createTiming();
    this.createWeekday();
    this.createDate();
  }

  createTiming(): void {
    for (let i = 0; i < 10; i++) {
      this.timingArr[i] = '0' + i + ':00';
    }
    for (let i = 10; i < 24; i++) {
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
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = moment().subtract(moment().day() - i, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  isToday(date): boolean {
    return moment().format('MM/DD') === date.format('MM/DD');
  }

  previous() {
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = this.dateArr[i].subtract(7, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  next() {
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = this.dateArr[i].add(7, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  today() {
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = moment().subtract(moment().day() - i, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  onChangeDay(Day) {
    const numOfDay = moment().dayOfYear() - Day.dayOfYear();
    this.createDate();
    for (let i = 0; i < 7; i++) {
      if (numOfDay >= 0) {
        this.dateArr[i] = this.dateArr[i].subtract(7 * Math.floor(numOfDay / 7) + 7, 'd');
      } else {
        this.dateArr[i] = this.dateArr[i].add(7 * Math.floor(-numOfDay / 7), 'd');
      }
      this.formatDate[i] = this.dateArr[i].format('D');
    }
    console.log(this.dateArr);
  }
}
