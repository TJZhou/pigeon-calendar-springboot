import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Output() changeDay = new EventEmitter<object>();
  @Output() changeWeeklyDay = new EventEmitter<object>();
  @Input()  curDay;
  public date = moment();
  public dateArr;
  public clickedDay;
  public day;

  constructor(private router: Router ) {
    console.log(this.router.url);

  }

  ngOnInit() {
    this.dateArr = this.createCalendar(this.date);
    this.clickedDay = this.date;
    this.changeDay.emit(this.clickedDay);
    console.log(this.clickedDay);
  }

  // if it returns true, marks the background of today as blue
  todayCheck(day) {
    if (day === null) {
      return;
    } else {
      return moment().format('L') === day.format('L');
    }
  }

  createCalendar(month) {
    const firstDay = moment(month).startOf('M');
    const days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });
    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  // git the next month or previous
  nextMonth() {
    this.date.add(1, 'M');
    this.dateArr = this.createCalendar(this.date);
  }
  prevMonth() {
    this.date.subtract(1, 'M');
    this.dateArr = this.createCalendar(this.date);
  }

  isSelected(day) {
    if (day === null || this.clickedDay === undefined || this.clickedDay === null) {
      return;
    } else {
      return this.curDay.format('MM/DD') === day.format('MM/DD');
    }
  }

  select(day) {
      this.clickedDay = day.format('MM/DD');
      this.day = day;
      if (this.router.url === '/week') {
      this.changeWeeklyDay.emit(day);
      }
      if (this.router.url === '/day') {
         this.changeDay.emit(this.day);
      }
  }
}
