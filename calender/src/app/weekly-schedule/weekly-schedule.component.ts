import { Component, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { TypeofExpr } from '@angular/compiler';
import { AddEventComponent } from './../add-event/add-event.component';
import { Event } from './../models/event.model';
import { EventService } from './../services/event.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { CalendarComponent } from './../calendar/calendar.component';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  @Output() public curDay;
  public curDayFormat: string;
  public timing;
  public timingArr = new Array(24);
  public weekday;
  public weekdayArr = new Array(7);
  public dateArr = new Array(7);
  public formatDate = new Array(7);
  public eventDetail = true;
  public addEvent = true;
  public username;
  public event: Event;
  public events;
  public haveEvent = new Array(7);

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // initialize current day and schedule array
    this.username = localStorage.getItem('username');
    this.curDay = moment();
    this.curDayFormat = this.curDay.format('L');
    this.createTiming();
    this.createWeekday();
    this.createDate();
    for (let i = 0; i < 7; i++) {
        this.haveEvent[i] = new Array(24);
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.haveEvent[i][j] = false;
      }
    }
    this.events = this.eventService.getEventsFromOneUser(this.username).subscribe( data => {
      this.events = data;
      console.log(this.events);
      // tslint:disable-next-line:prefer-for-of
      this.listEvent(this.curDay, this.events);
    });
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

  // list all events related to current user
  listEvent(d, e) {
    // const curMonth = parseInt(d.format('MM'), 0);
    const curDayOfYear = d.dayOfYear();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.length; i++) {
      for (let j = 0; j < 7; j++) {
      const eventStartDayOfYear = moment(e[i].startTime.substr(0, 10), 'MM/DD/YYYY').dayOfYear();
      const eventEndDayOfYear = moment(e[i].endTime.substr(0, 10), 'MM/DD/YYYY').dayOfYear();
      if (curDayOfYear >= eventStartDayOfYear && curDayOfYear <= eventEndDayOfYear) {
        const start = parseInt(e[i].startTime.substr(11, 2), 0);
        const end = parseInt(e[i].endTime.substr(11, 2), 0);
        for (let k = start; k < end; k++) {
          this.haveEvent[j][k] = true;
          // if ( j < 10 ) {
          //   if (document.getElementById('0' + j + ':00-2') !== null) {
          //     document.getElementById('0' + j + ':00-2').setAttribute('name', e[i]._id);
          //   }
          // } else {
          //   if (document.getElementById(j + ':00-2') !== null) {
          //     document.getElementById(j + ':00-2').setAttribute('name', e[i]._id);
          //   }
          // }
        }
        // if (start < 10) {
        //   document.getElementById('0' + start + ':00-2').innerHTML = e[i].title;
        // } else {
        //   document.getElementById(start + ':00-2').innerHTML = e[i].title;
        // }
      }
    }
    }
  }

  isToday(date): boolean {
    return moment().format('MM/DD') === date.format('MM/DD');
  }

  previous() {
    this.curDay = this.curDay.subtract(7, 'd');
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = this.dateArr[i].subtract(7, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  next() {
    this.curDay = this.curDay.add(7, 'd');
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = this.dateArr[i].add(7, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  today() {
    this.curDay = moment();
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = moment().subtract(moment().day() - i, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
  }

  onChangeDay(Day) {
    const numOfDay = moment().dayOfYear() - Day.dayOfYear();
    this.curDay = moment().subtract(numOfDay, 'd');
    this.createDate();
    for (let i = 0; i < 7; i++) {
      if (numOfDay >= 0) {
        this.dateArr[i] = this.dateArr[i].subtract(7 * Math.floor(numOfDay / 7), 'd');
      } else {
        this.dateArr[i] = this.dateArr[i].add(7 * Math.floor((-numOfDay - 1) / 7) + 7, 'd');
      }
      this.formatDate[i] = this.dateArr[i].format('D');
    }
    console.log(this.dateArr);
  }

  showAddEvent() {
    this.addEvent = false;
    document.body.style.overflow = 'hidden';
  }

  onCloseAddEvent(e) {
    this.addEvent = true;
    document.body.style.overflow = 'auto';
  }

  onSaveAddEvent() {
    this.addEvent = true;
    document.body.style.overflow = 'auto';
  }

  showEventDetail() {
    this.eventDetail = false;
    document.body.style.overflow = 'hidden';
  }

  onCloseEventDetail() {
    this.eventDetail = true;
    document.body.style.overflow = 'auto';
  }
  // if current div has an event or not
  isHaveEvent(i, j) {
    return this.haveEvent[i][j];
  }
}
