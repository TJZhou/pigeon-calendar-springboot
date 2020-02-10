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

  id: string;
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
    this.username = localStorage.getItem('username');
  }

  //  Seperate date and time
  seperateDateAndTime(completeDate: string) {
    let words = completeDate.split(' ');
    let date = words[0];
    let time = words[1];
    return {date, time};
  }

 // Seperate hour and minute
  seperateHourAndMinute(completeTime: string) {
    let words = completeTime.split(':');
    let hour = words[0];
    let minute = words[1];
    return {hour, minute}
  }

  // Create a new event for using event Service
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

  // Update event using event service
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

      let startMonthS;
      let startDateS;
      let endMonthS;
      let endDateS;

      // let starts = this.startTimeTemp.split(':');
      // let ends = this.endTimeTemp.split(':');

      // if( parseInt(starts[0]) < 10) {
      //   this.startTimeTemp = '0' + this.startTimeTemp;
      // }

      // if( parseInt(ends[0]) < 10) {
      //   this.endTimeTemp = '0' + this.endTimeTemp;
      // }

      if(startMonth<10) {
        startMonthS = '0' + startMonth;
      } else {
        startMonthS = startMonth.toString();
      }

      if(startDate < 10) {
        startDateS = '0' + startDate;
      } else {
        startDateS = startDate;
      }

      if(endMonth < 10) {
        endMonthS = '0' + endMonth;
      } else {
        endMonthS = endMonth;
      }

      if(endDate < 10 ) {
        endDateS = '0' + endDate;
      } else {
        endDateS = endDate;
      }
      this.startTime = startMonthS +  '/' + startDateS + '/' + startYear + ' ' + this.startTimeTemp;
      this.endTime = endMonthS + '/' + endDateS + '/' + endYear + ' ' + this.endTimeTemp;

      // Use eventService to update event
      this.eventService.updateEvent(this.id, this.createNewEvent()).
      subscribe(data => {
        this.save.emit();
      });
    }
  }

  // Store the variables for controlling time-chooser part
  displayArr = {
    startTimeDisplay: 0,
    endTimeDisplay: 0,
  };

  // Judge if clicking on the outside of both time-chooser
  onClickedOutside(id) {
      if(id == 'endoutside'){
        this.displayArr['endTimeDisplay'] = 0;
      }else if(id == 'startoutside'){
        this.displayArr['startTimeDisplay'] = 0;
      }
  }

  // Control whether display or not
  controlDisplay(event) {
    let id = event.target.id;
    this.setDisplayFlag(id, 1);
  }

  // Assign flag to attribute
  setDisplayFlag(id: string, flag: number) {
    if (id === 'startTime') {
      this.displayArr['startTimeDisplay'] = flag;
    } else if (id === 'endTime'){
      this.displayArr['endTimeDisplay'] = flag;
    }
  }

  // Get the selected time from time-chooser
  setStartTime(time) {
    this.startTimeTemp = time;
  }

  // Get the selected time from time-chooser
  setEndTime(time) {
    this.endTimeTemp = time;
  }

  // Close the edit event
  closeEditEvent() {
    this.close.emit(true);
  }
}
