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

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // initialize current day, timing array and add all exsited events
    this.curDay = moment();
    this.curDayFormat = this.curDay.format('MM/DD');
    this.createTiming();
    this.events = this.eventService.getEvents().subscribe( data => {
      this.events = data;
      // tslint:disable-next-line:prefer-for-of
      this.listEvent(this.curDay, this.events);
    });
    for (let i = 0; i < 24; i++) {
      this.haveEvent[i] = false;
    }
  }

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
          document.getElementById('0' + j + ':00-2').setAttribute('id', e[i]._id);
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

  today() {
    this.curDay = moment();
    this.changeFormat();
    this.listEvent(this.curDay, this.events);
  }
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
  showAddEvent() {
    this.addEvent = false;
    document.body.style.overflow = 'hidden';
  }

  // show event detail panel
  showEventDetail(id) {
    this.eventDetail = false;
    document.body.style.overflow = 'hidden';

    this.eventService.getEvent(id).subscribe( data => {
      console.log(id);
      console.log(data);
      // this.event = data;
      // this.eventDetailComponent.eventTitle = this.event.title;
      // this.eventDetailComponent.eventLocation = this.event.location;
      // this.eventDetailComponent.eventStartTime = this.event.startTime;
      // this.eventDetailComponent.eventEndTime = this.event.endTime;
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
