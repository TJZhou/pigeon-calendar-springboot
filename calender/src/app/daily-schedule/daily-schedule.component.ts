import { Component, OnInit, Input, Output } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {

  @Output() public curDay;
  public curDayFormat: string;
  public timing;
  public timingArr = new Array(24);
  public showEvent = true;
  public subDay;

  constructor() { }

  ngOnInit() {
    this.curDay = moment();
    this.curDayFormat = this.curDay.format('MM/DD');
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

  today() {
    this.curDay = moment();
    this.changeFormat();
  }
  previous() {
    this.curDay = this.curDay.subtract(1, 'd');
    this.changeFormat();
  }
  next() {
    this.curDay = this.curDay.add(1, 'd');
    this.changeFormat();
  }
  changeFormat() {
    this.curDayFormat = this.curDay.format('MM/DD');
  }

   onChangeDay(Day) {
    this.subDay = Day.dayOfYear() - moment().dayOfYear();
    this.curDay = moment().add(this.subDay, 'd');
    this.changeFormat();
  }
}
