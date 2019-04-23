import { Component, OnInit,EventEmitter, Output } from '@angular/core';
// import { Location } from '@angular/common';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';

// PATCH method will cause CORS error in the Chrome browser but works fine on Firefox

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  matDatepicker;
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<object>();

  startDateTemp: Date
  startTimeTemp: string
  endTimeTemp: string
  endDateTemp: Date

  displayFlag = false;
  event: Event;

  id = "5cbceaada5689e8459f63338";
  username: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;

  tempTimeArr=[];
  startTimeArr=[];
  endTimeArr=[];

  fillTempTimeArr(){
    for(let i = 0; i < 24; i++){
      for(let j = 0; j < 60; j+=30){
        let temp;
        if(i < 10 && j == 0){
          temp = '0' + i + ':' + j + '0';
        } else if( i < 10 && j == 30) {
          temp = '0' + i + ":" + j;
        } else if ( i > 9 && j == 0) {
          temp = i + ':' + j + '0';
        } else {
          temp = i + ':' + j;
        }
        this.tempTimeArr.push(temp);
      }
    }
    return this.tempTimeArr;
  }

  selectedStartDate = null;
  selectedStartTime = null;
  selectedEndDate = null;
  selectedEndTime = null;

  constructor( private eventService: EventService ) { }

  ngOnInit() {
    this.startTimeArr = this.fillTempTimeArr();
    this.endTimeArr = this.startTimeArr;
    this.endTimeArr.push('24:00');

    this.eventService.getEvent(this.id).subscribe(data => {
      console.log(data[0]);

      this.title = data[0].title;
      this.location = data[0].location;
      this.username = data[0].username;
      this.startDateTemp = new Date(this.seperateDateAndTime(data[0].startTime).date);
      this.startTimeTemp = this.seperateDateAndTime(data[0].startTime).time;
      this.endDateTemp = new Date(this.seperateDateAndTime(data[0].endTime).date);
      this.endTimeTemp = this.seperateDateAndTime(data[0].endTime).time;
    })
  }

  seperateDateAndTime(completeDate: string) {
    let words = completeDate.split(' ');
    let date = words[0];
    let time = words[1];
    return {date, time};
  }

  seperateHourAndMinute(completeTime: string) {
    let words = completeTime.split(':');
    let hour = words[0];
    let minute = words[1];
    return {hour, minute}
  }

  createNewEvent(): Event{
    let event = {
    "_id": this.id,
    "username": this.username,
    "title": this.title,
    "location": this.location,
    "startTime": this.startTime,
    "endTime": this.endTime
    }
    return event;
  }

  onUpdate(){

    let startTime = this.seperateHourAndMinute(this.startTimeTemp);
    let startHour = parseInt(startTime.hour);
    let startMinute = parseInt(startTime.minute);

    let endTime = this.seperateHourAndMinute(this.endTimeTemp);
    let endHour = parseInt(endTime.hour);
    let endMinute = parseInt(endTime.minute);

    this.startDateTemp.setHours(startHour);
    this.endDateTemp.setHours(endHour);

    this.startDateTemp.setMinutes(startMinute);
    this.endDateTemp.setMinutes(endMinute);

    console.log(this.startDateTemp);
    console.log(this.endDateTemp);

    if (this.title == "" || this.title == undefined ||
        this.location == "" || this.location == undefined) {
      alert("Invalid input - Please fill out all the blanks.");
    } else if (this.endDateTemp <= this.startDateTemp ) {
      alert("Please choose valid end time.");
    } else {

      // Convert date string to date object
      let startMonth = this.startDateTemp.getMonth() + 1;
      let startDate = this.startDateTemp.getDate();
      let startYear = this.startDateTemp.getFullYear();

      let endMonth = this.endDateTemp.getMonth() + 1;
      let endDate = this.endDateTemp.getDate();
      let endYear = this.endDateTemp.getFullYear();

      this.startTime = startMonth + '/' + startDate + '/' + startYear + ' ' + this.startTimeTemp;
      this.endTime = endMonth + '/' + endDate + '/' + endYear + ' ' + this.endTimeTemp;

      console.log(this.startTime);
      console.log(this.endTime);
      // Use eventService to update event
      this.eventService.updateEvent(this.id, this.createNewEvent()).
      subscribe(data => console.log(" This event has been updated: " + data));
      alert('Update successfully.');
      // this.save.emit();
      // this.close.emit();
    }
  }

  displayArr = {
    startTimeDisplay: 0,
    endTimeDisplay: 0,
  };

  onClickedOutside(id) {
      if(id == 'endoutside'){
        this.displayArr['endTimeDisplay'] = 0;
      }else if(id == 'startoutside'){
        this.displayArr['startTimeDisplay'] = 0;
      }
  }

  controlDisplay(event) {
    let id = event.target.id;
    this.setDisplayFlag(id, 1);
  }

  setDisplayFlag(id: string, flag: number) {
    if(id == 'startTime'){
      this.displayArr['startTimeDisplay'] = flag;
    } else if (id == 'endTime'){
      this.displayArr['endTimeDisplay'] = flag;
    }
  }

  setStartTime(event) {
    let time = event.target.id;
    this.startTimeTemp = time;
  }

  setEndTime(event) {
    let time = event.target.id;
    this.endTimeTemp = time;
  }

  closeEditEvent() {
    this.close.emit(true);
  }
}
