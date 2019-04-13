import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Event } from '../models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  currentDate = moment();
  startDateTemp = this.currentDate.format('MM/DD/YY');
  startTimeTemp = this.currentDate.format('HH:MM');
  endTimeTemp = this.currentDate.add(1, 'h').format('HH:MM');
  endDateTemp = this.startDateTemp;

  event = Event;

  id: number;
  username: string;
  title: string;
  location: string;
  startTime: Date;
  endTime: Date;

  constructor(private routeLocation: Location) { }

  ngOnInit() {
  }

  createNewContact(): Event{
    let event = {
      "id": this.id,
      "username": this.username,
      "title": this.title,
      "location": this.location,
      "startTime": this.startTime,
      "endTime": this.endTime
    }
    return event;
  }

  goBack(): void {
    this.routeLocation.back();
  }

  onSubmit(){

    if (this.title == "" || this.title == undefined || 
        this.location == "" || this.location == undefined) {

      alert("Please fill out all the blanks.");

    } else {

      // this.eventService.addEvent(this.createNewEvent())
      //   .subscribe(data => console.log(" This event has been created: " + data));
      // alert('Add successfully.');

    }
  }
}
