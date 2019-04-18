import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { EventDetailComponent } from '../event-detail/event-detail.component';
@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {

  @ViewChild(EventDetailComponent)
  @Output() curDay;
  public curDayFormat: string;
  public timing;
  public timingArr = new Array(24);
  public addEvent = true;
  public eventDetail = true;
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

  showEventDetail() {
    this.eventDetail = false;
    document.body.style.overflow = 'hidden';
  }
  onCloseEventDetail(e) {
    console.log(11111);
    this.eventDetail = e;
    document.body.style.overflow = 'auto';
  }
}
