import { CalendarComponent } from './calendar/calendar.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(CalendarComponent)
  public curDay;
  public curDayFormat;
  public isSelected = true;
  public showDate = true;
  public weekdayFormat;

  title = 'calender';

  ngOnInit(): void {
  }

  // changeFlagTrue() {
  //   localStorage.setItem('isSelected', 'true');
  //   localStorage.setItem('showDate', 'true');
  // }
  // changeFlagFalse() {
  //   localStorage.setItem('isSelected', 'false');
  //   localStorage.setItem('showDate', 'false');
  // }
  // getSelected(): string {
  //   return localStorage.getItem('isSelected');
  // }
  // getShowDate(): string {
  //   return localStorage.getItem('showDate');
  // }
  onChangeDay(clickedDay) {
    this.curDay = clickedDay;
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
  currentDay() {
    this.curDay = moment();
    this.changeFormat();
  }

  changeFormat() {
    this.curDayFormat = this.curDay.format('MM/DD');
    this.weekdayFormat = this.curDay.format('ddd');
  }
}
