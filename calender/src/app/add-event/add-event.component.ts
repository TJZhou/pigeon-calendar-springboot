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

  startTimeArr=['00:00', '00:30', '1:00', '00:30', '1:00', '00:30', '1:00'
  , '00:30', '1:00', '00:30', '1:00', '00:30', '1:00', '00:30', '1:00'];

  selectedStartDate = null;
  selectedStartTime = null;
  selectedEndDate = null;
  selectedEndTime = null;

  constructor(private routeLocation: Location) { }

  ngOnInit() {
  }
  
  selectStartTime() {
    this.selectedStartTime = this.startTimeTemp;
    console.log(this.selectedStartTime);
  }

  selectStartDate() {
    this.selectedStartDate = this.startDateTemp;
    console.log(this.selectedStartDate);
  }

  selectEndTime() {
    this.selectedEndTime = this.endTimeTemp;
    console.log(this.selectedEndTime);
  }

  selectEndDate() {
    this.selectedEndDate = this.endDateTemp;
    console.log(this.selectedEndDate);
  }

  judgeSelectStartTime(): boolean {
    if(this.selectedStartTime === null) {
      return false;
    } else {
      return true;
    }
  }

  judgeSelectEndTime(): boolean {
    if(this.selectedEndTime === null) {
      return false;
    } else {
      return true;
    }
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
