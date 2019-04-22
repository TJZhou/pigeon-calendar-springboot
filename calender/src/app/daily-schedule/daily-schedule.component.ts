import { CalendarComponent } from './../calendar/calendar.component';
import { AddEventComponent } from './../add-event/add-event.component';
import { Event } from './../models/event.model';
import { EventService } from './../services/event.service';
import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { EventDetailComponent } from '../event-detail/event-detail.component';
@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {

  @ViewChild(EventDetailComponent)   public eventDetailComponent: EventDetailComponent;
  @ViewChild(AddEventComponent)   public addEventComponent: AddEventComponent;
  @ViewChild(CalendarComponent)   public calendarComponent: CalendarComponent;
  @Output() curDay;
  public curDayFormat: string;
  public timing;
  public timingArr = new Array(24);
  public addEvent = true;
  public eventDetail = true;
  public subDay;
  public event: Event;
  public events;
  public haveEvent = new Array(24);
  public username;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // initialize current day, timing array and add all exsited events
    console.log(localStorage.getItem('username'));
    this.username = localStorage.getItem('username');

    this.curDay = moment();
    this.curDayFormat = this.curDay.format('MM/DD');
    this.createTiming();
    this.events = this.eventService.getEventsFromOneUser(this.username).subscribe( data => {
      this.events = data;
      // tslint:disable-next-line:prefer-for-of
      this.listEvent(this.curDay, this.events);
    });
    for (let i = 0; i < 24; i++) {
      this.haveEvent[i] = false;
    }
  }

  // list all events related to current user
  listEvent(d, e) {
    // const curMonth = parseInt(d.format('MM'), 0);
    const curDayOfYear = d.dayOfYear();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < e.length; i++) {
      const eventStartDayOfYear = moment(e[i].startTime.substr(0, 10), 'MM/DD/YYYY').dayOfYear();
      const eventEndDayOfYear = moment(e[i].startTime.substr(0, 10), 'MM/DD/YYYY').dayOfYear();
      if (curDayOfYear >= eventStartDayOfYear && curDayOfYear <= eventEndDayOfYear) {
        const start = parseInt(e[i].startTime.substr(11, 2), 0);
        const end = parseInt(e[i].endTime.substr(11, 2), 0);
        for (let j = start; j < end; j++) {
          this.haveEvent[j] = true;
          if ( j < 10 ) {
            if (document.getElementById('0' + j + ':00-2') !== null) {
              document.getElementById('0' + j + ':00-2').setAttribute('name', e[i]._id);
            }
          } else {
            if (document.getElementById(j + ':00-2') !== null) {
              document.getElementById(j + ':00-2').setAttribute('name', e[i]._id);
            }
          }
        }
        if (start < 10) {
          document.getElementById('0' + start + ':00-2').innerHTML = e[i].title;
        } else {
          document.getElementById(start + ':00-2').innerHTML = e[i].title;
        }
      }
    }
  }

  // create timing array from 00:00 to 23:00
  createTiming() {
    for ( let i = 0; i < 10; i++) {
      this.timingArr[i] = '0' + i + ':00';
    }
    for ( let i = 10; i < 24; i++) {
      this.timingArr[i] = i + ':00';
    }
  }

  // when click today button
  today() {
    this.curDay = moment();
    this.changeFormat();
    for (let i = 0; i < 24; i++) {
      this.haveEvent[i] = false;
    }
    this.listEvent(this.curDay, this.events);
    const month = this.calendarComponent.date.month();
    console.log(this.calendarComponent.date.month());
    if (moment().month() > month) {
      for (let i = 0; i < moment().month() - month; i++) {
        this.calendarComponent.nextMonth();
      }
    }
    if (moment().month() < month) {
      for (let i = 0; i < month - moment().month(); i++) {
        this.calendarComponent.prevMonth();
      }
    }
  }

  // previous day and next day
  previous() {
    for (let i = 0; i < 24; i++) {
      this.haveEvent[i] = false;
    }
    this.curDay = this.curDay.subtract(1, 'd');
    this.changeFormat();
    this.listEvent(this.curDay, this.events);
  }
  next() {
    for (let i = 0; i < 24; i++) {
      this.haveEvent[i] = false;
    }
    this.curDay = this.curDay.add(1, 'd');
    this.changeFormat();
    this.listEvent(this.curDay, this.events);
  }

  // change format from obj to string
  changeFormat() {
    this.curDayFormat = this.curDay.format('MM/DD');
  }

  // get the event emmited by calendar component, change day when clicked in calendar
   onChangeDay(Day) {
    this.subDay = Day.dayOfYear() - moment().dayOfYear();
    this.curDay = moment().add(this.subDay, 'd');
    this.changeFormat();
    for (let i = 0; i < 24; i++) {
      this.haveEvent[i] = false;
    }
    this.listEvent(this.curDay, this.events);
  }

  // show addEvent panel
  showAddEvent(timing) {
    this.addEvent = false;
    document.body.style.overflow = 'hidden';
    this.addEventComponent.startTimeTemp = timing;
    const time = parseInt(timing.substr(0, 2), 0);
    if (time < 9) {
      this.addEventComponent.endTimeTemp = '0' + (time + 1).toString() + ':00';
    } else {
      this.addEventComponent.endTimeTemp = (time + 1).toString() + ':00';
    }
    console.log(this.addEventComponent.startTimeTemp);
  }

  // show event detail panel
  showEventDetail(id) {
    this.eventDetail = false;
    document.body.style.overflow = 'hidden';
    console.log(id);
    this.eventService.getEvent(id).subscribe( data => {
      this.event = data[0];
      console.log(this.event);
      this.eventDetailComponent.eventTitle = this.event.title;
      this.eventDetailComponent.eventLocation = this.event.location;
      this.eventDetailComponent.eventStartTime = this.event.startTime;
      this.eventDetailComponent.eventEndTime = this.event.endTime;
    });
  }

  // if current div has an event or not
  isHaveEvent(i) {
    return this.haveEvent[i];
  }

  // close event detail panel
  onCloseEventDetail(e) {
    this.eventDetail = true;
    document.body.style.overflow = 'auto';
  }

  // close add event panel
  onCloseAddEvent(e) {
    this.addEvent = true;
    document.body.style.overflow = 'auto';
  }

  // save the new event
  onSaveAddEvent() {
    const start = parseInt(this.addEventComponent.startTimeTemp.substr(0, 2), 0);
    const end = parseInt(this.addEventComponent.endTimeTemp.substr(0, 2), 0);
    for (let i = start; i < end; i++) {
      this.haveEvent[i] = true;
    }
  }
}
