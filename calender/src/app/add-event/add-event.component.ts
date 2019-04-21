import { Component, OnInit,EventEmitter, Output } from '@angular/core';
// import { Location } from '@angular/common';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import * as moment from 'moment';
import { EventPost } from '../models/eventPost.model';
import {  } from 'protractor';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  matDatepicker;
  currentDate = moment();
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<object>();
  startDateTemp = this.currentDate.format('MM/DD/YY');
  startTimeTemp = this.currentDate.format('HH:MM');
  endTimeTemp = this.currentDate.add(1, 'h').format('HH:MM');
  endDateTemp = this.startDateTemp;

  displayFlag = false;
  event = Event;

  id: number;
  username: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;

  tempTimeArr=[];
  startTimeArr=[];
  endTimeArr=[];

  // Convert date string to Date object

 convertStrToDate(datetimeStr) {
  var mydateint = Date.parse(datetimeStr);
  if (!isNaN(mydateint)) {
      var mydate = new Date(mydateint);
      return mydate;
  }
  var mydate = new Date(datetimeStr);
  var monthstr = mydate.getMonth() + 1;
  if (!isNaN(monthstr)) {
      return mydate;
  }
  var dateParts = datetimeStr.split(" ");
  var dateToday = new Date();
  var year = dateToday.getFullYear();
  var month = dateToday.getMonth();
  var day = dateToday.getDate();
  if (dateParts.length >= 1) {
      var dataPart = dateParts[0].split("-");
      if (dataPart.length == 1) {
          dataPart = dateParts[0].split("/");
      }
      if (dataPart.length == 3) {
          month = Math.floor(dataPart[0]);
          day = Math.floor(dataPart[1]);
          year = Math.floor(dataPart[2]);
      }
  }
  if (dateParts.length == 2) {
      var timePart = dateParts[1].split(":");
      if (timePart.length == 3) {
          var hour = Math.floor(timePart[0]);
          var minute = Math.floor(timePart[1]);
          var second = Math.floor(timePart[2]);
          return new Date(year, month, day, hour, minute, second);
      }
  }
  else {
      return new Date(year, month, day);
  }
}

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

  constructor(
    // private routeLocation: Location,
    private eventService: EventService
    ) { }

  ngOnInit() {
    this.startTimeArr = this.fillTempTimeArr();
    this.endTimeArr = this.startTimeArr;
    this.endTimeArr.push('24:00');
  }

  // goBack(): void {
  //   this.routeLocation.back();
  // }

  createNewEvent(): EventPost{
    let event = {
    "username": "test",
    "title": this.title,
    "location": this.location,
    "startTime": this.startTime,
    "endTime": this.endTime
    }
    return event;
  }

  onSubmit(){

    // Get the start and end date
    let startDateElement = <HTMLInputElement>document.getElementById('startDate');
    let startDateValue = startDateElement.value;
    this.startDateTemp = startDateValue;

    let endDateElement = <HTMLInputElement>document.getElementById('endDate');
    let endDateValue = endDateElement.value;
    this.endDateTemp = endDateValue;

    // Put date the time together and get their timestamp for comparing

    let startwords = this.startDateTemp.split('/');
    let endwords = this.endDateTemp.split('/');
    

    if( parseInt(startwords[0]) < 10 ) {
      this.startDateTemp = '0' + this.startDateTemp;
    }
    if( parseInt(endwords[0]) < 10 ) {
      this.endDateTemp = '0' + this.endDateTemp;
    }

    let convertStart = this.startDateTemp + " " + this.startTimeTemp;
    let startStamp = Date.parse(convertStart);

    let convertEnd = this.endDateTemp + " " + this.endTimeTemp;
    let endStamp = Date.parse(convertEnd);

    if (this.title == "" || this.title == undefined || 
        this.location == "" || this.location == undefined) {
      alert("Invalid input - Please fill out all the blanks.");
    } else if (endStamp <= startStamp ) {
      alert("Please choose valid end time.");
    } else {

      // Convert date string to date object
      this.startTime = convertStart;
      this.endTime = convertEnd;

      console.log(this.startTime);
      console.log(this.endTime);
      // Use eventService to create new event
      this.eventService.addEvent(this.createNewEvent())
        .subscribe(data => console.log(" This event has been created: " + data));
      alert('Add successfully.');
      this.save.emit();
      this.close.emit();
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

  closeAddEvent() {
    this.close.emit(true);
  }
}
