import { Component, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
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
  @ViewChild(EventDetailComponent) public eventDetailComponent: EventDetailComponent;
  @ViewChild(AddEventComponent) public addEventComponent: AddEventComponent;
  public curDay;

  public curDayFormat: string;
  public timing;
  public timingArr = new Array(24);
  public weekday;
  public weekdayArr = new Array(7);
  public dateArr = new Array(7);
  public formatDate = new Array(7);
  public eventDetail = true;  // initialize all flag to true which means all child components will be hidden at first
  public addEvent = true;
  public editEvent = true;
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
    this.events = this.eventService
      .getEventsFromOneUser(this.username)
      .subscribe(data => {
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
      console.log(this.dateArr[i]);
      console.log(this.formatDate[i]);
    }
  }

  // list all events related to current user
  listEvent(d, e) {
    // tslint:disable-next-line:prefer-for-of
    console.log(d);
    d = d.subtract(d.day() + 1, 'd');
    for (let j = 0; j < 7; j++) {
      d.add(1, 'd');
      const curDayOfYear = d.dayOfYear();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < e.length; i++) {
        const eventStartDayOfYear = moment(e[i].startTime.substr(0, 10), 'MM/DD/YYYY').dayOfYear();
        const eventEndDayOfYear = moment(e[i].endTime.substr(0, 10), 'MM/DD/YYYY').dayOfYear();
        if ( curDayOfYear >= eventStartDayOfYear && curDayOfYear <= eventEndDayOfYear ) {
          const start = parseInt(e[i].startTime.substr(11, 2), 0);
          const end = parseInt(e[i].endTime.substr(11, 2), 0);
          for (let k = start; k < end; k++) {
            this.haveEvent[j][k] = true;
            if (k < 10) {
              if (document.getElementById(j + '-0' + k + ':00-2') !== null) {
                document
                  .getElementById(j + '-0' + k + ':00-2')
                  .setAttribute('name', e[i]._id);
              }
            } else {
              if (document.getElementById(j + '-' + k + ':00-2') !== null) {
                document
                  .getElementById(j + '-' + k + ':00-2')
                  .setAttribute('name', e[i]._id);
              }
            }
          }
          if (start < 10) {
            console.log(j + '-0' + start + ':00-2');
            document.getElementById(j + '-0' + start + ':00-2').innerHTML =
              e[i].title.substr(0, 6) + '...';
          } else {
            document.getElementById(j + '-' + start + ':00-2').innerHTML =
              e[i].title.substr(0, 6) + '...';
          }
        }
      }
    }
    this.curDay = this.curDay.subtract(4, 'd');
    console.log(this.curDay);
  }

  isToday(date): boolean {
    return moment().format('MM/DD') === date.format('MM/DD');
  }

  // previous week and next week
  previous() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.haveEvent[i][j] = false;
      }
    }
    this.curDay = this.curDay.subtract(7, 'd');
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = this.dateArr[i].subtract(7, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
    this.listEvent(this.curDay, this.events);
  }

  next() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.haveEvent[i][j] = false;
      }
    }
    this.curDay = this.curDay.add(7, 'd');
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = this.dateArr[i].add(7, 'd');
      this.formatDate[i] = this.dateArr[i].format('D');
    }
    console.log(this.curDay);
    console.log(this.dateArr);
    this.listEvent(this.curDay, this.events);
  }

  // current week
  today() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.haveEvent[i][j] = false;
      }
    }
    this.curDay = moment();
    for (let i = 0; i < 7; i++) {
      this.dateArr[i] = moment().subtract(moment().day() - i, 'd');
      this.formatDate[i] = this.dateArr[i].format('DD');
    }
   // this.listEvent(this.curDay, this.events);
  }

  // change when click the calendar
  onChangeDay(Day) {
    console.log(Day);
    const numOfDay = moment().dayOfYear() - Day.dayOfYear();
    this.curDay = moment().subtract(numOfDay, 'd');
    console.log(this.curDay);
    this.createDate();
    // for (let i = 0; i < 7; i++) {
    //   if (numOfDay >= 0) {
    //     this.dateArr[i] = this.dateArr[i].subtract(
    //       7 * Math.floor(numOfDay / 7),
    //       'd'
    //     );
    //   } else {
    //     this.dateArr[i] = this.dateArr[i].add(
    //       7 * Math.floor((-numOfDay - 1) / 7) + 7,
    //       'd'
    //     );
    //   }
    //   this.formatDate[i] = this.dateArr[i].format('D');
    // }
   // this.listEvent(this.curDay, this.events);
  }

  // show add event panel
  showAddEvent(timing, id) {
    this.addEvent = false;
    document.body.style.overflow = 'hidden';
    this.addEventComponent.startTimeTemp = timing;
    const time = parseInt(timing.substr(0, 2), 0);
    if (time < 9) {
      this.addEventComponent.endTimeTemp = '0' + (time + 1).toString() + ':00';
    } else {
      this.addEventComponent.endTimeTemp = (time + 1).toString() + ':00';
    }
    console.log(this.curDay);
    const day = this.curDay.subtract(
      this.curDay.day() - parseInt(id.substr(0, 1), 0),
      'd'
    );
    this.addEventComponent.startDateTemp = day.toDate();
    this.addEventComponent.endDateTemp = day.toDate();
    this.addEventComponent.dayOfWeek = day;
  }

  // if current div has an event or not
  isHaveEvent(i, j) {
    return this.haveEvent[i][j];
  }

  // close add event panel
  onCloseAddEvent() {
    this.addEvent = true;
    document.body.style.overflow = 'auto';
  }

  // save event which have been newly created
  onSaveAddEvent() {
    this.onCloseAddEvent();
    const start = parseInt(this.addEventComponent.startTime.substr(11, 2), 0);
    const end = parseInt(this.addEventComponent.endTime.substr(11, 2), 0);
    const dayOfWeek = this.addEventComponent.dayOfWeek.day();
    for (let i = start; i < end; i++) {
      this.haveEvent[dayOfWeek][i] = true;
    }
    if (start < 10) {
      document.getElementById(
        dayOfWeek + '-0' + start + ':00-2'
      ).innerHTML = this.addEventComponent.title;
    } else {
      document.getElementById(
        dayOfWeek + '-' + start + ':00-2'
      ).innerHTML = this.addEventComponent.title;
    }
  }

  // close event detail panel
  onCloseEventDetail() {
    this.eventDetail = true;
    document.body.style.overflow = 'auto';
  }

  // show event detail panel
  showEventDetail(dayOfWeek, id) {
    this.eventDetail = false;
    document.body.style.overflow = 'hidden';
    this.eventDetailComponent.dayOfWeek = parseInt(dayOfWeek.substr(0, 1), 0);
    this.eventService.getEvent(id).subscribe(data => {
      this.event = data[0];
      console.log(this.event);
      this.eventDetailComponent.eventTitle = this.event.title;
      this.eventDetailComponent.eventLocation = this.event.location;
      this.eventDetailComponent.eventStartTime = this.event.startTime;
      this.eventDetailComponent.eventEndTime = this.event.endTime;
    });
    this.eventDetailComponent.tempId = id;
  }

  // delete the current event
  onDeleteEvent() {
    this.onCloseEventDetail();
    let event;
    this.eventService
      .getEvent(this.eventDetailComponent.tempId)
      .subscribe(data => {
        event = data;
        this.events = this.events.filter(
          h => h.id !== this.eventDetailComponent.tempId
        );
        for (
          let i = parseInt(event[0].startTime.substr(11, 2), 0);
          i < parseInt(event[0].endTime.substr(11, 2), 0);
          i++
        ) {
          this.haveEvent[this.eventDetailComponent.dayOfWeek][i] = false;
        }
      });
  }

   // edit the current event
  onEditEvent() {
    this.onCloseEventDetail();
    this.editEvent = false;
    document.body.style.overflow = 'hidden';
  }
  onCloseEditEvent() {
      this.editEvent = true;
      document.body.style.overflow = 'auto';
  }
  // update event
  onUpdateEvent() {
      this.editEvent = true;
      document.body.style.overflow = 'auto';
  }
}
