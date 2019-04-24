import { Component, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { AddEventComponent } from './../add-event/add-event.component';
import { Event } from './../models/event.model';
import { EventService } from './../services/event.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { CalendarComponent } from './../calendar/calendar.component';
import { EditEventComponent } from '../edit-event/edit-event.component';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  @ViewChild(EventDetailComponent) public eventDetailComponent: EventDetailComponent;
  @ViewChild(AddEventComponent) public addEventComponent: AddEventComponent;
  @ViewChild(EditEventComponent) public editEventComponent: EditEventComponent;
  @ViewChild(CalendarComponent) public calendarComponent: CalendarComponent;
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
        // tslint:disable-next-line:prefer-for-of
        this.listEvent(this.curDay, this.events);
        this.curDay = this.curDay.subtract((6 - moment().day()), 'd');
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
    // tslint:disable-next-line:prefer-for-of
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
            // if(e[i].title.length)
            document.getElementById(j + '-0' + start + ':00-2').innerHTML =
              e[i].title;
          } else {
            document.getElementById(j + '-' + start + ':00-2').innerHTML =
              e[i].title;
          }
        }
      }
    }
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
    this.curDay = this.curDay.subtract((6 - moment().day()), 'd');
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
    this.listEvent(this.curDay, this.events);
    this.curDay = this.curDay.subtract((6 - moment().day()), 'd');
  }

  // current week
  today() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.haveEvent[i][j] = false;
      }
    }
    this.curDay = moment();
    let loop = (this.curDay.dayOfYear() - moment().day() - this.dateArr[0].dayOfYear()) / 7;
    if (loop < 0) {
      loop = -loop;
      for (let j = 0; j < loop; j++) {
        for (let i = 0; i < 7; i++) {
          this.dateArr[i] = this.dateArr[i].subtract(7, 'd');
          this.formatDate[i] = this.dateArr[i].format('D');
        }
      }
    } else {
      for (let j = 0; j < loop; j++) {
        for (let i = 0; i < 7; i++) {
          this.dateArr[i] = this.dateArr[i].add(7, 'd');
          this.formatDate[i] = this.dateArr[i].format('D');
        }
      }
    }
    this.listEvent(this.curDay, this.events);
    this.curDay = moment();
  }

  // change when click the calendar
  onChangeDay(Day) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.haveEvent[i][j] = false;
      }
    }
    const numOfDay = moment().dayOfYear() - Day.dayOfYear();
    this.curDay = moment().subtract(numOfDay, 'd');
    const tempDate = this.curDay.day();
    console.log(this.curDay);
    let loop = (this.curDay.dayOfYear() - this.curDay.day() - this.dateArr[0].dayOfYear()) / 7;
    console.log(loop);
    if (loop < 0) {
      loop = -loop;
      for (let j = 0; j < loop; j++) {
        for (let i = 0; i < 7; i++) {
          this.dateArr[i] = this.dateArr[i].subtract(7, 'd');
          this.formatDate[i] = this.dateArr[i].format('D');
        }
      }
    } else {
      for (let j = 0; j < loop; j++) {
        for (let i = 0; i < 7; i++) {
          this.dateArr[i] = this.dateArr[i].add(7, 'd');
          this.formatDate[i] = this.dateArr[i].format('D');
        }
      }
    }
    this.listEvent(this.curDay, this.events);
    this.curDay = this.curDay.subtract((6 - tempDate), 'd');
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

    this.events = this.eventService
    .getEventsFromOneUser(this.username)
    .subscribe(data => {
      this.events = data;
      // tslint:disable-next-line:prefer-for-of
      this.listEvent(this.curDay, this.events);
      this.curDay = this.curDay.subtract((6 - moment().day()), 'd');
    });
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
    this.eventService
      .getEvent(this.eventDetailComponent.tempId)
      .subscribe(data => {
        const event = data[0];
        console.log(this.eventDetailComponent.tempId);
        this.events = this.events.filter(
          h => h.id !== this.eventDetailComponent.tempId
        );
        // this.listEvent(this.curDay, this.events);
        // this.curDay = this.curDay.subtract((6 - moment().day()), 'd');
        const startDay = moment(event.startTime, 'MM/DD/YYYY');
        const endDay = moment(event.endTime, 'MM/DD/YYYY');
        for (let j = startDay.day(); j <= endDay.day(); j++) {
          for (let i = parseInt(event.startTime.substr(11, 2), 0); i < parseInt(event.endTime.substr(11, 2), 0); i++) {
            this.haveEvent[j][i] = false;
          }
        }
      });
    // this.events = this.eventService
    // .getEventsFromOneUser(this.username)
    // .subscribe(data => {
    //   this.events = data;
    //   // tslint:disable-next-line:prefer-for-of
    //   this.listEvent(this.curDay, this.events);
    //   this.curDay = this.curDay.subtract((6 - moment().day()), 'd');
    // });
  }

   // edit the current event
  onEditEvent() {
    this.onCloseEventDetail();
    this.editEventComponent.id = this.event._id;
    this.editEventComponent.title = this.event.title;
    this.editEventComponent.location = this.event.location;
    this.editEventComponent.startTimeTemp = this.event.startTime.substr(11, 5);
    this.editEventComponent.endTimeTemp = this.event.endTime.substr(11, 5);
    const dayOfWeek = this.curDay.day();
    this.editEventComponent.startDateTemp = this.curDay.subtract(dayOfWeek, 'd').toDate();
    this.editEventComponent.endDateTemp = this.curDay.add(6, 'd').toDate();
    this.editEvent = false;
    document.body.style.overflow = 'hidden';
    console.log(this.curDay);
  }
  onCloseEditEvent() {
      this.editEvent = true;
      document.body.style.overflow = 'auto';
  }
  // update event
  onUpdateEvent() {
      this.editEvent = true;
      document.body.style.overflow = 'auto';
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
          this.haveEvent[i][j] = false;
        }
      }
      this.eventService.getEventsFromOneUser(this.username).subscribe( data => {
        this.events = data;
        this.listEvent(this.curDay, this.events);
      });
  }
}
